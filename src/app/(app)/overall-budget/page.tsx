
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useDesignProgress, type SelectedDataItem } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";

export default function OverallBudgetPage() {
  const [budget, setBudget] = useState<number[]>([50000]); 
  const { updateStageSelections, getStageSelections } = useDesignProgress(); // Changed
  const { toast } = useToast();

  useEffect(() => {
    const existingSelections = getStageSelections("overall-budget");
    if (existingSelections.length > 0 && typeof existingSelections[0].value === 'number') {
      setBudget([existingSelections[0].value]);
    }
  }, [getStageSelections]);

  const handleBudgetChange = (value: number[]) => {
    setBudget(value);
  };

  const handleSaveChanges = () => {
    const newProgress = budget[0] > 1000 ? 100 : 0; // Mark as 100% complete if budget is set above minimum
    
    const budgetItem: SelectedDataItem = {
      id: 'overall-budget-value', // Unique ID for this specific selection type
      name: 'Estimated Budget',
      value: budget[0],
      description: `Total estimated budget for the project.`,
      imageUrl: 'https://picsum.photos/seed/budgetmoney/100/100', // Generic placeholder
      dataAiHint: 'budget money' 
    };

    updateStageSelections("overall-budget", newProgress, [budgetItem]);
    
    toast({
      title: "Overall Budget Saved",
      description: `Your estimated budget is $${budget[0].toLocaleString()}. Progress updated.`,
    });
  };

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Overall Budget
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Estimate your total budget for the design project.
        </p>
      </header>

      <section className="max-w-2xl mx-auto space-y-8">
        <Card className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
          <CardHeader>
            <CardTitle>Set Your Budget Range</CardTitle>
            <CardDescription>Use the slider to indicate your approximate budget.</CardDescription>
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
                value={budget} // Changed from defaultValue to value for controlled component
                onValueChange={handleBudgetChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$1,000</span>
                <span>$500,000</span>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button className="w-full md:w-auto" onClick={handleSaveChanges}>
                Save Budget
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
