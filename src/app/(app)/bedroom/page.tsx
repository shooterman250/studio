
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    overallStyleOptions as baseOverallStyleOptions,
    generalWallFinishOptions as bedroomWallFinishOptions,
    generalFlooringOptions as bedroomFlooringOptions,
    generalLightingOptions as baseBedroomLightingOptions,
    bedroomWardrobeOptions as baseBedroomWardrobeOptions,
    type BaseSelectionItem
} from "@/types";
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
    let imageUrl = style.imageUrl; // Uses base image for now
     if (style.id === 'biophilic') {
       imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381000635108954342/Biophilic_Bedroom_Style_.jpg?ex=6845ec91&is=68449b11&hm=879b02d72e74e34baa49769e695350e60df9822a515976089001db3d221b5803&=&format=webp&width=1174&height=1174';
     }
    if (style.id === 'bohemian') {
 imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381001039024488589/Bohemian_Bedroom_Style_.jpg?ex=6845ecf1&is=68449b71&hm=cf832101c724580a833805a7815fe31f8313682a921d3a422616443a59c8f186&=&format=webp&width=1174&height=1174';
    }
    if (style.id === 'coastal') {
      imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381001582124204112/Coastal_Bedroom_Style.jpg?ex=6845ed72&is=68449bf2&hm=8d574389c533e4a1b187207d8ab28bff2f02a18e0701ce86fb19e798c65d059b&=&format=webp&width=1220&height=1174';
    }
    if (style.id === 'contemporary') {
      imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381001835544055968/Contemporary_Bedroom_Style.png?ex=6845edaf&is=68449c2f&hm=05b34bb54e579489b37fc146dc63b4d2821ed57e9e1e7c47300852e26852c989&=&format=webp&quality=lossless&width=1174&height=1174';
    }
    if (style.id === 'country-farmhouse') {
 imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381002174473044159/Country_Farmhouse_Bedroom_Style.jpg?ex=6845ee00&is=68449c80&hm=7f998932055d7e0c93accd4a92d453fe8816583c0088853e21892d710ec86106&=&format=webp&width=1174&height=1174';
    }
    if (style.id === 'industrial') {
 imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1381002518670217236/Industrial_Bedroom_Style_.jpg?ex=6845ee52&is=68449cd2&hm=51cceac8c78dc54b3672017c12ab0438034cecf5c5be7366570fa47b2ce69be6&=&format=webp&width=1174&height=1174';
    }
    if (style.id === 'japandi') {
      imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1379597723782610954/Japandi_Bedroom_Style.jpg?ex=68456f41&is=68441dc1&hm=020bf36a8d3a036dd297f7f36a9e06d70b1f9445ead76741907151b4caf90f3a&=&format=webp&width=962&height=966';
    }
    if (style.id === 'mid-century') {
      imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1379597724592377906/Mid-Century_Bedroom.png?ex=68456f41&is=68441dc1&hm=6d5d45b953ab0cba89595300f749cc2c26775299a016808c0e56458fc4b2cd8b&=&format=webp&quality=lossless&width=966&height=966';
    }
    if (style.id === 'modern') {
      imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1379597725489827900/Modern_Bedroom_Style.png?ex=68456f41&is=68441dc1&hm=d7c30676337266af320a10c23f2843f912bb3c9fac19371743de28e46d0e1ca9&=&format=webp&quality=lossless&width=966&height=966';
    }
    if (style.id === 'traditional') {
      imageUrl = 'https://media.discordapp.net/attachments/1370568040256901200/1379597726240604312/Traditional_Bedroom_Style_.png?ex=68456f41&is=68441dc1&hm=0434d22b4f7bb852ec0ba428b918a600557d1181b5a92c683daeafd27d1ab61e&=&format=webp&quality=lossless&width=966&height=966';
    }

    return {
      ...style,
      name: `${style.name} Bedroom`,
 imageUrl: imageUrl,
    };
  });

  // Define page-specific bedroom wardrobe options directly with custom names
  const pageSpecificBedroomWardrobeOptions: BaseSelectionItem[] = baseBedroomWardrobeOptions
    .filter(option => [
      'bed-wardrobe-standard-one',
      'bed-wardrobe-standard-two',
      'bed-wardrobe-walkin',
 'bed-wardrobe-fitted',
      'bed-wardrobe-bifold',
 'bed-wardrobe-custom'
    ].includes(option.id)) // Filter to include only the desired options
    .map(option => {
      let newName = option.name; // Start with the original name
      // imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1377374523652964412/Fitted_Wardrobe_.png?ex=683ffbbc&is=683eaa3c&hm=667e2dd375fdd40be7a2c8346ae222145375a481f64d2cc2535c856e87336cf5&=&format=webp&quality=lossless&width=1310&height=1310', // Moved imageUrl if needed
      if (option.id === 'bed-wardrobe-bifold') newName = 'Bi-Fold Doors'
      if (option.id === 'bed-wardrobe-custom') newName = 'Custom Closet';
      if (option.id === 'bed-wardrobe-walkin') newName = 'Walk-In Closet';

      return { ...option, name: newName };
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // Keep sorting after mapping
  const pageSpecificBedroomLightingOptions: BaseSelectionItem[] = baseBedroomLightingOptions.map(option => {
    if (option.id === 'light-recessed-cylinder') {
       return { ...option, name: "Recessed or\nCylinder Lights" };
    }

    if (option.id === 'light-chandelier') {
      return { ...option, name: "Chandelier(s) or\nStatement Fixtures" };
    }
    return option;
  });

  const sections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Bedroom Style", options: pageSpecificBedroomStyleOptions, cols: 3 },
 { title: "Wall Finish", options: bedroomWallFinishOptions, cols: 3 },
    { title: "Flooring", options: bedroomFlooringOptions, cols: 3 },
    { title: "Lighting", options: pageSpecificBedroomLightingOptions, cols: 3},
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

          if (section.options === pageSpecificBedroomStyleOptions) {
            originalItem = baseOverallStyleOptions.find(opt => opt.id === displayOption.id);
          } else if (section.options === pageSpecificBedroomLightingOptions) {
            originalItem = baseBedroomLightingOptions.find(opt => opt.id === displayOption.id);
          } else if (section.options === pageSpecificBedroomWardrobeOptions) {
             originalItem = baseBedroomWardrobeOptions.find(opt => opt.id === displayOption.id);
          } else {
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
              Finish &amp; Proceed
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
