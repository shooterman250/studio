
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    overallStyleOptions as baseBathroomStyleOptions, 
    bathroomMasterBathTubOptions,
    bathroomMasterShowerOptions,
    bathroomMasterSinkOptions as baseBathroomMasterSinkOptions, 
    bathroomToiletOptions, 
    bathroomHardwareFinishOptions as baseBathroomHardwareFinishOptions, 
    bathroomStorageOptions as baseBathroomStorageOptions, 
    generalLightingOptions as baseGeneralLightingOptions, 
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
const newChandelierImageUrl = "https://media.discordapp.net/attachments/1374799696127721638/1375962940846641262/Bathroom_Chandelier_.png?ex=683398d9&is=68324759&hm=de9e16a0a9447f3f1fbf45a8263d4319a8ae22e038a8cd4757be9ccfe7fb1e8f&=&format=webp&quality=lossless&width=1206&height=1206";
const newPendantImageUrl = "https://media.discordapp.net/attachments/1374799696127721638/1375960954302496799/Bathroom_Pendant_Light.png?ex=683396ff&is=6832457f&hm=b366df8d7df3b6919381049a029e1b08d1b81aa8281dd9908b7fd38b85a8bf9b&=&format=webp&quality=lossless&width=998&height=998";
const newWallSconceImageUrl = "https://media.discordapp.net/attachments/1374799696127721638/1375960954688503909/Bathroom_Wall_Sconce_Light_.png?ex=683396ff&is=6832457f&hm=50647836e4989e0dd1c51ead974f585aa673a9d8dfd137602586a589c2c51617&=&format=webp&quality=lossless&width=998&height=998";

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

  const pageSpecificDisplayBathroomStyleOptions: BaseSelectionItem[] = baseBathroomStyleOptions.map(style => {
    let imageUrl = style.imageUrl;
    let name = `${style.name} Bathroom`;

    if (style.id === 'biophilic') {
      imageUrl = 'https://media.discordapp.net/attachments/1374799696127721638/1375174283067658260/Biophilic_Bathroom.png?ex=6830ba5a&is=682f68da&hm=8738860856a01e830d93ee034cfef2f989578500231f0c8944bb27a0372e42a8&=&format=webp&quality=lossless&width=998&height=998';
    }
    if (style.id === 'bohemian') {
      imageUrl = 'https://media.discordapp.net/attachments/1374799696127721638/1375174288683962480/Bohemian_Bathroom.png?ex=6830ba5b&is=682f68db&hm=1485af386e07c083719d562827ac835211280bd764d2affb9866dee280b76fca&=&format=webp&quality=lossless&width=998&height=998';
    }
    if (style.id === 'coastal') {
      imageUrl = 'https://media.discordapp.net/attachments/1374799696127721638/1375174289485201489/Coastal_Bathroom.png?ex=6830ba5c&is=682f68dc&hm=c8ef4f08ce412519260a63049c028d9c66b83e744e61124dbcc72b95ce7c1600&=&format=webp&quality=lossless&width=998&height=998';
    }
    if (style.id === 'contemporary') {
      imageUrl = 'https://media.discordapp.net/attachments/1374799696127721638/1375174290147774504/Contemporary_Bathroom.png?ex=6830ba5c&is=682f68dc&hm=842f663e5f1b0692598b64bce8da742e0f2d37b70339cbe9334358273fa7794f&=&format=webp&quality=lossless&width=998&height=998';
    }
    if (style.id === 'country-farmhouse') {
      imageUrl = 'https://media.discordapp.net/attachments/1374799696127721638/1375174290797887669/Country___Farmhouse_Bathroom.png?ex=6830ba5c&is=682f68dc&hm=8db1f35156e4688bd46f3924caadf1e37b5fa1eb711c25da3d0b42499735996d&=&format=webp&quality=lossless&width=998&height=998';
    }
    if (style.id === 'industrial') {
      imageUrl = 'https://media.discordapp.net/attachments/1374799696127721638/1375174291552866364/Industrial_Bathroom.png?ex=6830ba5c&is=682f68dc&hm=f521ace10c93514ff865d097335b5925822eeedf35c42b4df39f8f76f7a7295c&=&format=webp&quality=lossless&width=998&height=998';
    }
    if (style.id === 'japandi') {
      imageUrl = 'https://media.discordapp.net/attachments/1374799696127721638/1375174292265894008/Japandi_Bathroom.png?ex=6830ba5c&is=682f68dc&hm=3366ac8995745f4a87966ff3bff9107591a5d80c3ab8c284554760ccf0d71cb9&=&format=webp&quality=lossless&width=998&height=998';
    }
    if (style.id === 'mid-century') {
      imageUrl = 'https://media.discordapp.net/attachments/1374799696127721638/1375174292979060756/Mid-Century_Bathroom.png?ex=6830ba5c&is=682f68dc&hm=d8efca3b34d67e3ef6c50a9c72d4e489ea354c425b60e8e6f831c0b6d210538c&=&format=webp&quality=lossless&width=998&height=998';
    }
    if (style.id === 'modern') {
      imageUrl = 'https://media.discordapp.net/attachments/1374799696127721638/1375174293629042970/Modern_Bathroom.png?ex=6830ba5d&is=682f68dd&hm=961c2903be6bd92605598467e4ef93283ae1f87d3154840be15f7c6eb5930662&=&format=webp&quality=lossless&width=998&height=998';
    }
    if (style.id === 'traditional') {
      imageUrl = 'https://media.discordapp.net/attachments/1374799696127721638/1375174294383886498/Traditional_Bathroom.png?ex=6830ba5d&is=682f68dd&hm=e877b858412bfec0b4eadeef9c206e23e6ee090567f5857d9f075539568a38e8&=&format=webp&quality=lossless&width=998&height=998';
    }
    return {
     ...style,
      name: name,
      imageUrl: imageUrl,
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
    if (sink.id === 'bh-sink-vessel') {
      imageUrl = "https://media.discordapp.net/attachments/1374799696127721638/1375169926527975434/Bathroom_Vessel_Sink.png?ex=6830b64b&is=682f64cb&hm=1214b2ee0dade3fc7266cc4d46528f46deff43697c36f30ae531a96ff361fec1&=&format=webp&quality=lossless&width=998&height=998";
    }
    if (sink.id === 'bh-sink-wallmount') {
      imageUrl = "https://media.discordapp.net/attachments/1374799696127721638/1375169926934958090/Bathroom_Wall-Mounted_Sink.png?ex=6830b64c&is=682f64cc&hm=5c7250cd7582bac748cba56f1bb8b387fc7d3c522ccec7ac91514e0bb9c944f5&=&format=webp&quality=lossless&width=998&height=998";
    }
    return {
      ...sink,
      name: `${originalNamePart}\nBathroom Sink`,
      imageUrl: imageUrl
    };
  });
  
  const pageSpecificDisplayMasterLightingOptions: BaseSelectionItem[] = baseGeneralLightingOptions
    .filter(option => option.id !== 'light-recessed-cylinder' && option.id !== 'light-concealed' && option.id !== 'light-niche') 
    .map(option => {
      let imageUrl = option.imageUrl;
      let name = option.name;
      if (option.id === 'light-chandelier') {
        name = "Chandelier(s) or\nStatement Fixtures";
        imageUrl = newChandelierImageUrl;
      }
      if (option.id === 'light-pendant') {
        imageUrl = newPendantImageUrl;
      }
      if (option.id === 'light-wallsconce') {
        imageUrl = newWallSconceImageUrl;
      }
      return { ...option, name, imageUrl };
    });

  const filteredHalfBathLightingOptions: BaseSelectionItem[] = baseGeneralLightingOptions
    .filter(option => option.id !== 'light-recessed-cylinder' && option.id !== 'light-concealed' && option.id !== 'light-niche') 
    .map(option => {
      let imageUrl = option.imageUrl;
      let name = option.name;
      if (option.id === 'light-chandelier') {
        name = "Chandelier(s) or\nStatement Fixtures";
        imageUrl = newChandelierImageUrl;
      }
      if (option.id === 'light-pendant') {
        imageUrl = newPendantImageUrl;
      }
      if (option.id === 'light-wallsconce') {
        imageUrl = newWallSconceImageUrl;
      }
      return { ...option, name, imageUrl };
    });
  
  const pageSpecificBathroomStorageOptions: BaseSelectionItem[] = baseBathroomStorageOptions.filter(
    option => option.id !== 'bath-store-customvanity'
  );

  const masterBathSubSections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Master Bath: Style", options: pageSpecificDisplayBathroomStyleOptions, cols: 3, description: "Define the overall style for your master bathroom." },
    { title: "Master Bath: Bath Tub", options: bathroomMasterBathTubOptions, cols: 3 },
    { title: "Master Bath: Shower", options: bathroomMasterShowerOptions, cols: 3 },
    { title: "Master Bathroom: Sink (Double/Single)", options: pageSpecificDisplayMasterSinkOptions, cols: 3, description: "Choose Sink Style. Double or Single." },
    { title: "Master Bath: Toilet", options: bathroomToiletOptions, cols: 3 },
    { title: "Master Bath: Hardware Finish", options: pageSpecificDisplayHardwareFinishOptions, cols: 3, description: "Pick finishes for faucets, handles, etc." },
    { title: "Master Bath: Storage", options: pageSpecificBathroomStorageOptions, cols: 3 },
    { title: "Master Bath: Lighting", options: pageSpecificDisplayMasterLightingOptions, cols: 3 }, 
  ];

  const halfBathSubSections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Half-Bath: Sink", options: pageSpecificDisplayBathroomHalfSinkOptions, cols: 3 },
    { title: "Half-Bath: Toilet", options: bathroomToiletOptions, cols: 3 }, 
    { title: "Half-Bath: Hardware Finish", options: pageSpecificDisplayHardwareFinishOptions, cols: 3, description: "Select hardware finishes." }, 
    { title: "Half-Bath: Storage", options: pageSpecificBathroomStorageOptions, cols: 3, description: "Consider storage options." }, 
    { title: "Half-Bath: Lighting", options: filteredHalfBathLightingOptions }, 
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

          // Find original item to save its canonical data (name, imageUrl)
          if (pageSpecificDisplayBathroomStyleOptions.some(opt => opt.id === displayOption.id)) {
            originalItem = baseBathroomStyleOptions.find(opt => opt.id === displayOption.id);
          } else if (pageSpecificDisplayMasterSinkOptions.some(opt => opt.id === displayOption.id)) {
            originalItem = baseBathroomMasterSinkOptions.find(opt => opt.id === displayOption.id);
          } else if (pageSpecificDisplayHardwareFinishOptions.some(opt => opt.id === displayOption.id)) {
            originalItem = baseBathroomHardwareFinishOptions.find(opt => opt.id === displayOption.id);
          } else if (pageSpecificDisplayBathroomHalfSinkOptions.some(opt => opt.id === displayOption.id)) {
            originalItem = baseBathroomHalfSinkOptions.find(opt => opt.id === displayOption.id);
          } else if (pageSpecificDisplayMasterLightingOptions.some(opt => opt.id === displayOption.id) || filteredHalfBathLightingOptions.some(opt => opt.id === displayOption.id)) { 
            originalItem = baseGeneralLightingOptions.find(opt => opt.id === displayOption.id);
          } else if (pageSpecificBathroomStorageOptions.some(opt => opt.id === displayOption.id)){
            originalItem = baseBathroomStorageOptions.find(opt => opt.id === displayOption.id);
          }
          else { 
            // For sections that use base options directly
            const baseArray = 
              section.options === bathroomMasterBathTubOptions ? bathroomMasterBathTubOptions :
              section.options === bathroomMasterShowerOptions ? bathroomMasterShowerOptions :
              section.options === bathroomToiletOptions ? bathroomToiletOptions :
              null; 
            
            if (baseArray) {
              originalItem = baseArray.find(opt => opt.id === displayOption.id);
            } else {
                // Fallback if the option wasn't from a specifically handled array (should ideally not happen)
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
