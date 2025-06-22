
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  overallStyleOptions as baseOverallStyleOptions,
  generalWallFinishOptions as bedroomWallFinishOptions,
  generalFlooringOptions as bedroomFlooringOptions,
  bedroomWardrobeOptions as baseBedroomWardrobeOptions,
  type BaseSelectionItem
} from "@/types";
import { bedroomLightingOptions } from "@/data/bedroomOptions";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress, type SelectedDataItem, DesignStageKey } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig, type BaseNavItemConfig } from "@/config/navigation";
import { ArrowRight, Home } from "lucide-react";

const PAGE_STAGE_KEY: DesignStageKey = "bedroom";

export default function BedroomPage() {
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

  const pageSpecificBedroomStyleOptions: BaseSelectionItem[] = baseOverallStyleOptions.map(style => {
    let imageUrl = style.imageUrl;
    if (style.id === 'biophilic') imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381000635108954342/Biophilic_Bedroom_Style_.jpg';
    if (style.id === 'bohemian') imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381001039024488589/Bohemian_Bedroom_Style_.jpg';
    if (style.id === 'coastal') imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381001582124204112/Coastal_Bedroom_Style.jpg';
    if (style.id === 'contemporary') imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381001835544055968/Contemporary_Bedroom_Style.png';
    if (style.id === 'country-farmhouse') imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381002174473044159/Country_Farmhouse_Bedroom_Style.jpg';
    if (style.id === 'industrial') imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381002518670217236/Industrial_Bedroom_Style_.jpg';
    if (style.id === 'japandi') imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1379597723782610954/Japandi_Bedroom_Style.jpg';
    if (style.id === 'mid-century') imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1379597724592377906/Mid-Century_Bedroom.png';
    if (style.id === 'modern') imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1379597725489827900/Modern_Bedroom_Style.png';
    if (style.id === 'traditional') imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1379597726240604312/Traditional_Bedroom_Style_.png';
    return {
      ...style,
      name: `${style.name} Bedroom`,
      imageUrl,
    };
  });

  const pageSpecificBedroomWardrobeOptions: BaseSelectionItem[] = baseBedroomWardrobeOptions
    .filter(option => [
      'bed-wardrobe-one-standard',
      'bed-wardrobe-two-standard',
      'bed-wardrobe-walkin',
      'bed-wardrobe-fitted',
      'bed-wardrobe-bi-fold',
      'bed-wardrobe-custom'
    ].includes(option.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const sections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Bedroom Style", options: pageSpecificBedroomStyleOptions, cols: 3 },
    { title: "Wall Finish", options: bedroomWallFinishOptions, cols: 3 },
    { title: "Flooring", options: bedroomFlooringOptions, cols: 3 },
    { title: "Lighting", options: bedroomLightingOptions, cols: 3 },
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
      newProgress = totalOptionsOnPage > 0
        ? Math.round((selectedOptions.size / totalOptionsOnPage) * 50) + Math.round((subsectionsWithSelections / totalSubsections) * 50)
        : 0;
      newProgress = Math.min(newProgress, 99);
    }
    newProgress = Math.max(0, Math.min(100, newProgress));

    const allSelectedItems: SelectedDataItem[] = [];
    sections.forEach(section => {
      section.options.forEach(option => {
        if (selectedOptions.has(option.id)) {
          allSelectedItems.push({
            id: option.id,
            name: option.name,
            imageUrl: option.imageUrl,
            description: option.description,
            dataAiHint: option.dataAiHint || option.name.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').slice(0, 2).join(' '),
          });
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

  const getDynamicNavConfig = (): BaseNavItemConfig[] => {
    const initialStages = baseNavItemsConfig.filter(item => item.id === 'overall-budget' || item.id === 'overall-style');
    const orderedInitialStages: BaseNavItemConfig[] = [];
    const budgetStage = initialStages.find(s => s.id === 'overall-budget');
    const styleStage = initialStages.find(s => s.id === 'overall-style');
    if (budgetStage) orderedInitialStages.push(budgetStage);
    if (styleStage) orderedInitialStages.push(styleStage);

    const selectedRoomStages = baseNavItemsConfig.filter(item =>
      userRoomSelections.has(item.id) &&
      !['overall-budget', 'overall-style', 'dashboard', 'settings'].includes(item.id)
    );

    const finalNavOrder: BaseNavItemConfig[] = [...orderedInitialStages];
    baseNavItemsConfig.forEach(baseItem => {
      if (selectedRoomStages.some(srs => srs.id === baseItem.id) && !finalNavOrder.some(fno => fno.id === baseItem.id)) {
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
              Finish & Proceed
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
