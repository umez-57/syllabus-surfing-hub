
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, X, MessageSquare, User, Mail, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const feedbackFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  subject: z.string().min(3, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Please provide more detailed feedback (minimum 10 characters)" }),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackForm({ isOpen, onClose }: FeedbackFormProps) {
  const { toast } = useToast();
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    console.log("Feedback data:", data);
    
    try {
      // Prepare template parameters for Email.js - matching your template variables
      const templateParams = {
        from_name: data.name,        // Changed from 'name' to 'from_name'
        from_email: data.email,      // Changed from 'email' to 'from_email'
        subject: data.subject,
        message: data.message,
        current_date: new Date().toLocaleString(), // Changed from 'timestamp' to 'current_date'
      };

      console.log("Sending email with template params:", templateParams);

      // Send email using Email.js
      const result = await emailjs.send(
        'service_5iuknwj', // Your service ID
        'template_98i02oa', // Your template ID
        templateParams,
        'm1CfeebVF-dcyUfvZ' // Your public key
      );

      console.log("Email sent successfully:", result);
      
      toast({
        title: "✨ Feedback submitted successfully!",
        description: "Thank you for your valuable feedback! We'll get back to you soon.",
      });
      
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "❌ Submission failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden border-0 bg-transparent">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
            >
              {/* Header with gradient background */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20" />
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
                
                <DialogHeader className="relative p-8 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <DialogTitle className="text-2xl font-bold text-white">
                          Share Your Feedback
                        </DialogTitle>
                        <DialogDescription className="text-white/70 mt-1">
                          Help us improve VIT AP Study Hub with your insights
                        </DialogDescription>
                      </div>
                    </div>
                    
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </DialogClose>
                  </div>
                </DialogHeader>
              </div>

              {/* Form Content */}
              <div className="p-8 pt-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/90 font-medium flex items-center gap-2">
                              <User className="w-4 h-4 text-indigo-400" />
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field}
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl h-12"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/90 font-medium flex items-center gap-2">
                              <Mail className="w-4 h-4 text-purple-400" />
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="you@example.com" 
                                type="email"
                                {...field}
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl h-12"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90 font-medium flex items-center gap-2">
                            <FileText className="w-4 h-4 text-cyan-400" />
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What's this feedback about?" 
                              {...field}
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl h-12"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90 font-medium flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-green-400" />
                            Your Message
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Share your thoughts, suggestions, or report issues..." 
                              className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <DialogClose asChild>
                        <Button 
                          variant="ghost" 
                          type="button"
                          className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl px-6"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      
                      <Button 
                        type="submit" 
                        disabled={form.formState.isSubmitting}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-xl px-8 h-12 shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:shadow-indigo-500/40 disabled:opacity-50"
                      >
                        {form.formState.isSubmitting ? (
                          <motion.div 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                            <span>Sending...</span>
                          </motion.div>
                        ) : (
                          <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Send className="w-4 h-4" />
                            <span>Submit Feedback</span>
                          </motion.div>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
