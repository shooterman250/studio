
"use client";

import type { DesignStageKey, SelectedDataItem } from "@/contexts/DesignProgressContext";
import { useDesignProgress } from "@/contexts/DesignProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileDown, PencilLine, Loader2 } from "lucide-react"; 
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; 
import { useState } from "react";
import jsPDF from 'jspdf';

const stageDisplayNames: Record<DesignStageKey, string> = {
  "overall-budget": "Overall Budget",
  "overall-style": "Overall Style & Key Elements",
  "kitchen": "Kitchen",
  "utility-laundry-room": "Utility/Laundry Room",
  "living-room": "Living Room",
  "bedroom": "Bedroom(s)",
  "bathroom": "Bathroom(s)",
  "home-office": "Home Office",
  "hallways": "Hallway(s)",
  "decor": "Decor & Lighting", 
  "finishes": "Colors & Finishes", 
  "summary": "Summary", 
};

const SelectedItemDisplay = ({ item }: { item: SelectedDataItem }) => (
  <div className="flex items-start gap-3 p-3 border-b border-border/30 last:border-b-0 hover:bg-muted/20 transition-colors">
    {item.imageUrl && (
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={60} 
        height={45} 
        className="rounded-md object-cover aspect-[4/3] shadow-sm"
        data-ai-hint={item.dataAiHint || item.name.toLowerCase().replace(/[^a-z0-9\\s]/gi, '').split(' ').slice(0,2).join(' ')}
      />
    )}
    <div className="flex-1">
      <p className="font-semibold text-sm text-card-foreground">{item.name}</p>
      {item.description && !item.value && <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>}
      {item.value !== undefined && (
         <p className="text-sm text-primary font-medium">
           {typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : String(item.value)}
         </p>
      )}
    </div>
  </div>
);

