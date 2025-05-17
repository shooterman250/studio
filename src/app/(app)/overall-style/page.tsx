
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    overallStyleOptions as baseOverallStyleOptions, 
    keyElementOptions as baseKeyElementOptions, 
    type BaseSelectionItem 
} from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress, type SelectedDataItem, DesignStageKey } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig } from "@/config/navigation";
import { ArrowRight } from "lucide-react";

const PAGE_STAGE_KEY: DesignStageKey = "overall-style";

export default function OverallStylePage() {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [hasSavedSinceLastChange, setHasSavedSinceLastChange] = useState(false);
  const { updateStageSelections, getStageSelections } = useDesignProgress();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

   useEffect(() => {
    const existingSelections = getStageSelections(PAGE_STAGE_KEY);
    if (existingSelections.length > 0) {
      setSelectedOptions(new Set(existingSelections.map(item => item.id)));
    }
  }, [getStageSelections]);

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(optionId)) {
        newSelected.delete(optionId);
      } else {
        newSelected.add(optionId);
      }
      return newSelected;
    });
    setHasSavedSinceLastChange(false);
  };

  // Create page-specific options for display
  const pageSpecificDisplayOverallStyleOptions: BaseSelectionItem[] = baseOverallStyleOptions.map(style => {
    if (style.id === 'biophilic') {
      return {
        ...style,
        imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1370575695373144224/Overall_Style_biophilic.png?ex=68289155&is=68273fd5&hm=863564b39ff081ce56d636878c8ed47844c4f6f85919af86ad4f2bb004913602&=&format=webp&quality=lossless&width=1308&height=1308' // New URL for Biophilic on this page
      };
    }
    return style;
  });

  const sections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number; id: 'design-styles' | 'key-elements' }> = [
    { 
      id: 'design-styles', 
      title: "Select Design Styles", 
      description: "Choose one or more design styles that best represent your vision.", 
      options: pageSpecificDisplayOverallStyleOptions, // Use the display-specific version
      cols: 3 
    },
    { 
      id: 'key-elements', 
      title: "Select Key Elements", 
      description: "Choose guiding principles for your design.", 
      options: baseKeyElementOptions, // Key elements don't have overrides in this request
      cols: 3 
    }, 
  ];


  const handleSaveChanges = () => {
    const totalOptionsOnPage = sections.reduce((sum, section) => sum + section.options.length, 0);
    let newProgress = 0;

    const overallStyleOptionIds = new Set(baseOverallStyleOptions.map(opt => opt.id));
    const keyElementOptionIds = new Set(baseKeyElementOptions.map(opt => opt.id));

    let hasSelectedOverallStyle = false;
    let hasSelectedKeyElement = false;

    selectedOptions.forEach(selectedId => {
      if (overallStyleOptionIds.has(selectedId)) {
        hasSelectedOverallStyle = true;
      }
      if (keyElementOptionIds.has(selectedId)) {
        hasSelectedKeyElement = true;
      }
    });

    if (selectedOptions.size > 0) {
      if (hasSelectedOverallStyle && hasSelectedKeyElement) {
        newProgress = 100;
      } else {
        const subsectionsCovered = (hasSelectedOverallStyle ? 1 : 0) + (hasSelectedKeyElement ? 1 : 0);
        if (sections.length > 0) {
            if (subsectionsCovered === 1 && selectedOptions.size > 0 && totalOptionsOnPage > 0) {
                 const itemProgress = Math.round((selectedOptions.size / totalOptionsOnPage) * 50); 
                 const sectionProgress = 50; 
                 newProgress = Math.min(itemProgress + sectionProgress, 99); 
            } else {
                 newProgress = Math.round((subsectionsCovered / sections.length) * 100);
            }
            if (subsectionsCovered < sections.length && newProgress === 100) newProgress = 99; 
        } else {
            newProgress = totalOptionsOnPage > 0 ? Math.round((selectedOptions.size / totalOptionsOnPage) * 100) : 0;
        }
      }
    } else {
      newProgress = 0;
    }
    newProgress = Math.max(0, Math.min(100, newProgress));
    
    const allSelectedItems: SelectedDataItem[] = [];
    selectedOptions.forEach(selectedId => {
      let originalItem: BaseSelectionItem | undefined;
      
      originalItem = baseOverallStyleOptions.find(item => item.id === selectedId);
      
      if (!originalItem) {
        originalItem = baseKeyElementOptions.find(item => item.id === selectedId);
      }
  
      if (originalItem) {
        allSelectedItems.push({
          id: originalItem.id,
          name: originalItem.name,
          imageUrl: originalItem.imageUrl, // Use original imageUrl for saving
          description: originalItem.description,
          dataAiHint: originalItem.dataAiHint || originalItem.name.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').slice(0,2).join(' ')
        });
      }
    });

    updateStageSelections(PAGE_STAGE_KEY, newProgress, allSelectedItems);
    setHasSavedSinceLastChange(true);
    
    toast({
      title: "Overall Style Choices Saved",
      description: `You've selected ${allSelectedItems.length} item(s). Progress updated to ${newProgress}%.`,
    });
  };

  const designStagesNavConfig = baseNavItemsConfig.filter(item => item.id !== 'dashboard' && item.id !== 'settings');
  const currentIndex = designStagesNavConfig.findIndex(item => item.href === pathname);
  const nextStage = currentIndex !== -1 && currentIndex < designStagesNavConfig.length - 1 ? designStagesNavConfig[currentIndex + 1] : null;

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Overall Style & Key Elements
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Define the main aesthetic and core principles for your design.
        </p>
      </header>

      <section className="max-w-6xl mx-auto space-y-12">
        {sections.map(section => (
          <Card key={section.title} className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              {section.description && <CardDescription>{section.description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${section.cols || 3} gap-6`}>
                {section.options.map((style) => ( // 'style' here refers to items from pageSpecificDisplayOverallStyleOptions or baseKeyElementOptions
                  <ItemSelectionCard
                    key={style.id}
                    item={style} // Use the (potentially modified) item for display
                    isSelected={selectedOptions.has(style.id)}
                    onSelect={handleOptionChange}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="pt-4 flex flex-col sm:flex-row justify-end gap-2">
          <Button className="w-full sm:w-auto" onClick={handleSaveChanges}>
            Save Overall Style Choices ({selectedOptions.size})
          </Button>
           {nextStage && (
            <Button
              onClick={() => router.push(nextStage.href)}
              variant="outline"
              className="w-full sm:w-auto"
              disabled={!hasSavedSinceLastChange}
            >
              Next Section ({nextStage.label})
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

