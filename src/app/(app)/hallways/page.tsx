
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    generalWallFinishOptions as hallwayWallFinishOptions,
    generalFlooringOptions as hallwayFlooringOptions, 
    generalLightingOptions as hallwayLightingOptions,
    hallwayStorageOptions,
    type BaseSelectionItem
} from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress, type SelectedDataItem, DesignStageKey } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig } from "@/config/navigation";
import { ArrowRight, Home } from "lucide-react";

const PAGE_STAGE_KEY: DesignStageKey = "hallways";

export default function HallwaysPage() {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [hasSavedSinceLastChange, setHasSavedSinceLastChange] = useState(false);
  const { updateStageSelections, getStageSelections, getClientInfo } = useDesignProgress();
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
  
  const hallwaySpecificFlooringOptions = hallwayFlooringOptions.filter(opt => opt.id !== 'floor-carpet');

  const sections: Array<{ title: string; description?: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Wall Finish", description: "Choose finishes for your hallway walls.", options: hallwayWallFinishOptions, cols: 3 },
    { title: "Flooring", description: "Select durable and stylish flooring.", options: hallwaySpecificFlooringOptions, cols: 3 },
    { title: "Lighting", description: "Illuminate your hallways effectively.", options: hallwayLightingOptions, cols: 3 },
    { title: "Storage", description: "Consider storage solutions for hallways.", options: hallwayStorageOptions, cols: 3 },
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
      section.options.forEach(option => {
        if (selectedOptions.has(option.id)) {
          allSelectedItems.push({
            id: option.id,
            name: option.name,
            imageUrl: option.imageUrl,
            description: option.description,
            dataAiHint: option.dataAiHint || option.name.toLowerCase().replace(/[^a-z0-9\\s]/gi, '').split(' ').slice(0,2).join(' ')
          });
        }
      });
    });
    
    updateStageSelections(PAGE_STAGE_KEY, newProgress, allSelectedItems);
    setHasSavedSinceLastChange(true);
    
    toast({
      title: "Hallway Choices Saved",
      description: `You've selected ${allSelectedItems.length} item(s). Progress updated to ${newProgress}%.`,
    });
  };

  const handleFinishAndProceed = () => {
    handleSaveChanges(); // Save current choices first
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

  const designStagesNavConfig = baseNavItemsConfig.filter(item => item.id !== 'dashboard' && item.id !== 'settings');
  const currentIndex = designStagesNavConfig.findIndex(item => item.href === pathname);
  // Check if there's a next *design* stage. Client-info is handled by the "Finish" button.
  const nextDesignStage = currentIndex !== -1 && currentIndex < designStagesNavConfig.length - 1 && 
                         designStagesNavConfig[currentIndex + 1].id !== 'dashboard' && 
                         designStagesNavConfig[currentIndex + 1].id !== 'settings' 
                         ? designStagesNavConfig[currentIndex + 1] : null;


  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Hallway(s) Design
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
            Save Hallway Choices ({selectedOptions.size})
          </Button>
          {/* If there's another design stage after Hallways, show "Next Section" */}
          {nextDesignStage ? (
            <Button
              onClick={() => router.push(nextDesignStage.href)}
              variant="outline"
              className="w-full sm:w-auto"
              disabled={!hasSavedSinceLastChange}
            >
              Next Section ({nextDesignStage.label})
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            // If Hallways is the last design stage, show "Finish & Proceed"
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

