import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/hero";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Guide() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Hero background */}
      <Hero className="absolute inset-0 -z-10" gradient blur />
      <Navbar />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Main Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            User Guide
          </h1>
          <p className="text-xl text-gray-400">
            Get Your Class Schedule on Google Calendar
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid gap-8 mt-12">
          {/* Step 1 */}
          <Card className="bg-white/10 border-none backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h2 className="text-2xl font-semibold text-white">Sign in with Google</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Click the <strong className="text-white">"Sign in with Google"</strong> button at the top.
                Choose your Google account when prompted. You'll see a confirmation message once signed in.
              </p>
              <img 
                src="/1.png" 
                alt="Sign in screenshot" 
                className="rounded-lg shadow-xl w-full max-w-2xl mx-auto mt-4 border border-white/20"
              />
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="bg-white/10 border-none backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h2 className="text-2xl font-semibold text-white">Select Your Batch</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300">Choose your batch from the options:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>2024 Batch</li>
                  <li>All Other Batches</li>
                </ul>
                <div className="bg-white/5 p-4 rounded-lg mt-4">
                  <p className="text-sm text-gray-400">
                    <strong className="text-white">Note:</strong> The system automatically adjusts semester dates and "No-Class" periods based on your selection.
                    If you choose incorrectly, simply refresh, sign in again, and select the right batch.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="bg-white/10 border-none backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h2 className="text-2xl font-semibold text-white">Timetable Input</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Option A: Upload CSV</h3>
                  <p className="text-gray-300">
                    If you have an edited CSV file of your timetable, simply upload it to see a preview.
                  </p>
                </div>
                
                <Separator className="bg-white/20" />
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Option B: Paste Timetable Text (Recommended)</h3>
                  <p className="text-gray-300">
                    For new users, copy the text above your VTOP timetable and paste it here.
                    Click "Next Step" to parse and verify the data.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <img 
                      src="/2.png" 
                      alt="VTOP timetable text location" 
                      className="rounded-lg shadow-xl w-full border border-white/20"
                    />
                    <p className="text-sm text-gray-400 text-center">Screenshot showing how to copy timetable text from VTOP</p>
                  </div>
                  <div className="space-y-2">
                    <img 
                      src="/3.png" 
                      alt="Parsed timetable preview" 
                      className="rounded-lg shadow-xl w-full border border-white/20"
                    />
                    <p className="text-sm text-gray-400 text-center">Screenshot of parsed timetable preview with CSV download button</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="bg-white/10 border-none backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h2 className="text-2xl font-semibold text-white">Set Up Notifications</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Configure up to three notifications for each class. Each field represents minutes before class start time.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>For 2 notifications: Set the 3rd field to 0</li>
                  <li>For 1 notification: Set two fields to 0</li>
                  <li>For no notifications: Set all fields to 0</li>
                </ul>
                <img 
                  src="/4.jpg" 
                  alt="Notification settings" 
                  className="rounded-lg shadow-xl border border-white/20 w-full max-w-2xl mx-auto mt-4"
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card className="bg-white/10 border-none backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <span className="text-xl font-bold">5</span>
                </div>
                <h2 className="text-2xl font-semibold text-white">Create Calendar Events</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Click "Create Schedules (Click Once and Wait)" and wait for the success message.
                  Open Google Calendar to see your class schedule with all details.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <img 
                    src="/5.jpg" 
                    alt="Calendar settings" 
                    className="rounded-lg shadow-xl border border-white/20"
                  />
                  <img 
                    src="/6.jpg" 
                    alt="Event details" 
                    className="rounded-lg shadow-xl border border-white/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conclusion */}
          <Card className="bg-white/10 border-none backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">You're All Set! 🎉</h2>
              <p className="text-gray-300">
                Your class schedule is now in Google Calendar. Share this tool with your friends
                who still use static timetable images!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}