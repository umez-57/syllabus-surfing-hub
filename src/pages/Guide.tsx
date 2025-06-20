import React from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function Guide() {
  return (
    <div className="min-h-screen monster-dark text-monster-green overflow-hidden relative">
      {/* Geometric shapes for Neo-Brutalism background */}
      <div className="absolute top-20 left-20 neo-triangle floating-shape opacity-20" />
      <div className="absolute top-40 right-32 neo-circle floating-shape opacity-20" />
      <div className="absolute bottom-32 left-40 neo-square floating-shape opacity-20" />
      <div className="absolute bottom-20 right-20 neo-triangle floating-shape opacity-20" />

      <Navbar />

      <main className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Main Title */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 mb-4 neo-border monster-gray text-monster-green font-mono font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-monster-accent" />
              <span>Step-by-Step Guide</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold neo-heading neo-text-shadow"
            >
              User Guide
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-monster-silver max-w-3xl mx-auto font-mono"
            >
              Get Your Class Schedule on 
              <span className="text-monster-accent font-semibold"> Google Calendar</span>
            </motion.p>

            {/* Decorative line */}
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              className="h-1 max-w-md mx-auto monster-green neo-border-thin mt-8"
            />
          </motion.div>

          {/* Steps Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid gap-8 mt-16"
          >
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.3 } }}
              className="group relative perspective-1000"
            >
              <Card className="neo-card monster-white text-monster-black hover:translate-x-2 hover:translate-y-2 hover:shadow-[6px_6px_0px_#000] transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    {/* Step number */}
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative flex-shrink-0"
                    >
                      <div className="relative w-16 h-16 neo-border monster-purple flex items-center justify-center text-monster-white font-bold">
                        <span className="text-2xl neo-heading">1</span>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2 neo-heading">
                        Sign in with Google
                      </h2>
                      <div className="flex items-center text-monster-purple group-hover:text-monster-accent transition-colors">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium font-mono">Quick & Secure</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-monster-gray group-hover:text-monster-black transition-colors duration-300 leading-relaxed text-lg font-mono">
                    Click the <strong className="text-monster-accent neo-heading">Sign in with Google</strong> button at the top.
                    Choose your Google account when prompted. You'll see a confirmation message once signed in.
                  </p>
                  
                  <div className="relative group/image">
                    <img 
                      src="/1.png" 
                      alt="Sign in screenshot" 
                      className="relative neo-border w-full max-w-2xl mx-auto"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.3 } }}
              className="group relative perspective-1000"
            >
              <Card className="neo-card monster-white text-monster-black hover:translate-x-2 hover:translate-y-2 hover:shadow-[6px_6px_0px_#000] transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative flex-shrink-0"
                    >
                      <div className="relative w-16 h-16 neo-border monster-cyan flex items-center justify-center text-monster-black font-bold">
                        <span className="text-2xl neo-heading">2</span>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2 neo-heading">
                        Select Your Batch
                      </h2>
                      <div className="flex items-center text-monster-cyan group-hover:text-monster-accent transition-colors">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium font-mono">Choose Wisely</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-monster-gray group-hover:text-monster-black transition-colors duration-300 text-lg font-mono">Choose your batch from the options:</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {["2024 Batch", "All Other Batches"].map((batch, index) => (
                        <div key={batch} className="flex items-center gap-3 p-4 neo-border monster-white">
                          <div className="w-2 h-2 monster-accent" />
                          <span className="text-monster-black font-medium font-mono">{batch}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="neo-card monster-yellow text-monster-black p-6">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium mb-2 neo-heading">Important Note</p>
                          <p className="text-sm leading-relaxed font-mono">
                            The system automatically adjusts semester dates and "No-Class" periods based on your selection.
                            If you choose incorrectly, simply refresh, sign in again, and select the right batch.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.3 } }}
              className="group relative perspective-1000"
            >
              <Card className="neo-card monster-white text-monster-black hover:translate-x-2 hover:translate-y-2 hover:shadow-[6px_6px_0px_#000] transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative flex-shrink-0"
                    >
                      <div className="relative w-16 h-16 neo-border monster-emerald flex items-center justify-center text-monster-black font-bold">
                        <span className="text-2xl neo-heading">3</span>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2 neo-heading">
                        Timetable Input
                      </h2>
                      <div className="flex items-center text-monster-emerald group-hover:text-monster-accent transition-colors">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium font-mono">Multiple Options</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2 neo-heading">
                        <span className="w-6 h-6 monster-purple flex items-center justify-center text-xs font-bold">A</span>
                        Upload CSV
                      </h3>
                      <p className="text-monster-gray group-hover:text-monster-black transition-colors duration-300 font-mono">
                        If you have an edited CSV file of your timetable, simply upload it to see a preview.
                      </p>
                    </div>
                    
                    <Separator className="monster-black h-1" />
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2 neo-heading">
                        <span className="w-6 h-6 monster-cyan flex items-center justify-center text-xs font-bold">B</span>
                        Paste Timetable Text 
                        <span className="text-sm text-monster-emerald font-bold font-mono">(Recommended)</span>
                      </h3>
                      <p className="text-monster-gray group-hover:text-monster-black transition-colors duration-300 font-mono">
                        For new users, copy the text above your VTOP timetable and paste it here.
                        Click "Next Step" to parse and verify the data.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="relative group/image">
                          <img 
                            src="/2.png" 
                            alt="VTOP timetable text location" 
                            className="relative neo-border w-full"
                          />
                        </div>
                        <p className="text-sm text-monster-silver text-center font-mono">Copy timetable text from VTOP</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="relative group/image">
                          <img 
                            src="/3.png" 
                            alt="Parsed timetable preview" 
                            className="relative neo-border w-full"
                          />
                        </div>
                        <p className="text-sm text-monster-silver text-center font-mono">Parsed timetable preview</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.3 } }}
              className="group relative perspective-1000"
            >
              <Card className="neo-card monster-white text-monster-black hover:translate-x-2 hover:translate-y-2 hover:shadow-[6px_6px_0px_#000] transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative flex-shrink-0"
                    >
                      <div className="relative w-16 h-16 neo-border monster-yellow flex items-center justify-center text-monster-black font-bold">
                        <span className="text-2xl neo-heading">4</span>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2 neo-heading">
                        Set Up Notifications
                      </h2>
                      <div className="flex items-center text-monster-yellow group-hover:text-monster-accent transition-colors">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium font-mono">Customize Alerts</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-monster-gray group-hover:text-monster-black transition-colors duration-300 text-lg font-mono">
                      Configure up to three notifications for each class. Each field represents minutes before class start time.
                    </p>
                    
                    <div className="grid gap-3">
                      {[
                        "For 2 notifications: Set the 3rd field to 0",
                        "For 1 notification: Set two fields to 0", 
                        "For no notifications: Set all fields to 0"
                      ].map((tip, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 neo-border monster-gray">
                          <div className="w-1.5 h-1.5 monster-yellow" />
                          <span className="text-monster-green font-mono">{tip}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="relative group/image">
                      <img 
                        src="/4.jpg" 
                        alt="Notification settings" 
                        className="relative neo-border w-full max-w-2xl mx-auto"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 5 */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2.0, duration: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.3 } }}
              className="group relative perspective-1000"
            >
              <Card className="neo-card monster-white text-monster-black hover:translate-x-2 hover:translate-y-2 hover:shadow-[6px_6px_0px_#000] transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative flex-shrink-0"
                    >
                      <div className="relative w-16 h-16 neo-border monster-purple flex items-center justify-center text-monster-white font-bold">
                        <span className="text-2xl neo-heading">5</span>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2 neo-heading">
                        Create Calendar Events
                      </h2>
                      <div className="flex items-center text-monster-purple group-hover:text-monster-accent transition-colors">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium font-mono">Final Step</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-monster-gray group-hover:text-monster-black transition-colors duration-300 text-lg font-mono">
                      Click "Create Schedules (Click Once and Wait)" and wait for the success message.
                      Open Google Calendar to see your class schedule with all details.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="relative group/image">
                          <img 
                            src="/5.jpg" 
                            alt="Calendar settings" 
                            className="relative neo-border"
                          />
                        </div>
                        <p className="text-sm text-monster-silver text-center font-mono">Calendar creation process</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="relative group/image">
                          <img 
                            src="/6.jpg" 
                            alt="Event details" 
                            className="relative neo-border"
                          />
                        </div>
                        <p className="text-sm text-monster-silver text-center font-mono">Event details in calendar</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Conclusion */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.3 } }}
              className="group relative perspective-1000"
            >
              <Card className="neo-card monster-accent text-monster-white hover:translate-x-2 hover:translate-y-2 hover:shadow-[6px_6px_0px_#000] transition-all duration-300">
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.4, duration: 0.6, type: "spring" }}
                  >
                    <div className="text-6xl mb-6">🎉</div>
                    <h2 className="text-4xl font-bold mb-6 neo-heading">
                      You're All Set!
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto leading-relaxed font-mono">
                      Your class schedule is now in Google Calendar. Share this tool with your friends
                      who still use static timetable images!
                    </p>
                    
                    <motion.div 
                      className="flex items-center justify-center text-monster-white hover:text-monster-white transition-colors mt-8 group/cta cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <span className="font-medium mr-3 font-mono">Start using your calendar</span>
                      <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform duration-200" />
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}