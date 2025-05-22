
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    overallStyleOptions as baseOverallStyleOptions, 
    bathroomMasterBathTubOptions,
    bathroomMasterShowerOptions,
    bathroomMasterSinkOptions as baseBathroomMasterSinkOptions, 
    bathroomToiletOptions, 
    bathroomHardwareFinishOptions as baseBathroomHardwareFinishOptions, 
    bathroomStorageOptions as baseBathroomStorageOptions, 
    generalLightingOptions as baseBathroomLightingOptions, 
    bathroomHalfSinkOptions as baseBathroomHalfSinkOptions, 
    type BaseSelectionItem
} from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress, type SelectedDataItem, DesignStageKey } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig } from "@/config/navigation";
import { ArrowRight } from "lucide-react";

const PAGE_STAGE_KEY: DesignStageKey = "bathroom";
const newConsoleImageUrl = "https://media.discordapp.net/attachments/1374539386368167948/1374541051578024126/Console.png?ex=682e6c9c&is=682d1b1c&hm=9d427df1e7f3690029dd359522e2359d172c7fa8603e20f8cc5b32b1568523f5&=&format=webp&quality=lossless&width=1242&height=1242";

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

  const pageSpecificDisplayBathroomStyleOptions: BaseSelectionItem[] = baseOverallStyleOptions.map(style => {
    return {
     ...style,
      name: `${style.name} Bathroom` 
    };
  });

  const pageSpecificDisplayMasterSinkOptions: BaseSelectionItem[] = baseBathroomMasterSinkOptions.map(sink => {
    const originalNamePart = sink.name.replace(/ Sink/i, "").trim(); 
    let imageUrl = sink.imageUrl;
    if (sink.id === 'bm-sink-console-s') {
      imageUrl = newConsoleImageUrl;
    }
    return {
      ...sink, 
      name: `${originalNamePart}\nBathroom Sink`,
      imageUrl: imageUrl
    };
  });

  const pageSpecificDisplayHardwareFinishOptions: BaseSelectionItem[] = baseBathroomHardwareFinishOptions.map(finish => {
    if (finish.id === 'bath-hardware-chrome') {
      return { ...finish, name: "Chrome, Nickel or\nStainless Steel" };
    }
    if (finish.id === 'bath-hardware-bronze') {
      return { ...finish, name: "Bronze or Brass" };
    }
    if (finish.id === 'bath-hardware-handleless') {
      return { ...finish, name: "Handlesless or Flat" };
    }
    if (finish.id === 'bath-hardware-multitone') {
        return { ...finish, name: "Multi-Tone or Abstract" };
    }
    return finish;
  });

  const pageSpecificDisplayBathroomHalfSinkOptions: BaseSelectionItem[] = baseBathroomHalfSinkOptions.map(sink => {
    const originalNamePart = sink.name.replace(/ Sink/i, "").trim();
    let imageUrl = sink.imageUrl;
    if (sink.id === 'bh-sink-console') {
      imageUrl = newConsoleImageUrl;
    }
    return {
      ...sink,
      name: `${originalNamePart}\nBathroom Sink`,
      imageUrl: imageUrl
    };
  });
  
  const pageSpecificDisplayMasterLightingOptions: BaseSelectionItem[] = baseBathroomLightingOptions
    .filter(option => option.id !== 'light-niche' && option.id !== 'light-recessed-cylinder' && option.id !== 'light-concealed') 
    .map(option => {
      if (option.id === 'light-chandelier') {
        return { ...option, name: "Chandelier(s) or\nStatement Fixtures" };
      }
      return option;
    });

  const filteredHalfBathLightingOptions = baseBathroomLightingOptions
    .filter(option => option.id !== 'light-niche' && option.id !== 'light-recessed-cylinder' && option.id !== 'light-concealed') 
    .map(option => {
      if (option.id === 'light-chandelier') {
        return { ...option, name: "Chandelier(s) or\nStatement Fixtures" };
      }
      return option;
    });
  
  const pageSpecificBathroomStorageOptions: BaseSelectionItem[] = baseBathroomStorageOptions.filter(
    option => option.id !== 'bath-store-customvanity'
  );

  const masterBathSubSections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Master Bath: Style", options: pageSpecificDisplayBathroomStyleOptions, cols: 3, description: "Define the overall style for your master bathroom." },
    { title: "Master Bath: Bath Tub", options: bathroomMasterBathTubOptions, cols: 3, description: "Choose a bathtub type." },
    { title: "Master Bath: Shower", options: bathroomMasterShowerOptions, cols: 3, description: "Select your preferred shower setup." },
    { title: "Master Bathroom: Sink (Double/Single)", options: pageSpecificDisplayMasterSinkOptions, cols: 3, description: "Choose Sink Style. Double or Single." },
    { title: "Master Bath: Toilet", options: bathroomToiletOptions, cols: 3 },
    { title: "Master Bath: Hardware Finish", options: pageSpecificDisplayHardwareFinishOptions, cols: 3, description: "Pick finishes for faucets, handles, etc." },
    { title: "Master Bath: Storage", options: pageSpecificBathroomStorageOptions, cols: 3, description: "Select storage solutions." },
    { title: "Master Bath: Lighting", options: pageSpecificDisplayMasterLightingOptions, cols: 3, description: "Choose lighting fixtures." }, 
  ];

  const halfBathSubSections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Half-Bath: Sink", options: pageSpecificDisplayBathroomHalfSinkOptions, cols: 3, description: "Select a sink for the powder room." },
    { title: "Half-Bath: Toilet", options: bathroomToiletOptions, cols: 3 }, 
    { title: "Half-Bath: Hardware Finish", options: pageSpecificDisplayHardwareFinishOptions, cols: 3, description: "Select hardware finishes." }, 
    { title: "Half-Bath: Storage", options: pageSpecificBathroomStorageOptions, cols: 3, description: "Consider storage options." }, 
    { title: "Half-Bath: Lighting", options: filteredHalfBathLightingOptions, cols: 3, description: "Choose lighting." }, 
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

          // Determine which base array the displayOption originally came from
          if (pageSpecificDisplayBathroomStyleOptions.some(opt => opt.id === displayOption.id)) {
            originalItem = baseOverallStyleOptions.find(opt => opt.id === displayOption.id);
          } else if (pageSpecificDisplayMasterSinkOptions.some(opt => opt.id === displayOption.id)) {
            originalItem = baseBathroomMasterSinkOptions.find(opt => opt.id === displayOption.id);
          } else if (pageSpecificDisplayHardwareFinishOptions.some(opt => opt.id === displayOption.id)) {
            originalItem = baseBathroomHardwareFinishOptions.find(opt => opt.id === displayOption.id);
          } else if (pageSpecificDisplayBathroomHalfSinkOptions.some(opt => opt.id === displayOption.id)) {
            originalItem = baseBathroomHalfSinkOptions.find(opt => opt.id === displayOption.id);
          } else if (pageSpecificDisplayMasterLightingOptions.some(opt => opt.id === displayOption.id) || filteredHalfBathLightingOptions.some(opt => opt.id === displayOption.id)) { 
            originalItem = baseBathroomLightingOptions.find(opt => opt.id === displayOption.id);
          } else if (pageSpecificBathroomStorageOptions.some(opt => opt.id === displayOption.id)){
            originalItem = baseBathroomStorageOptions.find(opt => opt.id === displayOption.id);
          }
          else { 
            const baseArray = 
              section.options === bathroomMasterBathTubOptions ? bathroomMasterBathTubOptions :
              section.options === bathroomMasterShowerOptions ? bathroomMasterShowerOptions :
              section.options === bathroomToiletOptions ? bathroomToiletOptions :
              null; 
            
            if (baseArray) {
              originalItem = baseArray.find(opt => opt.id === displayOption.id);
            } else {
                // Fallback for options not in page-specific arrays (should ideally not happen if all handled)
                originalItem = displayOption; 
            }
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
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Bathroom(s) Customization
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

