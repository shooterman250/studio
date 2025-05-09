
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useDesignProgress } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";

export default function OverallBudgetPage() {
  const [budget, setBudget] = useState<number[]>([50000]); // Default budget, e.g., 50,000
  const { updateProgress, getStageProgress } = useDesignProgress();
  const { toast } = useToast();

  // Initialize budget from context if already set
  useState(() => {
    const currentProgress = getStageProgress("overall-budget");
    // This is a placeholder for how budget might be stored/retrieved if not just progress.
    // For now, progress itself isn't the budget value, so we just set a default.
    // If budget value was stored in context, you'd retrieve it here.
  });

  const handleBudgetChange = (value: number[]) => {
    setBudget(value);
  };

  const handleSaveChanges = () => {
    // For simplicity, setting progress to 25% if a budget is actively set (even if it's the default)
    // In a real scenario, you might have different logic for "completion" of this step.
    const newProgress = budget[0] > 0 ? 25 : 0; 
    updateProgress("overall-budget", newProgress);
    
    console.log("Selected overall budget:", budget[0]);

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
                defaultValue={budget}
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

    