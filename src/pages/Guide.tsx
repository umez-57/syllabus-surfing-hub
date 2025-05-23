
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BeamsBackground } from "@/components/ui/beams-background";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";

export default function Guide() {
  return (
    <BeamsBackground intensity="medium" className="min-h-screen overflow-hidden">
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
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/80">Step-by-Step Guide</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200"
            >
              User Guide
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
            >
              Get Your Class Schedule on 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold"> Google Calendar</span>
            </motion.p>

            {/* Decorative line */}
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              className="h-px max-w-md mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent mt-8"
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
              {/* Background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110" />
              
              <Card className="relative bg-black/40 border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    {/* Step number with glow */}
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative flex-shrink-0"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-lg group-hover:opacity-40 group-hover:scale-125 transition-all duration-700" />
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-2xl">
                        <span className="text-2xl font-bold">1</span>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
                        Sign in with Google
                      </h2>
                      <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Quick & Secure</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed text-lg">
                    Click the <strong className="text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">"Sign in with Google"</strong> button at the top.
                    Choose your Google account when prompted. You'll see a confirmation message once signed in.
                  </p>
                  
                  <div className="relative group/image">
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur opacity-0 group-hover/image:opacity-100 transition-all duration-500" />
                    <img 
                      src="/1.png" 
                      alt="Sign in screenshot" 
                      className="relative rounded-xl shadow-2xl w-full max-w-2xl mx-auto border border-white/20 group-hover/image:border-white/30 transition-all duration-300"
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
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110" />
              
              <Card className="relative bg-black/40 border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative flex-shrink-0"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-20 blur-lg group-hover:opacity-40 group-hover:scale-125 transition-all duration-700" />
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-2xl">
                        <span className="text-2xl font-bold">2</span>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
                        Select Your Batch
                      </h2>
                      <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Choose Wisely</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-lg">Choose your batch from the options:</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {["2024 Batch", "All Other Batches"].map((batch, index) => (
                        <div key={batch} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" />
                          <span className="text-white/80 font-medium">{batch}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gradient-to-r from-white/5 to-white/10 p-6 rounded-xl border border-white/10">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-white/90 font-medium mb-2">Important Note</p>
                          <p className="text-sm text-white/70 leading-relaxed">
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
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110" />
              
              <Card className="relative bg-black/40 border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative flex-shrink-0"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 opacity-20 blur-lg group-hover:opacity-40 group-hover:scale-125 transition-all duration-700" />
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-2xl">
                        <span className="text-2xl font-bold">3</span>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
                        Timetable Input
                      </h2>
                      <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Multiple Options</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">A</span>
                        Upload CSV
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                        If you have an edited CSV file of your timetable, simply upload it to see a preview.
                      </p>
                    </div>
                    
                    <Separator className="bg-white/20" />
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold">B</span>
                        Paste Timetable Text 
                        <span className="text-sm bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-bold">(Recommended)</span>
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                        For new users, copy the text above your VTOP timetable and paste it here.
                        Click "Next Step" to parse and verify the data.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="relative group/image">
                          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur opacity-0 group-hover/image:opacity-100 transition-all duration-500" />
                          <img 
                            src="/2.png" 
                            alt="VTOP timetable text location" 
                            className="relative rounded-xl shadow-xl w-full border border-white/20 group-hover/image:border-white/30 transition-all duration-300"
                          />
                        </div>
                        <p className="text-sm text-white/50 text-center">Copy timetable text from VTOP</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="relative group/image">
                          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur opacity-0 group-hover/image:opacity-100 transition-all duration-500" />
                          <img 
                            src="/3.png" 
                            alt="Parsed timetable preview" 
                            className="relative rounded-xl shadow-xl w-full border border-white/20 group-hover/image:border-white/30 transition-all duration-300"
                          />
                        </div>
                        <p className="text-sm text-white/50 text-center">Parsed timetable preview</p>
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
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110" />
              
              <Card className="relative bg-black/40 border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative flex-shrink-0"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 opacity-20 blur-lg group-hover:opacity-40 group-hover:scale-125 transition-all duration-700" />
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white shadow-2xl">
                        <span className="text-2xl font-bold">4</span>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
                        Set Up Notifications
                      </h2>
                      <div className="flex items-center text-yellow-400 group-hover:text-yellow-300 transition-colors">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Customize Alerts</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-lg">
                      Configure up to three notifications for each class. Each field represents minutes before class start time.
                    </p>
                    
                    <div className="grid gap-3">
                      {[
                        "For 2 notifications: Set the 3rd field to 0",
                        "For 1 notification: Set two fields to 0", 
                        "For no notifications: Set all fields to 0"
                      ].map((tip, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" />
                          <span className="text-white/80">{tip}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="relative group/image">
                      <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur opacity-0 group-hover/image:opacity-100 transition-all duration-500" />
                      <img 
                        src="/4.jpg" 
                        alt="Notification settings" 
                        className="relative rounded-xl shadow-xl border border-white/20 w-full max-w-2xl mx-auto group-hover/image:border-white/30 transition-all duration-300"
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
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110" />
              
              <Card className="relative bg-black/40 border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative flex-shrink-0"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-lg group-hover:opacity-40 group-hover:scale-125 transition-all duration-700" />
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-2xl">
                        <span className="text-2xl font-bold">5</span>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
                        Create Calendar Events
                      </h2>
                      <div className="flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Final Step</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-lg">
                      Click "Create Schedules (Click Once and Wait)" and wait for the success message.
                      Open Google Calendar to see your class schedule with all details.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="relative group/image">
                          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur opacity-0 group-hover/image:opacity-100 transition-all duration-500" />
                          <img 
                            src="/5.jpg" 
                            alt="Calendar settings" 
                            className="relative rounded-xl shadow-xl border border-white/20 group-hover/image:border-white/30 transition-all duration-300"
                          />
                        </div>
                        <p className="text-sm text-white/50 text-center">Calendar creation process</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="relative group/image">
                          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur opacity-0 group-hover/image:opacity-100 transition-all duration-500" />
                          <img 
                            src="/6.jpg" 
                            alt="Event details" 
                            className="relative rounded-xl shadow-xl border border-white/20 group-hover/image:border-white/30 transition-all duration-300"
                          />
                        </div>
                        <p className="text-sm text-white/50 text-center">Event details in calendar</p>
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
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl blur-2xl opacity-50" />
              
              <Card className="relative bg-black/40 border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.4, duration: 0.6, type: "spring" }}
                  >
                    <div className="text-6xl mb-6">🎉</div>
                    <h2 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200">
                      You're All Set!
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                      Your class schedule is now in Google Calendar. Share this tool with your friends
                      who still use static timetable images!
                    </p>
                    
                    <motion.div 
                      className="flex items-center justify-center text-white/80 hover:text-white transition-colors mt-8 group/cta cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <span className="font-medium mr-3">Start using your calendar</span>
                      <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform duration-200" />
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </BeamsBackground>
  );
}
