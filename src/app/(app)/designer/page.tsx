
"use client";

import type { DesignStageKey, SelectedDataItem, ClientInfoData } from "@/contexts/DesignProgressContext";
import { useDesignProgress } from "@/contexts/DesignProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileDown, PencilLine, Loader2, Home, RotateCcw } from "lucide-react"; 
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; 
import { useState, useEffect } from "react";
import jsPDF from 'jspdf';
import { designableRoomStages } from "@/config/navigation"; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const stageDisplayNames: Record<string, string> = { 
  "overall-budget": "Overall Budget",
  "overall-style": "Overall Style & Key Elements",
  "kitchen": "Kitchen",
  "utility-laundry-room": "Utility/Laundry Room",
  "living-room": "Living Room",
  "bedroom": "Bedroom(s)",
  "bathroom": "Bathroom(s)",
  "home-office": "Home Office",
  "hallways": "Hallway(s)",
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
        className="rounded-md object-contain aspect-[4/3] shadow-sm"
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

const StageSelectionsCard = ({ stageKey, items }: { stageKey: DesignStageKey | string; items: SelectedDataItem[] }) => {
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
  const { getAllSelections, getClientInfo, updateUserRoomSelections, getUserRoomSelections, resetAllProgress } = useDesignProgress();
  const { toast } = useToast();
  const router = useRouter(); 
  const allSelections = getAllSelections();
  const clientInfo = getClientInfo();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [tempSelectedRooms, setTempSelectedRooms] = useState<Set<string>>(new Set());
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  useEffect(() => {
    const existingRoomSelections = getUserRoomSelections();
    if (existingRoomSelections.size > 0) {
      setTempSelectedRooms(new Set(existingRoomSelections));
    }
  }, [getUserRoomSelections]);


  const activeStages = Object.entries(allSelections)
    .filter(([stageKey, items]) => stageKey !== "summary" && items.length > 0);

  const handleRoomSelectionChange = (roomId: string) => {
    setTempSelectedRooms(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(roomId)) {
        newSelected.delete(roomId);
      } else {
        newSelected.add(roomId);
      }
      return newSelected;
    });
  };

  const handleStartDesigning = () => {
    if (tempSelectedRooms.size === 0) {
      toast({
        title: "No Rooms Selected",
        description: "Please select at least one room or area to design before proceeding.",
        variant: "default",
      });
      return;
    }
    updateUserRoomSelections(tempSelectedRooms);
    router.push('/overall-budget');
  };

  const handleConfirmReset = () => {
    resetAllProgress();
    setIsResetDialogOpen(false);
    toast({
      title: "Choices Reset",
      description: "All your design selections and client information have been cleared.",
    });
  };

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
    const margin = 12; 
    const contentWidth = pageWidth - margin * 2;

    const colorForegroundRgb = [79, 74, 69]; 
    const colorPrimaryRgb = [0, 128, 128];   
    const colorMutedRgb = [138, 132, 128];   

    const FONT_SIZE_LOGO_TITLE = 9;
    const FONT_SIZE_PAGE_TITLE = 16;
    const FONT_SIZE_SECTION_TITLE = 12;
    const FONT_SIZE_CLIENT_LABEL = 9;
    const FONT_SIZE_CLIENT_DATA = 9;
    const FONT_SIZE_ITEM_NAME = 9;
    const FONT_SIZE_ITEM_VALUE = 8;
    const FONT_SIZE_ITEM_DESCRIPTION = 7;
    const FONT_SIZE_FOOTER = 7;

    const spacingSection = 6;
    const spacingItem = 3;
    const spacingImageText = 2;
    
    const itemImageWidth = 20; 
    const itemImageHeight = (itemImageWidth * 3) / 4; 

    const getLineHeight = (sizeInPoints: number) => {
      doc.setFontSize(sizeInPoints);
      return doc.getLineHeight() / doc.internal.scaleFactor; 
    };
    
    let currentPageNumber = 1;
    const addPageNumber = () => {
        doc.setFontSize(FONT_SIZE_FOOTER);
        doc.setTextColor(colorMutedRgb[0], colorMutedRgb[1], colorMutedRgb[2]);
        doc.text(`Page ${currentPageNumber}`, pageWidth - margin, pageHeight - margin / 2, { align: 'right' });
        currentPageNumber++;
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

    doc.setFont("helvetica", "normal"); 

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

    const logoHeight = 15; 
    const logoWidth = 15;  
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

    doc.setDrawColor(colorMutedRgb[0], colorMutedRgb[1], colorMutedRgb[2]);
    doc.setLineWidth(0.2);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 4;

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
        
        let maxClientInfoY = yPos;

        if (clientInfo.callPreferences && (clientInfo.callPreferences.phoneNumber || clientInfo.callPreferences.availableDays.length > 0 || clientInfo.callPreferences.availableTimes.length > 0)) {
            let tempYPos = clientInfoStartY; 
            doc.setFont("helvetica", "bold");
            doc.text("Phone:", clientInfoCol2X, tempYPos);
            doc.setFont("helvetica", "normal");
            doc.text(clientInfo.callPreferences.phoneNumber || "N/A", clientInfoCol2X + 15, tempYPos);
            tempYPos += getLineHeight(FONT_SIZE_CLIENT_DATA) + 0.5;

            if(clientInfo.callPreferences.availableDays.length > 0 || clientInfo.callPreferences.availableTimes.length > 0){
                doc.setFont("helvetica", "bold");
                doc.text("Availability:", clientInfoCol2X, tempYPos);
                doc.setFont("helvetica", "normal");
                const availabilityText = `${clientInfo.callPreferences.availableDays.join(', ')}${clientInfo.callPreferences.availableTimes.length > 0 ? ' - ' + clientInfo.callPreferences.availableTimes.join(', ') : ''}`;
                const splitAvailability = doc.splitTextToSize(availabilityText, contentWidth / 2 - 20); 
                doc.text(splitAvailability, clientInfoCol2X + 20, tempYPos); 
                tempYPos += getLineHeight(FONT_SIZE_CLIENT_DATA) * splitAvailability.length;
            }
             maxClientInfoY = Math.max(maxClientInfoY, tempYPos);
        }
        yPos = maxClientInfoY + getLineHeight(FONT_SIZE_CLIENT_LABEL) + 3; 
    }
    
    doc.setDrawColor(colorMutedRgb[0], colorMutedRgb[1], colorMutedRgb[2]);
    doc.setLineWidth(0.2);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 4;

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
                currentTextY = yPos + getLineHeight(FONT_SIZE_ITEM_NAME) / 2; 
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
          <p className="mt-4 text-sm sm:text-base opacity-80">
            Welcome to your personalized design dashboard!
          </p>
          <p className="mt-1 text-xs sm:text-sm opacity-80">
            This is where your preferences and selections come together in one place. Use the menu to explore each category, based on the room selections you chose below, or continue by selected &quot;Finish &amp; Proceed&quot; at the bottom of each section.
          </p>
          <p className="mt-1 text-sm sm:text-base opacity-80">
            Don&apos;t forget to save your selections on each page. You&apos;ll see a progress percentage in the sidebar for each section. 
          </p>
          <p className="mt-1 text-sm sm:text-base opacity-80">
            To export your final PDF, all selected sections must be marked 100% complete.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
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
            {activeStages.length > 0 && (
               <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="bg-destructive/80 hover:bg-destructive">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset All Choices
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will permanently clear all your design selections, 
                      chosen rooms, and any client information you&apos;ve entered. 
                      This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmReset} className="bg-destructive hover:bg-destructive/90">
                      Yes, Reset Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
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
                      <p>Availability: {clientInfo.callPreferences.availableDays.join(', ')}${clientInfo.callPreferences.availableTimes.length > 0 ? ' - ' + clientInfo.callPreferences.availableTimes.join(', ') : ''}</p>
                    }
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {activeStages.length === 0 ? (
            <div className="mt-12 p-10 bg-card/60 backdrop-blur-lg border border-card-foreground/10 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Select Rooms To Design</h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                Choose the areas you&apos;d like to customize for your project. 
                &quot;Overall Budget&quot; and &quot;Overall Style&quot; will always be included.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto text-left">
                {designableRoomStages.map((stage) => (
                  <div key={stage.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/20 transition-colors">
                    <Checkbox
                      id={`room-${stage.id}`}
                      checked={tempSelectedRooms.has(stage.id)}
                      onCheckedChange={() => handleRoomSelectionChange(stage.id)}
                    />
                    <Label htmlFor={`room-${stage.id}`} className="text-sm font-medium leading-none cursor-pointer">
                      {stage.label}
                    </Label>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleStartDesigning}
                size="lg"
                disabled={tempSelectedRooms.size === 0}
              >
                <PencilLine className="mr-2 h-5 w-5" />
                Start Designing ({tempSelectedRooms.size} {tempSelectedRooms.size === 1 ? "Room" : "Rooms"})
              </Button>
            </div>
          ) : (
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
          )}
        </section>
      </div>
    </div>
  );
}

    
