
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    generalWallFinishOptions as bedroomWallFinishOptions,
    generalFlooringOptions as bedroomFlooringOptions,
    generalLightingOptions as baseBedroomLightingOptions, // Aliased for clarity
    bedroomWardrobeOptions as baseBedroomWardrobeOptions, 
    type BaseSelectionItem 
} from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress, type SelectedDataItem, DesignStageKey } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig } from "@/config/navigation";
import { ArrowRight } from "lucide-react";

const PAGE_STAGE_KEY: DesignStageKey = "bedroom";

export default function BedroomPage() {
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

  const pageSpecificBedroomWardrobeOptions: BaseSelectionItem[] = [
    ...baseBedroomWardrobeOptions,
    {
      id: 'bed-wardrobe-fitted-display', 
      name: 'Fitted Wardrobe',
      imageUrl: 'https://placehold.co/400x300.png',
      dataAiHint: 'fitted wardrobe bedroom',
    },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const pageSpecificBedroomLightingOptions: BaseSelectionItem[] = baseBedroomLightingOptions.map(option => {
    if (option.id === 'light-chandelier') {
      return { ...option, name: "Chandelier(s) or Statement Fixtures" };
    }
    return option;
  });
  
  const sections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Wall Finish", options: bedroomWallFinishOptions, cols: 3 },
    { title: "Flooring", options: bedroomFlooringOptions, cols: 3 },
    { title: "Lighting", options: pageSpecificBedroomLightingOptions, cols: 3 },
    { title: "Wardrobe/Closet", options: pageSpecificBedroomWardrobeOptions, cols: 3 },
  ];

  const handleSaveChanges = () => {
    const totalOptionsOnPage = sections.reduce((sum, section) => sum + section.options.length, 0);
    const totalSubsections = sections.length;
    let subsectionsWithSelections = 0;

    sections.forEach(section => {
        if (section.options.some(option => selectedOptions.has(option.id))) {
            subsectionsWithSelections++;
        }
    });

    let newProgress = 0;
    if (selectedOptions.size === 0) {
        newProgress = 0;
    } else if (totalSubsections > 0 && subsectionsWithSelections === totalSubsections) {
        newProgress = 100;
    } else if (totalSubsections > 0) {
         newProgress = totalOptionsOnPage > 0 ? Math.round((selectedOptions.size / totalOptionsOnPage) * 50) + Math.round((subsectionsWithSelections / totalSubsections) * 50) : 0;
         newProgress = Math.min(newProgress, 99); 
    } else {
        newProgress = 0;
    }
    newProgress = Math.max(0, Math.min(100, newProgress));
    
    const allSelectedItems: SelectedDataItem[] = [];
    sections.forEach(section => {
      section.options.forEach(displayOption => { 
        if (selectedOptions.has(displayOption.id)) {
          let originalItem: BaseSelectionItem | undefined;

          if (section.options === pageSpecificBedroomLightingOptions) {
            originalItem = baseBedroomLightingOptions.find(opt => opt.id === displayOption.id);
          } else if (section.options === pageSpecificBedroomWardrobeOptions) {
             // For wardrobe, if it's the page-specific 'Fitted Wardrobe', use its details.
             // Otherwise, find the original from baseBedroomWardrobeOptions.
            if (displayOption.id === 'bed-wardrobe-fitted-display') {
              originalItem = displayOption; // Use the page-specific item directly
            } else {
              originalItem = baseBedroomWardrobeOptions.find(opt => opt.id === displayOption.id);
            }
          } else {
            // For other sections (Wall Finish, Flooring), assume displayOption is the originalItem
            // as they are not currently being transformed for display.
            originalItem = displayOption; 
          }
          
          if (originalItem) {
            allSelectedItems.push({
              id: originalItem.id,
              name: originalItem.name,
              imageUrl: originalItem.imageUrl,
              description: originalItem.description, 
              dataAiHint: originalItem.dataAiHint || originalItem.name.toLowerCase().replace(/[^a-z0-9\\s]/gi, '').split(' ').slice(0,2).join(' ')
            });
          }
        }
      });
    });

    updateStageSelections(PAGE_STAGE_KEY, newProgress, allSelectedItems); 
    setHasSavedSinceLastChange(true);
    
    toast({
      title: "Bedroom Choices Saved",
      description: `You've selected ${allSelectedItems.length} item(s) for the bedroom(s). Progress updated to ${newProgress}%.`,
    });
  };

  const designStagesNavConfig = baseNavItemsConfig.filter(item => item.id !== 'dashboard' && item.id !== 'settings');
  const currentIndex = designStagesNavConfig.findIndex(item => item.href === pathname);
  const nextStage = currentIndex !== -1 && currentIndex < designStagesNavConfig.length - 1 ? designStagesNavConfig[currentIndex + 1] : null;

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Bedroom(s) Customization
        </h1>
        <p className="mt-2 max-w-2xl mx-auto text-base opacity-80 sm:text-lg">
          Select One or More Options For Each Section
        </p>
      </header>

      <section className="max-w-7xl mx-auto space-y-12">
        {sections.map(section => (
          <Card key={section.title} className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              {section.description && <CardDescription>{section.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.options.map((option) => (
                  <ItemSelectionCard
                    key={option.id}
                    item={option}
                    isSelected={selectedOptions.has(option.id)}
                    onSelect={handleOptionChange}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
            
        <div className="pt-4 flex flex-col sm:flex-row justify-end gap-2">
          <Button className="w-full sm:w-auto" onClick={handleSaveChanges}>
            Save Bedroom Choices ({selectedOptions.size})
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
