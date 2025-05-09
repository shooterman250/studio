"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { designStyles } from "@/types";

export default function OverallStylePage() {
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set());

  const handleStyleChange = (styleId: string) => {
    setSelectedStyles(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(styleId)) {
        newSelected.delete(styleId);
      } else {
        newSelected.add(styleId);
      }
      return newSelected;
    });
  };

  const handleSaveChanges = () => {
    // Placeholder for save logic
    console.log("Selected styles:", Array.from(selectedStyles));
    // Here you would typically send this data to a backend or update a global state
  };

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Overall Style
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Choose one or more design styles that best represent your vision for the room.
        </p>
      </header>

      <section className="max-w-2xl mx-auto space-y-8">
        <Card className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
          <CardHeader>
            <CardTitle>Select Your Design Styles</CardTitle>
            <CardDescription>You can pick multiple styles that appeal to you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {designStyles.map((style) => (
                <div key={style.id} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id={style.id}
                    checked={selectedStyles.has(style.id)}
                    onCheckedChange={() => handleStyleChange(style.id)}
                    aria-labelledby={`${style.id}-label`}
                  />
                  <Label 
                    htmlFor={style.id} 
                    id={`${style.id}-label`} 
                    className="font-normal text-base cursor-pointer flex-grow"
                  >
                    {style.name}
                  </Label>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button className="w-full md:w-auto" onClick={handleSaveChanges}>
                Save Styles
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
