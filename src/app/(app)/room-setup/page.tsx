
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roomTypes, designStyles } from "@/types";

export default function RoomSetupPage() {
  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Room Setup
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Define the basics of your room to get started with your design.
        </p>
      </header>

      <section className="max-w-3xl mx-auto space-y-8">
        <Card className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
          <CardHeader>
            <CardTitle>Room Details</CardTitle>
            <CardDescription>Specify the type, style, and dimensions of your room.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <Select>
                <SelectTrigger id="roomType" className="w-full">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="designStyle">Design Style</Label>
              <Select>
                <SelectTrigger id="designStyle" className="w-full">
                  <SelectValue placeholder="Select design style" />
                </SelectTrigger>
                <SelectContent>
                  {designStyles.map((style) => (
                    <SelectItem key={style.id} value={style.id}>
                      {style.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomLength">Length (meters)</Label>
                <Input id="roomLength" type="number" placeholder="e.g., 5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomWidth">Width (meters)</Label>
                <Input id="roomWidth" type="number" placeholder="e.g., 4" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomHeight">Height (meters)</Label>
                <Input id="roomHeight" type="number" placeholder="e.g., 2.7" />
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button className="w-full md:w-auto">Save Room Details</Button>
            </div>
          </CardContent>
        </Card>

         <Card className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
          <CardHeader>
            <CardTitle>AI-Powered Layout Suggestions (Coming Soon)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get intelligent layout suggestions based on your room dimensions and selected style.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
