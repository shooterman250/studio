
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    bathroomStyleOptions, // This is overallStyleOptions
    bathroomMasterBathTubOptions,
    bathroomMasterShowerOptions,
    bathroomMasterSinkOptions,
    bathroomToiletOptions, 
    bathroomHardwareFinishOptions, 
    bathroomStorageOptions, 
    generalLightingOptions as bathroomLightingOptions, 
    bathroomHalfSinkOptions, 
    type BaseSelectionItem
} from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress, type SelectedDataItem, DesignStageKey } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig } from "@/config/navigation";
import { ArrowRight } from "lucide-react";

const PAGE_STAGE_KEY: DesignStageKey = "bathroom";

export default function BathroomPage() {
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

  // Create page-specific display options for Master Bath Style
  const pageSpecificDisplayBathroomStyleOptions: BaseSelectionItem[] = bathroomStyleOptions.map(style => ({
    ...style, // Copies id, imageUrl, original description, dataAiHint
    name: `${style.name} Bathroom` // Override only the name for display on this page
  }));
  
  const masterBathSubSections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Master Bath: Style", options: pageSpecificDisplayBathroomStyleOptions, cols: 3, description: "Define the overall style for your master bathroom." },
    { title: "Master Bath: Bath Tub", options: bathroomMasterBathTubOptions, cols: 3, description: "Choose a bathtub type." },
    { title: "Master Bath: Shower", options: bathroomMasterShowerOptions, cols: 3, description: "Select your preferred shower setup." },
    { title: "Master Bath: Sink (Single/Double)", options: bathroomMasterSinkOptions, cols: 3, description: "Choose sink style and count." },
    { title: "Master Bath: Toilet", options: bathroomToiletOptions, cols: 3, description: "Select a toilet type." },
    { title: "Master Bath: Hardware Finish", options: bathroomHardwareFinishOptions, cols: 3, description: "Pick finishes for faucets, handles, etc." },
    { title: "Master Bath: Storage", options: bathroomStorageOptions, cols: 3, description: "Select storage solutions." },
    { title: "Master Bath: Lighting", options: bathroomLightingOptions, cols: 3, description: "Choose lighting fixtures." },
  ];

  const halfBathSubSections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Half-Bath: Sink", options: bathroomHalfSinkOptions, cols: 3, description: "Select a sink for the powder room." },
    { title: "Half-Bath: Toilet", options: bathroomToiletOptions, cols: 3, description: "Choose a toilet." }, 
    { title: "Half-Bath: Hardware Finish", options: bathroomHardwareFinishOptions, cols: 3, description: "Select hardware finishes." }, 
    { title: "Half-Bath: Storage", options: bathroomStorageOptions.slice(0,3), cols: 3, description: "Consider storage options." }, 
    { title: "Half-Bath: Lighting", options: bathroomLightingOptions.slice(0,3), cols: 3, description: "Choose lighting." }, 
  ];

  const sections = [...masterBathSubSections, ...halfBathSubSections];


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
        newProgress = Math.min(newProgress, 99); // Cap at 99 if not all subsections covered
    } else {
        newProgress = 0;
    }
    newProgress = Math.max(0, Math.min(100, newProgress));
    
    const allSelectedItems: SelectedDataItem[] = [];
    sections.forEach(section => {
      // Iterate over the options used for display in this section
      section.options.forEach(displayOption => { 
        if (selectedOptions.has(displayOption.id)) {
          let originalItem: BaseSelectionItem | undefined;

          if (section.title === "Master Bath: Style") {
            // For the style section, find the original item from bathroomStyleOptions (which is overallStyleOptions)
            originalItem = bathroomStyleOptions.find(opt => opt.id === displayOption.id);
          } else {
            // For other sections, the displayOption is the original item
            originalItem = displayOption;
          }
          
          if (originalItem) {
            allSelectedItems.push({
              id: originalItem.id,
              name: originalItem.name, // Save the original name
              imageUrl: originalItem.imageUrl, // Save the original image URL
              description: originalItem.description, // Save the original item's description
              dataAiHint: originalItem.dataAiHint || originalItem.name.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').slice(0,2).join(' ')
            });
          }
        }
      });
    });
    
    updateStageSelections(PAGE_STAGE_KEY, newProgress, allSelectedItems);
    setHasSavedSinceLastChange(true);
    
    toast({
      title: "Bathroom Choices Saved",
      description: `You've selected ${allSelectedItems.length} item(s) for the bathroom(s). Progress updated to ${newProgress}%.`,
    });
  };

  const designStagesNavConfig = baseNavItemsConfig.filter(item => item.id !== 'dashboard' && item.id !== 'settings');
  const currentIndex = designStagesNavConfig.findIndex(item => item.href === pathname);
  const nextStage = currentIndex !== -1 && currentIndex < designStagesNavConfig.length - 1 ? designStagesNavConfig[currentIndex + 1] : null;

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Bathroom(s) Customization
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Design your master and half bathrooms by selecting your preferences for each category.
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
                {section.options.map((option) => ( // 'option' here is from pageSpecific... for Style, or original for others
                  <ItemSelectionCard
                    key={option.id}
                    item={option} // Pass the item with the modified name for display in the Style section
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
            Save Bathroom Choices ({selectedOptions.size})
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
