
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { useDesignProgress, type ClientInfoData, type CallPreferences } from "@/contexts/DesignProgressContext";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

const clientInfoFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ClientInfoFormValues = z.infer<typeof clientInfoFormSchema>;

const availableDaysOptions = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
];

const availableTimesOptions = [
  { id: "morning", label: "Morning (9am-12pm)" },
  { id: "afternoon", label: "Afternoon (12pm-3pm)" },
  { id: "lateAfternoon", label: "Late Afternoon (3pm-5pm)" },
];

export default function ClientInfoPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { updateClientInfo, getClientInfo } = useDesignProgress();

  const [isCallPrefDialogOpen, setIsCallPrefDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());

  const form = useForm<ClientInfoFormValues>({
    resolver: zodResolver(clientInfoFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  useEffect(() => {
    const existingInfo = getClientInfo();
    if (existingInfo) {
      form.reset({ fullName: existingInfo.fullName, email: existingInfo.email });
      if (existingInfo.callPreferences) {
        setPhoneNumber(existingInfo.callPreferences.phoneNumber);
        setSelectedDays(new Set(existingInfo.callPreferences.availableDays));
        setSelectedTimes(new Set(existingInfo.callPreferences.availableTimes));
      }
    }
  }, [getClientInfo, form]);

  function onSubmit(data: ClientInfoFormValues) {
    const completeClientInfo: ClientInfoData = {
      ...data,
    };
    if (phoneNumber || selectedDays.size > 0 || selectedTimes.size > 0) {
      completeClientInfo.callPreferences = {
        phoneNumber,
        availableDays: Array.from(selectedDays),
        availableTimes: Array.from(selectedTimes),
      };
    }
    
    updateClientInfo(completeClientInfo);
    
    toast({
      title: "Information Saved",
      description: "Your information has been recorded.",
    });
    router.push("/designer");
  }

  const handleDayChange = (dayId: string) => {
    setSelectedDays(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(dayId)) newSelected.delete(dayId);
      else newSelected.add(dayId);
      return newSelected;
    });
  };

  const handleTimeChange = (timeId: string) => {
    setSelectedTimes(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(timeId)) newSelected.delete(timeId);
      else newSelected.add(timeId);
      return newSelected;
    });
  };

  const handleConfirmCallPreferences = () => {
    // Call preferences are already updated in local state (phoneNumber, selectedDays, selectedTimes)
    // These will be picked up by the main onSubmit function.
    console.log("Call preferences confirmed locally:", { phoneNumber, days: Array.from(selectedDays), times: Array.from(selectedTimes) });
    setIsCallPrefDialogOpen(false);
    toast({
        title: "Call Preferences Noted",
        description: "Your call preferences have been noted. Please save the form to confirm.",
      });
  };

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-lg border border-card-foreground/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl text-center">Client Information</CardTitle>
          <CardDescription className="text-center">
            Please tell us a bit about yourself. You can update this information anytime.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., jane.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4">
                <Dialog open={isCallPrefDialogOpen} onOpenChange={setIsCallPrefDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Phone className="mr-2 h-4 w-4" />
                      Prefer a Call?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Call Preferences</DialogTitle>
                      <FormDescription>
                        Let us know when is a good time to call you.
                      </FormDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone-number" className="text-right col-span-1">
                          Phone
                        </Label>
                        <Input
                          id="phone-number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Your phone number"
                          className="col-span-3"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Available Days</Label>
                        <div className="flex flex-wrap gap-2">
                          {availableDaysOptions.map((day) => (
                            <div key={day.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`day-${day.id}`}
                                checked={selectedDays.has(day.id)}
                                onCheckedChange={() => handleDayChange(day.id)}
                              />
                              <Label htmlFor={`day-${day.id}`} className="font-normal text-sm">
                                {day.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Available Times</Label>
                        <div className="flex flex-col space-y-2">
                          {availableTimesOptions.map((time) => (
                            <div key={time.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`time-${time.id}`}
                                checked={selectedTimes.has(time.id)}
                                onCheckedChange={() => handleTimeChange(time.id)}
                              />
                              <Label htmlFor={`time-${time.id}`} className="font-normal text-sm">
                                {time.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                         <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="button" onClick={handleConfirmCallPreferences}>Confirm Call Preferences</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button type="submit" className="w-full sm:w-auto">
                  Save & Proceed to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
