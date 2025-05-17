
"use client";

import type { DesignStageKey, SelectedDataItem, ClientInfoData } from "@/contexts/DesignProgressContext";
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
  const { getAllSelections, getClientInfo } = useDesignProgress();
  const { toast } = useToast();
  const router = useRouter(); 
  const allSelections = getAllSelections();
  const clientInfo = getClientInfo();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const activeStages = Object.entries(allSelections)
    .filter(([stageKey, items]) => stageKey !== "summary" && items.length > 0);

  const handleDownloadPdf = async () => {
    if (activeStages.length === 0 && !clientInfo) {
      toast({
        title: "No Information to Export",
        description: "Please make some design choices or add client info before exporting to PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPdf(true);
    toast({ title: "Generating PDF...", description: "Please wait, this may take a moment." });

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });
    
    let yPos = 0; 
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 12; // Reduced margin for more content space
    const contentWidth = pageWidth - margin * 2;

    // Theme Colors (RGB approximations from HSL for jsPDF)
    const colorForegroundRgb = [79, 74, 69]; // hsl(20, 12%, 25%)
    const colorPrimaryRgb = [0, 128, 128];   // hsl(180, 100%, 25%)
    const colorMutedRgb = [138, 132, 128];   // hsl(20, 10%, 55%) - from original muted-foreground

    // Font Sizes (in points) - Reduced for compactness
    const FONT_SIZE_LOGO_TITLE = 9;
    const FONT_SIZE_PAGE_TITLE = 16;
    const FONT_SIZE_SECTION_TITLE = 12;
    const FONT_SIZE_CLIENT_LABEL = 9;
    const FONT_SIZE_CLIENT_DATA = 9;
    const FONT_SIZE_ITEM_NAME = 9;
    const FONT_SIZE_ITEM_VALUE = 8;
    const FONT_SIZE_ITEM_DESCRIPTION = 7;
    const FONT_SIZE_FOOTER = 7;

    // Spacing (in mm) - Reduced
    const spacingSection = 6;
    const spacingItem = 3;
    const spacingImageText = 2;
    
    // Image dimensions (in mm) - Reduced
    const itemImageWidth = 20; 
    const itemImageHeight = (itemImageWidth * 3) / 4; 

    const getLineHeight = (sizeInPoints: number) => {
      doc.setFontSize(sizeInPoints);
      return doc.getLineHeight() / doc.internal.scaleFactor; // Convert points to mm
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
    
    let currentPageNumber = 1;
    const addPageNumber = () => {
        doc.setFontSize(FONT_SIZE_FOOTER);
        doc.setTextColor(colorMutedRgb[0], colorMutedRgb[1], colorMutedRgb[2]);
        doc.text(`Page ${currentPageNumber}`, pageWidth - margin, pageHeight - margin / 2, { align: 'right' });
        currentPageNumber++;
    };


    // --- Start PDF Generation ---
    doc.setFont("helvetica", "normal"); 

    // 1. Add Logo & Company Name
    const logoUrl = "https://media.discordapp.net/attachments/1370568040256901200/1370582735122468954/butterfly_logo.png?ex=682897e4&is=68274664&hm=d1efad37b54995ce17b2917059ef5d7f3786ab33798c045302dc9cb1476519ca&=&format=webp&quality=lossless&width=1502&height=1502";
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

    const logoHeight = 15; // mm
    const logoWidth = 15;  // mm
    yPos = margin;

    if (logoDataUri) {
        const logoX = (pageWidth - logoWidth) / 2;
        doc.addImage(logoDataUri, 'PNG', logoX, yPos, logoWidth, logoHeight);
        yPos += logoHeight + 2; 
    }
    
    doc.setFontSize(FONT_SIZE_LOGO_TITLE);
    doc.setTextColor(colorForegroundRgb[0], colorForegroundRgb[1], colorForegroundRgb[2]);
    doc.text("Interactive Designs", pageWidth / 2, yPos, { align: 'center' });
    yPos += getLineHeight(FONT_SIZE_LOGO_TITLE) + 4;

    // Horizontal line
    doc.setDrawColor(colorMutedRgb[0], colorMutedRgb[1], colorMutedRgb[2]);
    doc.setLineWidth(0.2);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 4;

    // 2. Client Information
    if (clientInfo) {
        checkAndAddPage(getLineHeight(FONT_SIZE_SECTION_TITLE) + (clientInfo.callPreferences ? 4 : 2) * getLineHeight(FONT_SIZE_CLIENT_DATA) + 5);
        doc.setFontSize(FONT_SIZE_SECTION_TITLE);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(colorPrimaryRgb[0], colorPrimaryRgb[1], colorPrimaryRgb[2]);
        doc.text("Client Details", margin, yPos);
        yPos += getLineHeight(FONT_SIZE_SECTION_TITLE) + 1;
        doc.setFont("helvetica", "normal");

        doc.setFontSize(FONT_SIZE_CLIENT_LABEL);
        doc.setTextColor(colorForegroundRgb[0], colorForegroundRgb[1], colorForegroundRgb[2]);
        
        const clientInfoStartY = yPos;
        let clientInfoCol1X = margin;
        let clientInfoCol2X = margin + (contentWidth / 2) + 5;

        doc.setFont("helvetica", "bold");
        doc.text("Full Name:", clientInfoCol1X, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(clientInfo.fullName || "N/A", clientInfoCol1X + 20, yPos);
        yPos += getLineHeight(FONT_SIZE_CLIENT_DATA) + 0.5;

        doc.setFont("helvetica", "bold");
        doc.text("Email:", clientInfoCol1X, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(clientInfo.email || "N/A", clientInfoCol1X + 20, yPos);
        
        if (clientInfo.callPreferences && (clientInfo.callPreferences.phoneNumber || clientInfo.callPreferences.availableDays.length > 0 || clientInfo.callPreferences.availableTimes.length > 0)) {
            yPos = clientInfoStartY; // Reset yPos for second column
            doc.setFont("helvetica", "bold");
            doc.text("Phone:", clientInfoCol2X, yPos);
            doc.setFont("helvetica", "normal");
            doc.text(clientInfo.callPreferences.phoneNumber || "N/A", clientInfoCol2X + 15, yPos);
            yPos += getLineHeight(FONT_SIZE_CLIENT_DATA) + 0.5;

            if(clientInfo.callPreferences.availableDays.length > 0 || clientInfo.callPreferences.availableTimes.length > 0){
                doc.setFont("helvetica", "bold");
                doc.text("Availability:", clientInfoCol2X, yPos);
                doc.setFont("helvetica", "normal");
                const availabilityText = `${clientInfo.callPreferences.availableDays.join(', ')} - ${clientInfo.callPreferences.availableTimes.join(', ')}`;
                const splitAvailability = doc.splitTextToSize(availabilityText, contentWidth / 2 - 20);
                doc.text(splitAvailability, clientInfoCol2X + 20, yPos);
                yPos += getLineHeight(FONT_SIZE_CLIENT_DATA) * splitAvailability.length;
            }
        }
        // Adjust yPos to be below the taller of the two columns if client info was split
        yPos = Math.max(yPos, clientInfoStartY + 2 * (getLineHeight(FONT_SIZE_CLIENT_DATA) + 0.5)); // Ensure space for at least two lines in col1
        yPos += getLineHeight(FONT_SIZE_CLIENT_LABEL) + 3; // Space after client info block
    }
    
    // Horizontal line
    doc.setDrawColor(colorMutedRgb[0], colorMutedRgb[1], colorMutedRgb[2]);
    doc.setLineWidth(0.2);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 4;

    // 3. Design Selections Title
    checkAndAddPage(getLineHeight(FONT_SIZE_PAGE_TITLE) + spacingSection);
    doc.setFontSize(FONT_SIZE_PAGE_TITLE);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colorForegroundRgb[0], colorForegroundRgb[1], colorForegroundRgb[2]);
    doc.text("Design Selections", pageWidth / 2, yPos, { align: 'center' });
    yPos += getLineHeight(FONT_SIZE_PAGE_TITLE) + spacingSection / 2;
    doc.setFont("helvetica", "normal");

    try {
      for (const [stageKey, items] of activeStages) {
        if (items.length === 0) continue;

        const stageName = stageDisplayNames[stageKey as DesignStageKey] || stageKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        checkAndAddPage(getLineHeight(FONT_SIZE_SECTION_TITLE) + 2 + spacingItem); 
        doc.setFontSize(FONT_SIZE_SECTION_TITLE);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(colorPrimaryRgb[0], colorPrimaryRgb[1], colorPrimaryRgb[2]);
        doc.text(stageName, margin, yPos);
        yPos += getLineHeight(FONT_SIZE_SECTION_TITLE) + 1; 
        doc.setFont("helvetica", "normal");

        for (const item of items) {
          const estItemHeightBase = getLineHeight(FONT_SIZE_ITEM_NAME);
          const estItemHeightWithDesc = item.description ? estItemHeightBase + getLineHeight(FONT_SIZE_ITEM_DESCRIPTION) : estItemHeightBase;
          const estItemHeight = item.imageUrl ? Math.max(itemImageHeight, estItemHeightWithDesc) + spacingItem : estItemHeightWithDesc + spacingItem;
          checkAndAddPage(estItemHeight); 

          let textX = margin;
          let currentTextY = yPos; 
          let imageBlockEndY = yPos; 

          if (item.imageUrl && (item.imageUrl.startsWith('http') || item.imageUrl.startsWith('data:image') || item.imageUrl.startsWith('/images/'))) {
            try {
              let imageData: string | ArrayBuffer | null = null;
              let imageFormat = 'JPEG'; 

              if (item.imageUrl.startsWith('data:image')) {
                imageData = item.imageUrl;
                if (imageData.startsWith('data:image/png')) imageFormat = 'PNG';
              } else if (item.imageUrl.startsWith('/images/')) {
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

              } else { 
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
                doc.addImage(imageData as string, imageFormat, margin, yPos, itemImageWidth, itemImageHeight);
                imageBlockEndY = yPos + itemImageHeight + 0.5; 
                textX = margin + itemImageWidth + spacingImageText; 
                currentTextY = yPos + getLineHeight(FONT_SIZE_ITEM_NAME) / 2; // Align text better with image center
              }
            } catch (error) {
              console.warn(`PDF: Could not load image for ${item.name}: ${item.imageUrl}`, error);
            }
          }
          
          doc.setFontSize(FONT_SIZE_ITEM_NAME);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(colorForegroundRgb[0], colorForegroundRgb[1], colorForegroundRgb[2]);
          const nameLines = doc.splitTextToSize(item.name, contentWidth - (textX - margin));
          doc.text(nameLines, textX, currentTextY);
          currentTextY += nameLines.length * getLineHeight(FONT_SIZE_ITEM_NAME);


          if (item.value !== undefined) {
            doc.setFontSize(FONT_SIZE_ITEM_VALUE);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(colorPrimaryRgb[0], colorPrimaryRgb[1], colorPrimaryRgb[2]); 
            const valueText = typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : String(item.value);
            const valLines = doc.splitTextToSize(valueText, contentWidth - (textX - margin));
            doc.text(valLines, textX, currentTextY);
            currentTextY += valLines.length * getLineHeight(FONT_SIZE_ITEM_VALUE);
          }

          const itemOwnDescription = (item.description && !Object.values(stageDisplayNames).includes(item.description) && item.description !== stageName && item.description.toLowerCase() !== "your selections for this stage.");
          if (itemOwnDescription) {
            doc.setFontSize(FONT_SIZE_ITEM_DESCRIPTION);
            doc.setFont("helvetica", "italic");
            doc.setTextColor(colorMutedRgb[0], colorMutedRgb[1], colorMutedRgb[2]);
            const descLines = doc.splitTextToSize(item.description!, contentWidth - (textX - margin) );
            doc.text(descLines, textX, currentTextY);
            currentTextY += descLines.length * getLineHeight(FONT_SIZE_ITEM_DESCRIPTION);
          }
          
          yPos = Math.max(imageBlockEndY, currentTextY) + spacingItem; 
        } 
        yPos += spacingSection / 2; 
      }
      
      addPageNumber(); 

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
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
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
          {clientInfo && (
            <Card className="mb-8 bg-card/70 backdrop-blur-lg border border-card-foreground/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-card-foreground/5">
                <CardTitle className="text-xl">Client Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-1 text-sm">
                <p><strong>Full Name:</strong> {clientInfo.fullName}</p>
                <p><strong>Email:</strong> {clientInfo.email}</p>
                {clientInfo.callPreferences && (clientInfo.callPreferences.phoneNumber || clientInfo.callPreferences.availableDays.length > 0 || clientInfo.callPreferences.availableTimes.length > 0) && (
                  <>
                    <p className="mt-2 pt-2 border-t border-border/30"><strong>Contact Preferences:</strong></p>
                    {clientInfo.callPreferences.phoneNumber && <p>Phone: {clientInfo.callPreferences.phoneNumber}</p>}
                    {(clientInfo.callPreferences.availableDays.length > 0 || clientInfo.callPreferences.availableTimes.length > 0) &&
                      <p>Availability: {clientInfo.callPreferences.availableDays.join(', ')} - {clientInfo.callPreferences.availableTimes.join(', ')}</p>
                    }
                  </>
                )}
              </CardContent>
            </Card>
          )}

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
