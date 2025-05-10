
"use client";

import type { DesignStageKey, SelectedDataItem } from "@/contexts/DesignProgressContext";
import { useDesignProgress } from "@/contexts/DesignProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileDown, PencilLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";

const stageDisplayNames: Record<DesignStageKey, string> = {
  "overall-budget": "Overall Budget",
  "overall-style": "Overall Style & Key Elements",
  "kitchen": "Kitchen",
  "utility-laundry-room": "Utility/Laundry Room",
  "living-room": "Living Room",
  "bedroom": "Bedroom(s)",
  "bathroom": "Bathroom(s)",
  "home-office": "Home Office",
  "hallways": "Hallway(s)",
  "decor": "Decor & Lighting", 
  "finishes": "Colors & Finishes", 
  "summary": "Summary", 
};

const SelectedItemDisplay = ({ item }: { item: SelectedDataItem }) => (
  <div className="flex items-start gap-3 p-3 border-b border-border/30 last:border-b-0 hover:bg-muted/20 transition-colors">
    {item.imageUrl && (
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={60} 
        height={45} 
        className="rounded-md object-cover aspect-[4/3] shadow-sm"
        data-ai-hint={item.dataAiHint || item.name.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').slice(0,2).join(' ')}
      />
    )}
    <div className="flex-1">
      <p className="font-semibold text-sm text-card-foreground">{item.name}</p>
      {item.description && !item.value && <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>}
      {item.value !== undefined && (
         <p className="text-sm text-primary font-medium">
           {typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : String(item.value)}
         </p>
      )}
    </div>
  </div>
);

const StageSelectionsCard = ({ stageKey, items }: { stageKey: DesignStageKey; items: SelectedDataItem[] }) => {
  if (!items || items.length === 0) return null;

  const displayName = stageDisplayNames[stageKey] || stageKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <Card className="bg-card/70 backdrop-blur-lg border border-card-foreground/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-card-foreground/5">
        <CardTitle className="text-xl">{displayName}</CardTitle>
        <CardDescription>Your selections for this stage.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {items.length > 3 ? (
           <ScrollArea className="h-[210px]"> 
            <div className="divide-y divide-border/30">
              {items.map((item) => (
                <SelectedItemDisplay key={item.id || item.name} item={item} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="divide-y divide-border/30">
            {items.map((item) => (
              <SelectedItemDisplay key={item.id || item.name} item={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};


export default function DesignerPage() {
  const { getAllSelections } = useDesignProgress();
  const { toast } = useToast();
  const router = useRouter(); // Initialize useRouter
  const allSelections = getAllSelections();

  const activeStages = Object.entries(allSelections)
    .filter(([stageKey, items]) => stageKey !== "summary" && items.length > 0);

  const handleExportPdf = () => {
    // Placeholder for PDF export functionality
    toast({
      title: "Export to PDF",
      description: "PDF export functionality is not yet implemented.",
    });
    console.log("Exporting selections to PDF:", allSelections);
  };
    
  return (
    <div 
      className="relative min-h-full p-4 md:p-8 bg-background text-foreground"
    >
      <div className="relative z-[1] isolate">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Design Dashboard
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg opacity-80 sm:text-xl">
            Welcome to your design overview. Here you can see all the choices you've made across different stages of your project.
            Use the sidebar to navigate to specific categories and continue customizing your space.
          </p>
          <div className="mt-6 flex justify-center">
            <Button onClick={handleExportPdf}>
              <FileDown className="mr-2 h-4 w-4" />
              Export to PDF
            </Button>
          </div>
        </header>

        <section className="max-w-7xl mx-auto space-y-12">
          {activeStages.length > 0 ? (
            <>
              <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">
                Your Design Selections Overview
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {activeStages.map(([stageKey, items]) => (
                  <StageSelectionsCard key={stageKey} stageKey={stageKey as DesignStageKey} items={items} />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-12 p-10 bg-card/60 backdrop-blur-lg border border-card-foreground/10 rounded-lg shadow-lg text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-16 w-16 text-muted-foreground opacity-50 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.037-.502.068-.75.098m.75-.098a2.25 2.25 0 00-2.25 2.25c0 1.13.812 2.066 1.903 2.195M16.5 3.104V5.75M16.5 3.104c-.251.037-.502.068-.75.098m.75-.098a2.25 2.25 0 012.25 2.25c0 1.13-.812 2.066-1.903 2.195m0-2.195C14.812 5.134 12.75 4.5 12 4.5c-2.186 0-4.25.63-6.097.934M15 14.5h-3V10.75M15 14.5A2.25 2.25 0 0112.75 12H12m3 2.5A2.25 2.25 0 0012.75 12H12m0 0A2.25 2.25 0 009.75 14.5M9.75 14.5h-3V10.75"
                />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75l3.75-1.563M12 21.75l-3.75-1.563M12 21.75V19.5M9 19.5V10.5M15 19.5V10.5M3 10.5c0 .995.182 1.94.514 2.826M21 10.5c0 .995-.182 1.94-.514 2.826" />
              </svg>
              <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Start Designing Your Space!</h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                It looks like you haven't made any selections yet. 
                Navigate through the sidebar or click the button below to start customizing different aspects of your project.
              </p>
              <Button
                onClick={() => router.push('/overall-budget')}
                size="lg"
              >
                <PencilLine className="mr-2 h-5 w-5" />
                Start Designing
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

