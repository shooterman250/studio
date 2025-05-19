
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    overallStyleOptions,
    kitchenCabinetOptions,
    kitchenWorktopOptions,
    kitchenApplianceOptions as baseKitchenApplianceOptions, 
    kitchenHardwareFinishOptions,
    kitchenSinkTypeOptions as baseKitchenSinkTypeOptions, 
    kitchenBacksplashOptions,
    generalFlooringOptions as kitchenFlooringOptions,
    generalLightingOptions as baseKitchenLightingOptions, // Renamed for clarity
    type BaseSelectionItem
} from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress, type SelectedDataItem, DesignStageKey } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig } from "@/config/navigation";
import { ArrowRight } from "lucide-react";

const PAGE_STAGE_KEY: DesignStageKey = "kitchen";

export default function KitchenPage() {
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

  const pageSpecificKitchenStyleOptions: BaseSelectionItem[] = overallStyleOptions.map(style => {
    let imageUrl = style.imageUrl; 
    if (style.id === 'biophilic') {
      imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1370575695373144224/Overall_Style_biophilic.png?ex=682b3455&is=6829e2d5&hm=d25337aa613c5b72296fbfd9070e35e2f7f5ab0d14f24869777d3f9d397f7dca&=&format=webp&quality=lossless&width=774&height=774';
    }
    // Add other specific image overrides for the kitchen page if needed
    return {
      ...style,
      name: `${style.name} Kitchen`,
      imageUrl: imageUrl, 
    };
  });

  const pageSpecificSinkTypeOptions: BaseSelectionItem[] = baseKitchenSinkTypeOptions.map(sinkType => ({
    ...sinkType,
    name: `${sinkType.name} Kitchen Sink`,
  }));

  const pageSpecificDisplayApplianceOptions: BaseSelectionItem[] = baseKitchenApplianceOptions.filter(
    option => option.id !== 'k-app-freestanding' && option.id !== 'k-app-integrated'
  );

  const pageSpecificLightingOptions: BaseSelectionItem[] = baseKitchenLightingOptions.filter(
    option => option.id !== 'light-wallsconce' && option.id !== 'light-niche' && option.id !== 'light-chandelier'
  );

  const sections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Kitchen Style", description: "Select the overall style for your kitchen.", options: pageSpecificKitchenStyleOptions, cols: 3 },
    { title: "Cabinets", description: "Choose your preferred cabinet style.", options: kitchenCabinetOptions, cols: 3 },
    { title: "Worktop/Countertop", description: "Select materials for your countertops.", options: kitchenWorktopOptions, cols: 3 },
    { title: "Appliance Finish & Features", description: "Select appliance features and finishes.", options: pageSpecificDisplayApplianceOptions, cols: 3 },
    { title: "Appliance/Hardware Finish", description: "Select finishes for hardware and appliances.", options: kitchenHardwareFinishOptions, cols: 3 },
    { title: "Sink Type", description: "Choose your sink configuration.", options: pageSpecificSinkTypeOptions, cols: 3 }, 
    { title: "Backsplash", description: "Select backsplash materials.", options: kitchenBacksplashOptions, cols: 3 },
    { title: "Flooring", description: "Choose flooring for the kitchen.", options: kitchenFlooringOptions, cols: 3 },
    { title: "Lighting", description: "Select lighting fixtures.", options: pageSpecificLightingOptions, cols: 3 },
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

          // Find original item from base arrays to ensure original data (name, imageUrl) is saved
          if (section.options === pageSpecificKitchenStyleOptions) {
            originalItem = overallStyleOptions.find(opt => opt.id === displayOption.id);
          } else if (section.options === pageSpecificSinkTypeOptions) {
            originalItem = baseKitchenSinkTypeOptions.find(opt => opt.id === displayOption.id);
          } else if (section.options === pageSpecificDisplayApplianceOptions) {
            originalItem = baseKitchenApplianceOptions.find(opt => opt.id === displayOption.id);
          } else if (section.options === pageSpecificLightingOptions) {
            originalItem = baseKitchenLightingOptions.find(opt => opt.id === displayOption.id);
          }
          else {
            // For sections that use direct base options
            const allBaseOptions = [ 
              ...kitchenCabinetOptions,
              ...kitchenWorktopOptions,
              ...kitchenHardwareFinishOptions,
              ...kitchenBacksplashOptions,
              ...kitchenFlooringOptions, 
            ];
            originalItem = allBaseOptions.find(opt => opt.id === displayOption.id) || displayOption; 
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
      title: "Kitchen Choices Saved",
      description: `You've selected ${allSelectedItems.length} item(s) for the kitchen. Progress updated to ${newProgress}%.`,
    });
  };

  const designStagesNavConfig = baseNavItemsConfig.filter(item => item.id !== 'dashboard' && item.id !== 'settings');
  const currentIndex = designStagesNavConfig.findIndex(item => item.href === pathname);
  const nextStage = currentIndex !== -1 && currentIndex < designStagesNavConfig.length - 1 ? designStagesNavConfig[currentIndex + 1] : null;

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Kitchen Customization
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Design your dream kitchen by selecting options for each category below. You can select multiple items.
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
            Save Kitchen Choices ({selectedOptions.size})
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
    

    
