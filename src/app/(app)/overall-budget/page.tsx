
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useDesignProgress, type SelectedDataItem } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig } from "@/config/navigation";
import { ArrowRight } from "lucide-react";

export default function OverallBudgetPage() {
  const [budget, setBudget] = useState<number[]>([50000]); 
  const [hasSavedSinceLastChange, setHasSavedSinceLastChange] = useState(false);
  const { updateStageSelections, getStageSelections } = useDesignProgress();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const existingSelections = getStageSelections("overall-budget");
    if (existingSelections.length > 0 && typeof existingSelections[0].value === 'number') {
      setBudget([existingSelections[0].value]);
      // If data is loaded, consider it "saved" initially for this page load
      // setHasSavedSinceLastChange(true); // Or false if you want to force a save
    }
  }, [getStageSelections]);

  const handleBudgetChange = (value: number[]) => {
    setBudget(value);
    setHasSavedSinceLastChange(false);
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
    setHasSavedSinceLastChange(true);
    
    toast({
      title: "Overall Budget Saved",
      description: `Your estimated budget is $${budget[0].toLocaleString()}. Progress updated.`,
    });
  };

  const designStagesNavConfig = baseNavItemsConfig.filter(item => item.id !== 'dashboard' && item.id !== 'settings');
  const currentIndex = designStagesNavConfig.findIndex(item => item.href === pathname);
  const nextStage = currentIndex !== -1 && currentIndex < designStagesNavConfig.length - 1 ? designStagesNavConfig[currentIndex + 1] : null;

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
            <CardTitle>Use the slider to indicate your approximate budget.</CardTitle>
            {/* <CardDescription>Use the slider to indicate your approximate budget.</CardDescription> */}
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
                <span>$500,000</span>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row justify-end gap-2">
              <Button className="w-full sm:w-auto" onClick={handleSaveChanges}>
                Save Budget
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
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