const StageSelectionsCard = ({ stageKey, items }: { stageKey: DesignStageKey; items: SelectedDataItem[] }) => {
  if (!items || items.length === 0) return null;

  const displayName = stageDisplayNames[stageKey] || stageKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <Card className="bg-card/70 backdrop-blur-lg border border-card-foreground/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-card-foreground/5">
        <CardTitle className="text-xl">{displayName}</CardTitle>
        <CardDescription>Your selections for this stage.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {items.length > 3 ? (
           <ScrollArea className="h-[210px]"> 
            <div className="divide-y divide-border/30">
              {items.map((item) => (
                <SelectedItemDisplay key={item.id || item.name} item={item} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="divide-y divide-border/30">
            {items.map((item) => (
              <SelectedItemDisplay key={item.id || item.name} item={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};


export default function DesignerPage() {
  const { getAllSelections } = useDesignProgress();
  const { toast } = useToast();
  const router = useRouter(); 
  const allSelections = getAllSelections();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const activeStages = Object.entries(allSelections)
    .filter(([stageKey, items]) => stageKey !== "summary" && items.length > 0);

  const handleDownloadPdf = async () => {
    if (activeStages.length === 0) {
      toast({
        title: "No Selections to Export",
        description: "Please make some design choices before exporting to PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPdf(true);
    toast({ title: "Generating PDF...", description: "Please wait, this may take a moment." });

    const doc = new jsPDF();
    let yPos = 0; 
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    // Theme Colors (RGB approximations)
    const colorForeground = '#4F4A45'; // hsl(20, 12%, 25%)
    const colorPrimary = '#008080';    // hsl(180, 100%, 25%)
    const colorMuted = '#8A8480';      // Lighter grey for descriptions, derived from muted

    // Font Sizes (in points)
    const FONT_SIZE_LOGO_TITLE = 10;
    const FONT_SIZE_PAGE_TITLE = 18;
    const FONT_SIZE_SECTION_TITLE = 14;
    const FONT_SIZE_ITEM_NAME = 10;
    const FONT_SIZE_ITEM_VALUE = 9;
    const FONT_SIZE_ITEM_DESCRIPTION = 8;
    const FONT_SIZE_FOOTER = 8;

    // Spacing (in mm)
    const spacingSection = 8;
    const spacingItem = 4;
    const spacingImageText = 3;
    
    // Image dimensions (in mm)
    const itemImageWidth = 30;
    const itemImageHeight = (itemImageWidth * 3) / 4; // Maintain 4:3 aspect ratio

    const getLineHeight = (sizeInPoints: number) => {
      // jsPDF's getLineHeightRauto() returns line height in user units (mm by default)
      // Factor is approx 0.352778 to convert points to mm, then a line height factor (e.g., 1.2)
      // doc.getLineHeightRauto() is simpler if font is set
      doc.setFontSize(sizeInPoints);
      return doc.getLineHeight(); // This returns in points, jsPDF handles conversion in text()
    };
    
    const checkAndAddPage = (neededHeight: number) => {
        if (yPos + neededHeight > pageHeight - margin) {
            doc.addPage();
            yPos = margin;
            addPageNumber();
            return true;
        }
        return false;
    };
    
    const addPageNumber = () => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(FONT_SIZE_FOOTER);
        doc.setTextColor(colorMuted);
        doc.text(`Page ${pageCount}`, pageWidth - margin, pageHeight - margin / 2, { align: 'right' });
    };


    // --- Start PDF Generation ---
    doc.setFont("helvetica", "normal"); // Set a default clean font

    // 1. Add Logo
    const logoUrl = "https://media.discordapp.net/attachments/1370568040256901200/1370582735122468954/butterfly_logo.png?ex=68200624&is=681eb4a4&hm=857aa242c852f51e2691ade9087a798c239d804caf79d4e04b0e1903c57337e9&=&format=webp&quality=lossless&width=1502&height=1502";
    let logoDataUri: string | null = null;
    try {
        const response = await fetch(logoUrl);
        if (!response.ok) throw new Error(`Logo fetch failed: ${response.statusText}`);
        const blob = await response.blob();
        logoDataUri = await new Promise<string | null>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.warn("Could not load logo for PDF:", e);
    }

    const logoHeight = 20; // mm
    const logoWidth = 20; // mm, assuming square, adjust if needed
    yPos = margin;

    if (logoDataUri) {
        const logoX = (pageWidth - logoWidth) / 2;
        doc.addImage(logoDataUri, 'PNG', logoX, yPos, logoWidth, logoHeight);
        yPos += logoHeight + 3; 
    }
    
    doc.setFontSize(FONT_SIZE_LOGO_TITLE);
    doc.setTextColor(colorForeground);
    doc.text("Interactive Designs", pageWidth / 2, yPos, { align: 'center' });
    yPos += getLineHeight(FONT_SIZE_LOGO_TITLE) * 0.5 + 5;


    // 2. Page Title
    checkAndAddPage(getLineHeight(FONT_SIZE_PAGE_TITLE) * 0.5 + spacingSection);
    doc.setFontSize(FONT_SIZE_PAGE_TITLE);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colorForeground);
    doc.text("Design Summary", pageWidth / 2, yPos, { align: 'center' });
    yPos += getLineHeight(FONT_SIZE_PAGE_TITLE) * 0.5 + spacingSection;
    doc.setFont("helvetica", "normal");

    try {
      for (const [stageKey, items] of activeStages) {
        if (items.length === 0) continue;

        const stageName = stageDisplayNames[stageKey as DesignStageKey] || stageKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        checkAndAddPage(getLineHeight(FONT_SIZE_SECTION_TITLE) * 0.5 + 3 + spacingItem); // Section title + line + space
        doc.setFontSize(FONT_SIZE_SECTION_TITLE);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(colorPrimary);
        doc.text(stageName, margin, yPos);
        yPos += getLineHeight(FONT_SIZE_SECTION_TITLE) * 0.5;
        
        doc.setDrawColor(colorPrimary); // Line color
        doc.setLineWidth(0.3);
        doc.line(margin, yPos, pageWidth - margin, yPos); // Underline section title
        yPos += 3; // Space after line
        doc.setFont("helvetica", "normal");

        for (const item of items) {
          const estItemHeight = item.imageUrl ? itemImageHeight + spacingItem : getLineHeight(FONT_SIZE_ITEM_NAME) * 0.5 * 2 + spacingItem;
          checkAndAddPage(estItemHeight); 

          let textX = margin;
          let currentTextY = yPos; 
          let imageBlockEndY = yPos; 

          if (item.imageUrl && (item.imageUrl.startsWith('http') || item.imageUrl.startsWith('data:image') || item.imageUrl.startsWith('/images/'))) {
            try {
              let imageData: string | ArrayBuffer | null = null;
              let imageFormat = 'JPEG'; // Default

              if (item.imageUrl.startsWith('data:image')) {
                imageData = item.imageUrl;
                if (imageData.startsWith('data:image/png')) imageFormat = 'PNG';
              } else if (item.imageUrl.startsWith('/images/')) {
                // For local public images, construct full URL for fetching during PDF generation
                // This assumes the app is running on localhost:3000 during PDF generation
                // For deployment, ensure this path is accessible or embed images differently
                const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
                const fullImageUrl = `${baseUrl}${item.imageUrl}`;
                const response = await fetch(fullImageUrl);
                if (!response.ok) throw new Error(`Local image fetch failed: ${response.statusText} for ${fullImageUrl}`);
                const blob = await response.blob();
                imageFormat = blob.type === 'image/png' ? 'PNG' : 'JPEG';
                imageData = await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result);
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
                });

              } else { // HTTP(S) URLs
                const response = await fetch(item.imageUrl);
                if (!response.ok) throw new Error(`Image fetch failed: ${response.statusText}`);
                const blob = await response.blob();
                imageFormat = blob.type === 'image/png' ? 'PNG' : 'JPEG';
                imageData = await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result);
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
                });
              }
              
              if (imageData) {
                if (yPos + itemImageHeight > pageHeight - margin) { 
                  doc.addPage(); yPos = margin; addPageNumber();
                }
                doc.addImage(imageData as string, imageFormat, margin, yPos, itemImageWidth, itemImageHeight);
                imageBlockEndY = yPos + itemImageHeight + 1; // Small gap if image exists
                textX = margin + itemImageWidth + spacingImageText; 
                currentTextY = yPos; 
              }
            } catch (error) {
              console.warn(`PDF: Could not load image for ${item.name}: ${item.imageUrl}`, error);
              // Placeholder for failed image
              doc.setFontSize(FONT_SIZE_ITEM_DESCRIPTION);
              doc.setTextColor(colorMuted);
              const failText = `[Image for ${item.name} failed to load]`;
              const failLines = doc.splitTextToSize(failText, contentWidth - (textX > margin ? (textX - margin) : 0));
              if (currentTextY + failLines.length * getLineHeight(FONT_SIZE_ITEM_DESCRIPTION) * 0.5 > pageHeight - margin) {
                  doc.addPage(); currentTextY = margin; addPageNumber();
              }
              doc.text(failLines, textX, currentTextY);
              currentTextY += failLines.length * getLineHeight(FONT_SIZE_ITEM_DESCRIPTION) * 0.5 + 1;
              imageBlockEndY = Math.max(imageBlockEndY, currentTextY);
            }
          } else if (item.imageUrl) {
              console.warn(`PDF: Skipping unsupported image ${item.name}: ${item.imageUrl}`);
          }
          
          doc.setFontSize(FONT_SIZE_ITEM_NAME);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(colorForeground);
          const nameLines = doc.splitTextToSize(item.name, contentWidth - (textX - margin + (item.imageUrl ? 0 : - (itemImageWidth + spacingImageText) ) ) ); // Adjust width if no image

          let textBlockRequiredHeight = nameLines.length * getLineHeight(FONT_SIZE_ITEM_NAME) * 0.5;
          if (item.value !== undefined) textBlockRequiredHeight += getLineHeight(FONT_SIZE_ITEM_VALUE) * 0.5;
          if (item.description) textBlockRequiredHeight += getLineHeight(FONT_SIZE_ITEM_DESCRIPTION) * 0.5 * 2; // Estimate 2 lines for description

          if (textX > margin && currentTextY + textBlockRequiredHeight > yPos + itemImageHeight && yPos + itemImageHeight < pageHeight - margin) {
            // If text next to image is too tall and image isn't at bottom of page, move text below image
            currentTextY = yPos + itemImageHeight + 2;
            textX = margin;
             if (checkAndAddPage(textBlockRequiredHeight)) { // check if new position needs new page
                currentTextY = margin; // reset currentTextY if new page
            }
          } else {
            checkAndAddPage(currentTextY - yPos + textBlockRequiredHeight); // Use currentTextY - yPos as already drawn height for this item on current page
          }
          
          doc.text(nameLines, textX, currentTextY);
          currentTextY += nameLines.length * getLineHeight(FONT_SIZE_ITEM_NAME) * 0.5;


          if (item.value !== undefined) {
            doc.setFontSize(FONT_SIZE_ITEM_VALUE);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(colorForeground); 
            const valueText = typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : String(item.value);
            const valLines = doc.splitTextToSize(valueText, contentWidth - (textX - margin + (item.imageUrl ? 0 : - (itemImageWidth + spacingImageText) ) ) );
            doc.text(valLines, textX, currentTextY);
            currentTextY += valLines.length * getLineHeight(FONT_SIZE_ITEM_VALUE) * 0.5;
          }

          const itemOwnDescription = (item.description && !Object.values(stageDisplayNames).includes(item.description) && item.description !== stageName && item.description.toLowerCase() !== "your selections for this stage.");
          if (itemOwnDescription) {
            doc.setFontSize(FONT_SIZE_ITEM_DESCRIPTION);
            doc.setFont("helvetica", "italic");
            doc.setTextColor(colorMuted);
            const descLines = doc.splitTextToSize(item.description!, contentWidth - (textX - margin + (item.imageUrl ? 0 : - (itemImageWidth + spacingImageText) ) ) );
            doc.text(descLines, textX, currentTextY);
            currentTextY += descLines.length * getLineHeight(FONT_SIZE_ITEM_DESCRIPTION) * 0.5;
          }
          
          yPos = Math.max(imageBlockEndY, currentTextY) + spacingItem; 
        } 
        yPos += spacingSection / 2; 
      }
      
      addPageNumber(); // Add page number to the last page

      doc.save('design_summary.pdf');
      toast({
        title: "PDF Generated",
        description: "Your design summary PDF has started downloading.",
      });

    } catch (e) {
        console.error("Error generating PDF:", e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        toast({
            title: "PDF Generation Failed",
            description: `There was an error generating your PDF: ${errorMessage}. Please try again or check console.`,
            variant: "destructive"
        });
    } finally {
        setIsGeneratingPdf(false);
    }
  };
    
  return (
    <div 
      className="relative min-h-full p-4 md:p-8 bg-background text-foreground"
    >
      <div className="relative z-[1] isolate">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Design Dashboard
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg opacity-80 sm:text-xl">
            Welcome to your personalized design dashboard. This is where all your interior design preferences and selections are gathered in one place. Use the menu to explore each category and continue customizing your space.
          </p>
          <div className="mt-6 flex justify-center">
            <Button onClick={handleDownloadPdf} disabled={isGeneratingPdf}>
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileDown className="mr-2 h-4 w-4" /> 
                  Export to PDF
                </>
              )}
            </Button>
          </div>
        </header>

        <section className="max-w-7xl mx-auto space-y-12">
          {activeStages.length > 0 ? (
            <>
              <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">
                Your Design Selections Overview
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {activeStages.map(([stageKey, items]) => (
                  <StageSelectionsCard key={stageKey} stageKey={stageKey as DesignStageKey} items={items} />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-12 p-10 bg-card/60 backdrop-blur-lg border border-card-foreground/10 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Start Designing Your Space!</h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                It looks like you haven't made any selections yet. 
                Navigate through the sidebar or click the button below to start customizing different aspects of your project.
              </p>
              <Button
                onClick={() => router.push('/overall-budget')}
                size="lg"
              >
                <PencilLine className="mr-2 h-5 w-5" />
                Start Designing
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

    

    