
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    overallStyleOptions as baseOverallStyleOptions,
    kitchenCabinetOptions,
    kitchenWorktopOptions,
    kitchenApplianceOptions as baseKitchenApplianceOptions, 
    kitchenHardwareFinishOptions,
    kitchenSinkTypeOptions as baseKitchenSinkTypeOptions, 
    kitchenBacksplashOptions,
    generalFlooringOptions as kitchenFlooringOptions,
    generalLightingOptions as baseKitchenLightingOptions,
    type BaseSelectionItem
} from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress, type SelectedDataItem, DesignStageKey } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig, type BaseNavItemConfig } from "@/config/navigation";
import { ArrowRight, Home } from "lucide-react";

const PAGE_STAGE_KEY: DesignStageKey = "kitchen";

export default function KitchenPage() {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [hasSavedSinceLastChange, setHasSavedSinceLastChange] = useState(false);
  const { updateStageSelections, getStageSelections, getUserRoomSelections, getClientInfo } = useDesignProgress();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const userRoomSelections = getUserRoomSelections();

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

  const pageSpecificKitchenStyleOptions: BaseSelectionItem[] = baseOverallStyleOptions.map(style => {
    let imageUrl = style.imageUrl; 
    if (style.id === 'biophilic') {
      imageUrl = 'https://media.discordapp.net/attachments/1374799696127721638/1374807181366526022/Biophilic_Kitchen.png?ex=682f6476&is=682e12f6&hm=0a97c7bd5dd44b0b2d75058a72978aaa34b76f9d82b3a312b3e7dcf1566442fd&=&format=webp&quality=lossless&width=938&height=938';
    }
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

  const applianceOrder: string[] = [
    'k-app-finish-stainless', 
    'k-app-finish-black', 
    'k-app-finish-white', 
    'k-app-finish-color', 
    'k-app-smart', 
    'k-app-fingerprint'
  ];
  
  const filteredBaseAppliances = baseKitchenApplianceOptions.filter(
    option => option.id !== 'k-app-freestanding' && option.id !== 'k-app-integrated'
  );

  const pageSpecificDisplayApplianceOptions: BaseSelectionItem[] = applianceOrder
    .map(id => filteredBaseAppliances.find(option => option.id === id))
    .filter((option): option is BaseSelectionItem => option !== undefined);
  
  const pageSpecificLightingOptions: BaseSelectionItem[] = baseKitchenLightingOptions
    .filter(
      option => 
        option.id !== 'light-wallsconce' && 
        option.id !== 'light-niche' && 
        option.id !== 'light-chandelier' 
    )
    .map(option => {
      if (option.id === 'light-concealed') {
        return { ...option, name: "Under Cabinet or Shelf Lighting" };
      }
      return option;
    });

  const sections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Kitchen Style", description: "Select the overall style for your kitchen.", options: pageSpecificKitchenStyleOptions, cols: 3 },
    { title: "Cabinets", options: kitchenCabinetOptions, cols: 3 },
    { title: "Worktop/Countertop", options: kitchenWorktopOptions, cols: 3 },
    { title: "Appliance Finish & Features", description: "Select appliance features and finishes.", options: pageSpecificDisplayApplianceOptions, cols: 3 },
    { title: "Appliance/Hardware Finish", options: kitchenHardwareFinishOptions, cols: 3 },
    { title: "Sink Type", options: pageSpecificSinkTypeOptions, cols: 3 }, 
    { title: "Backsplash", options: kitchenBacksplashOptions, cols: 3 },
 { title: "Flooring", options: kitchenFlooringOptions.map(opt => opt.id === 'flooring-tile' ? { ...opt, name: 'Marble' } : opt).map(opt => opt.id === 'flooring-vinyl' ? { ...opt, name: 'Luxury Vinyl' } : opt), cols: 3 },
    { title: "Lighting", options: pageSpecificLightingOptions, cols: 3 },
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

          if (section.options === pageSpecificKitchenStyleOptions) {
            originalItem = baseOverallStyleOptions.find(opt => opt.id === displayOption.id);
          } else if (section.options === pageSpecificSinkTypeOptions) {
            originalItem = baseKitchenSinkTypeOptions.find(opt => opt.id === displayOption.id);
          } else if (section.options === pageSpecificDisplayApplianceOptions) {
            originalItem = baseKitchenApplianceOptions.find(opt => opt.id === displayOption.id);
          } else if (section.options === pageSpecificLightingOptions) {
            originalItem = baseKitchenLightingOptions.find(opt => opt.id === displayOption.id);
          }
          else {
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

  const getDynamicNavConfig = (): BaseNavItemConfig[] => {
    const initialStages = baseNavItemsConfig.filter(
      item => item.id === 'overall-budget' || item.id === 'overall-style'
    );
    
    const orderedInitialStages: BaseNavItemConfig[] = [];
    const budgetStage = initialStages.find(s => s.id === 'overall-budget');
    const styleStage = initialStages.find(s => s.id === 'overall-style');
    if (budgetStage) orderedInitialStages.push(budgetStage);
    if (styleStage) orderedInitialStages.push(styleStage);

    const selectedRoomStages = baseNavItemsConfig.filter(item => 
      userRoomSelections.has(item.id) && 
      item.id !== 'overall-budget' && 
      item.id !== 'overall-style' &&
      item.id !== 'dashboard' &&
      item.id !== 'settings'
    );
    
    const finalNavOrder: BaseNavItemConfig[] = [...orderedInitialStages];
    baseNavItemsConfig.forEach(baseItem => {
        if(selectedRoomStages.some(srs => srs.id === baseItem.id) && !finalNavOrder.some(fno => fno.id === baseItem.id)) {
            finalNavOrder.push(baseItem);
        }
    });
    return finalNavOrder;
  };

  const dynamicNavConfig = getDynamicNavConfig();
  const currentIndex = dynamicNavConfig.findIndex(item => item.href === pathname);
  
  const nextStage = currentIndex !== -1 && currentIndex < dynamicNavConfig.length - 1 
    ? dynamicNavConfig[currentIndex + 1] 
    : null;

  const handleFinishAndProceed = () => {
    handleSaveChanges(); 
    const clientInfo = getClientInfo();
    if (!clientInfo || !clientInfo.fullName || !clientInfo.email) {
      toast({
        title: "Client Information Needed",
        description: "Please fill out your client information before viewing the dashboard.",
        variant: "default", 
      });
      router.push('/client-info');
    } else {
      router.push('/designer');
    }
  };

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Kitchen Customization
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
            Save Kitchen Choices ({selectedOptions.size})
          </Button>
          {nextStage ? (
            <Button
              onClick={() => router.push(nextStage.href)}
              variant="outline"
              className="w-full sm:w-auto"
              disabled={!hasSavedSinceLastChange}
            >
              Next Section ({nextStage.label})
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFinishAndProceed}
              variant="default" 
              className="w-full sm:w-auto"
              disabled={!hasSavedSinceLastChange}
            >
              <Home className="mr-2 h-4 w-4" />
              Finish &amp; Proceed
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
