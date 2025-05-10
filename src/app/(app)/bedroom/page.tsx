
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    generalWallFinishOptions as bedroomWallFinishOptions,
    generalFlooringOptions as bedroomFlooringOptions,
    generalLightingOptions as bedroomLightingOptions,
    bedroomWardrobeOptions,
    type BaseSelectionItem 
} from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress, type SelectedDataItem } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig } from "@/config/navigation";
import { ArrowRight } from "lucide-react";

export default function BedroomPage() {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [hasSavedSinceLastChange, setHasSavedSinceLastChange] = useState(false);
  const { updateStageSelections } = useDesignProgress();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

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
  
  const sections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Wall Finish", description: "Choose finishes for your bedroom walls.", options: bedroomWallFinishOptions, cols: 3 },
    { title: "Flooring", description: "Select flooring for the bedroom.", options: bedroomFlooringOptions, cols: 3 },
    { title: "Lighting", description: "Select lighting fixtures.", options: bedroomLightingOptions, cols: 3 },
    { title: "Wardrobe/Closet", description: "Select your preferred wardrobe or closet type(s).", options: bedroomWardrobeOptions, cols: 2 },
  ];

  const handleSaveChanges = () => {
    const totalOptionsOnPage = sections.reduce((sum, section) => sum + section.options.length, 0);
    const newProgress = selectedOptions.size > 0 ? Math.min(100, Math.round((selectedOptions.size / totalOptionsOnPage) * 100)) : 0;
    
    const allSelectedItems: SelectedDataItem[] = [];
    sections.forEach(section => {
      section.options.forEach(option => {
        if (selectedOptions.has(option.id)) {
          allSelectedItems.push({
            id: option.id,
            name: option.name,
            imageUrl: option.imageUrl,
            description: option.description,
            dataAiHint: option.dataAiHint || option.name.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').slice(0,2).join(' ')
          });
        }
      });
    });

    updateStageSelections("bedroom", newProgress, allSelectedItems); 
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
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Bedroom(s) Customization
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Tailor your personal sanctuary by selecting options for each category.
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
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${section.cols || 3} gap-6`}>
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
