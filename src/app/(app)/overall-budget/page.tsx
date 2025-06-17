
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useDesignProgress, type SelectedDataItem } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig, type BaseNavItemConfig } from "@/config/navigation";
import { ArrowRight } from "lucide-react";

export default function OverallBudgetPage() {
  const [budget, setBudget] = useState<number[]>([50000]); 
  const [hasSavedSinceLastChange, setHasSavedSinceLastChange] = useState(false);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false); // New state for save button visual
  const { updateStageSelections, getStageSelections, getUserRoomSelections } = useDesignProgress();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const userRoomSelections = getUserRoomSelections();

  useEffect(() => {
    const existingSelections = getStageSelections("overall-budget");
    if (existingSelections.length > 0 && typeof existingSelections[0].value === 'number') {
      setBudget([existingSelections[0].value]);
      // Initial load: Save button is not active, Next button is not active for proceeding
      // User must interact or save explicitly for button states to change from default
    }
  }, [getStageSelections]);

  const handleBudgetChange = (value: number[]) => {
    setBudget(value);
    setHasSavedSinceLastChange(false); // Important: changes made, not yet saved for "Next" logic
    setIsSaveButtonActive(true);     // Light up "Save Budget" button
  };

  const handleSaveChanges = () => {
    const newProgress = budget[0] > 1000 ? 100 : 0; 
    
    const budgetItem: SelectedDataItem = {
      id: 'overall-budget-value', 
      name: 'Estimated Budget',
      value: budget[0],
      description: `Total estimated budget for the project.`,
      imageUrl: 'https://placehold.co/100x75.png', 
      dataAiHint: 'budget money' 
    };

    updateStageSelections("overall-budget", newProgress, [budgetItem]);
    setHasSavedSinceLastChange(true); // Changes are now saved, enable "Next" button
    setIsSaveButtonActive(false);    // Return "Save Budget" button to neutral
    
    toast({
      title: "Overall Budget Saved",
      description: `Your estimated budget is $${budget[0].toLocaleString()}. Progress updated.`,
    });
  };

  // Dynamically generate navigation based on room selections
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

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Overall Budget
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Estimate your total budget for the design project.
        </p>
        <p className="mt-1 max-w-2xl mx-auto text-sm opacity-70">
          (This does not include Interior Designer Fees)
        </p>
      </header>

      <section className="max-w-2xl mx-auto space-y-8">
        <Card className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
          <CardHeader>
            <CardTitle>Move Slider To Select Budget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <Label htmlFor="budget-slider" className="text-lg">
                Estimated Budget: ${budget[0].toLocaleString()}
              </Label>
              <Slider
                id="budget-slider"
                min={1000}
                max={500000}
                step={1000}
                value={budget} 
                onValueChange={handleBudgetChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$1,000</span>
                <span>$500,000+</span>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row justify-end gap-2">
              <Button 
                className="w-full sm:w-auto" 
                onClick={handleSaveChanges}
                variant={isSaveButtonActive ? "primary" : "default"}
              >
                Save Budget
              </Button>
              {nextStage && (
                <Button
                  onClick={() => router.push(nextStage.href)}
                  variant={hasSavedSinceLastChange ? "primary" : "outline"}
                  className="w-full sm:w-auto"
                  disabled={!hasSavedSinceLastChange}
                >
                  Next Section ({nextStage.label})
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
