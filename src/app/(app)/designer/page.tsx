
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
import Link from "next/link";
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
        data-ai-hint={item.dataAiHint || item.name.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').slice(0,2).join(' ')}
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

  const handleExportPdf = async () => {
    if (activeStages.length === 0) {
      toast({
        title: "No Selections to Export",
        description: "Please make some design choices before exporting.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPdf(true);
    toast({ title: "Generating PDF...", description: "Please wait, this may take a moment." });

    const doc = new jsPDF();
    let yPos = 15; 
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    const lineHeight = 7;
    const sectionSpacing = 12;
    const itemSpacing = 6;
    const imageWidth = 50; 
    const imageHeight = (imageWidth * 3) / 4; 

    const checkPageBreak = (neededHeight: number): boolean => {
      if (yPos + neededHeight > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
        return true; 
      }
      return false; 
    };

    doc.setFontSize(10);
    doc.setTextColor(100); 
    doc.text("Interactive Designs", pageWidth / 2, margin, { align: 'center' });
    yPos += lineHeight;
    doc.setTextColor(0); 


    checkPageBreak(lineHeight + sectionSpacing);
    doc.setFontSize(18);
    doc.text("Design Summary", pageWidth / 2, yPos, { align: 'center' });
    yPos += sectionSpacing;

    for (const [stageKey, items] of activeStages) {
      if (items.length === 0) continue;

      checkPageBreak(lineHeight + sectionSpacing / 2);
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      const stageName = stageDisplayNames[stageKey as DesignStageKey] || stageKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      const stageNameLines = doc.splitTextToSize(stageName, contentWidth);
      doc.text(stageNameLines, margin, yPos);
      yPos += stageNameLines.length * lineHeight;
      doc.setFont(undefined, 'normal');
      yPos += itemSpacing / 2;

      for (const item of items) {
        const minItemHeight = item.imageUrl ? imageHeight + 5 : lineHeight * 2;
        checkPageBreak(minItemHeight); 

        let textX = margin;
        let currentTextY = yPos; // Y position for the current item's text block
        let imageBlockEndY = yPos; // Y position after image (if any) is drawn for the current item

        if (item.imageUrl) {
          // Potentially checkPageBreak for image itself if not done by minItemHeight
          // For simplicity, checkPageBreak(minItemHeight) above covers this.
          try {
            const response = await fetch(item.imageUrl);
            if (!response.ok) throw new Error(`Image fetch failed: ${response.statusText}`);
            const blob = await response.blob();
            const reader = new FileReader();
            
            await new Promise<void>((resolve, reject) => {
              reader.onloadend = () => {
                try {
                  if (yPos + imageHeight > pageHeight - margin) { // Check specifically for image space
                    doc.addPage();
                    yPos = margin;
                    currentTextY = margin; // Reset currentTextY if page broke for image
                  }
                  doc.addImage(reader.result as string, 'JPEG', margin, yPos, imageWidth, imageHeight);
                  imageBlockEndY = yPos + imageHeight + 3; 
                  textX = margin + imageWidth + 5; 
                  currentTextY = yPos; // Text starts at the same y-level as the image
                  resolve();
                } catch (e) {
                  console.error("PDF: Error adding image", e);
                  reject(e); 
                }
              };
              reader.onerror = (e) => { 
                console.error("PDF: Error reading image blob", e);
                reject(e);
              };
              reader.readAsDataURL(blob);
            });
          } catch (error) {
            console.warn(`PDF: Could not load image for ${item.name}: ${item.imageUrl}`, error);
             doc.setFontSize(8);
             doc.setTextColor(150);
             const failedImageText = `[Image for ${item.name} failed to load]`;
             // Use currentTextY for positioning failed image text
             const fiLines = doc.splitTextToSize(failedImageText, contentWidth - (textX > margin ? (textX - margin) : 0));
             if (currentTextY + fiLines.length * (lineHeight * 0.8) > pageHeight - margin) {
                doc.addPage(); currentTextY = margin;
             }
             doc.text(fiLines, textX, currentTextY);
             currentTextY += fiLines.length * (lineHeight * 0.8); 
             doc.setTextColor(0);
             imageBlockEndY = currentTextY; // Update imageBlockEndY to after the placeholder text
          }
        }
        
        // Render text content
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        const nameLines = doc.splitTextToSize(item.name, contentWidth - (textX - margin));
        if (currentTextY + nameLines.length * lineHeight > pageHeight - margin) { doc.addPage(); currentTextY = margin; imageBlockEndY = Math.max(imageBlockEndY, currentTextY); }
        doc.text(nameLines, textX, currentTextY);
        currentTextY += nameLines.length * lineHeight;

        if (item.description && !item.value) {
          doc.setFontSize(8);
          doc.setFont(undefined, 'italic');
          const descLines = doc.splitTextToSize(item.description, contentWidth - (textX - margin));
          if (currentTextY + descLines.length * (lineHeight*0.8) > pageHeight - margin) { doc.addPage(); currentTextY = margin; imageBlockEndY = Math.max(imageBlockEndY, currentTextY); }
          doc.text(descLines, textX, currentTextY);
          currentTextY += descLines.length * (lineHeight * 0.8);
        }

        if (item.value !== undefined) {
          doc.setFontSize(10);
          doc.setFont(undefined, 'normal');
          const valueText = typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : String(item.value);
          const valLines = doc.splitTextToSize(`Value: ${valueText}`, contentWidth - (textX - margin));
          if (currentTextY + valLines.length * lineHeight > pageHeight - margin) { doc.addPage(); currentTextY = margin; imageBlockEndY = Math.max(imageBlockEndY, currentTextY); }
          doc.text(valLines, textX, currentTextY);
          currentTextY += valLines.length * lineHeight;
        }
        doc.setFont(undefined, 'normal');
        
        yPos = Math.max(imageBlockEndY, currentTextY) + itemSpacing; 
      } 
      yPos += sectionSpacing / 2; 
    }

    try {
      doc.save("design_summary.pdf");
      toast({
        title: "PDF Exported",
        description: "Your design summary has been downloaded.",
      });
    } catch (e) {
        console.error("Error saving PDF:", e);
        toast({
            title: "PDF Export Failed",
            description: "There was an error generating your PDF. Please try again.",
            variant: "destructive"
        })
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
            <Button onClick={handleExportPdf} disabled={isGeneratingPdf}>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-16 w-16 text-muted-foreground opacity-50 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.037-.502.068-.75.098m.75-.098a2.25 2.25 0 00-2.25 2.25c0 1.13.812 2.066 1.903 2.195M16.5 3.104V5.75M16.5 3.104c-.251.037-.502.068-.75.098m.75-.098a2.25 2.25 0 012.25 2.25c0 1.13-.812 2.066-1.903 2.195m0-2.195C14.812 5.134 12.75 4.5 12 4.5c-2.186 0-4.25.63-6.097.934M15 14.5h-3V10.75M15 14.5A2.25 2.25 0 0112.75 12H12m3 2.5A2.25 2.25 0 0012.75 12H12m0 0A2.25 2.25 0 009.75 14.5M9.75 14.5h-3V10.75"
                />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75l3.75-1.563M12 21.75l-3.75-1.563M12 21.75V19.5M9 19.5V10.5M15 19.5V10.5M3 10.5c0 .995.182 1.94.514 2.826M21 10.5c0 .995-.182 1.94-.514 2.826" />
              </svg>
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

