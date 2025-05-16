
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { baseNavItemsConfig } from "@/config/navigation";
import { ArrowRight } from "lucide-react";
import { useDesignProgress, type ClientInfoData } from "@/contexts/DesignProgressContext";
import { useEffect } from "react";

const clientInfoFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  projectName: z.string().min(3, { message: "Project name must be at least 3 characters." }),
  projectVision: z.string().min(10, { message: "Please describe your vision in at least 10 characters." }),
  mustHaves: z.string().optional(),
});

type ClientInfoFormValues = z.infer<typeof clientInfoFormSchema>;

export default function ClientInfoPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { updateClientInfo, getClientInfo } = useDesignProgress();

  const form = useForm<ClientInfoFormValues>({
    resolver: zodResolver(clientInfoFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      projectName: "",
      projectVision: "",
      mustHaves: "",
    },
  });

  useEffect(() => {
    const existingInfo = getClientInfo();
    if (existingInfo) {
      form.reset(existingInfo);
    }
  }, [getClientInfo, form]);

  function onSubmit(data: ClientInfoFormValues) {
    console.log("Client Info Submitted/Updated:", data);
    updateClientInfo(data as ClientInfoData); // Save/Update data in context
    
    toast({
      title: "Information Saved",
      description: "Your information has been recorded. Let's continue designing!",
    });

    // Navigate to the first actual design stage
    const firstDesignStage = baseNavItemsConfig.find(item => item.id !== 'dashboard' && item.id !== 'settings' && item.id !== 'overall-budget' && item.href !== '/client-info');
    const overallBudgetStage = baseNavItemsConfig.find(item => item.id === 'overall-budget');

    if (firstDesignStage) {
      router.push(firstDesignStage.href);
    } else if (overallBudgetStage) {
      router.push(overallBudgetStage.href); // Fallback to overall budget if other design stages are removed/changed
    }
    else {
      router.push("/designer"); // Fallback to dashboard if no design stages are configured
    }
  }

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-lg border border-card-foreground/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl text-center">Client Information</CardTitle>
          <CardDescription className="text-center">
            Please tell us a bit about yourself and your project. You can update this information anytime.
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
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name / Brief</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Living Room Makeover, New Kitchen Design" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectVision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your vision for this project?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your dream space, desired style, mood, and functionality..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mustHaves"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any specific requirements or must-haves? (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Must include a home office space, wheelchair accessible, specific appliance brands..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end pt-2">
                <Button type="submit" className="w-full sm:w-auto">
                  Save &amp; Proceed <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
