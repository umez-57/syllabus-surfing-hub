import React from "react";
import { Navbar } from "@/components/Navbar"; // Adjust if needed

export default function Guide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content container */}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          User Guide: Get Your Class Schedule on Google Calendar
        </h1>

        {/* Step 1 */}
        <section id="step1" className="space-y-4">
          <h2 className="text-2xl font-semibold">Step 1: Sign in with Google</h2>
          <p>
            Click the <strong>“Sign in with Google”</strong> button at the top.
            If prompted, choose your Google account. Once signed in, you'll see
            a confirmation message:
          </p>

          {/* Placeholder for screenshot */}
          <div className="border border-dashed border-gray-300 p-4 my-3">        
                <img src="/1.png" alt="Sign in screenshot" className="h-[120px] w-auto object-cover md:h-[255px]" />
           
          </div>
        </section>

        {/* Step 2 */}
        <section id="step2" className="space-y-4">
          <h2 className="text-2xl font-semibold">Step 2: Select Your Batch</h2>
          <p>
            After signing in, you’ll be asked to select your batch:
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>2024 Batch</li>
              <li>All Other Batches</li>
            </ul>
          </p>
          <p>
            Based on your choice, the system automatically adjusts semester start
            &amp; end dates, plus special "No-Class" date ranges (like exam weeks).
            If you pick the wrong batch by mistake, just refresh the page, sign
            in again, and choose the correct batch.
          </p>
        </section>

        {/* Step 3 */}
        <section id="step3" className="space-y-4">
          <h2 className="text-2xl font-semibold">Step 3: Timetable Input</h2>
          <p>
            You can provide your timetable in one of two ways:
          </p>

          <ol className="list-decimal list-inside ml-4 space-y-2">
            <li>
              <strong>Option A: Upload CSV</strong>
              <br />
              If you already have an edited CSV file of your timetable, upload it.
              You’ll see a preview of the CSV data.
            </li>
            <li>
              <strong>Option B (Recommended): Paste Timetable Text</strong>
              <br />
              New users should use this option. Open your VTOP account and go to
              the Timetable area. Copy the text that appears above the actual
              timetable (see reference image) and paste into the text box here.
              Click “Next Step” to parse. If the parsed output looks correct,
              proceed.
              <br />
              <em>
                Optional: If you want to rename/shorten any course titles, you
                can download the CSV of the parsed table, edit locally, and then
                re-upload via Option A.
              </em>
            </li>
          </ol>

          {/* Placeholder for screenshots */}
          <div className="space-y-2 border border-dashed border-gray-300 p-4 my-3">
            <p className="text-sm text-gray-500 italic">
              <img src="/2.png" alt="Sign in screenshot"   className="h-[400px] w-auto  md:h-[400px]"   />
              <h1>(Screenshot showing how to copy timetable text from VTOP)</h1>
            </p>
            <br />
            <p className="text-sm text-gray-500 italic">
              <img src="/3.png" alt="Sign in screenshot" className="h-[500px] w-auto  md:h-[500px]" />
              <h1>(Screenshot of parsed timetable preview with CSV download button)</h1>
            </p>
            {/* Insert your images as needed */}
          </div>
        </section>

        {/* Step 4 */}
        <section id="step4" className="space-y-4">
          <h2 className="text-2xl font-semibold">Step 4: Set Up Notifications</h2>
          <p>
            You can set up to three notifications for each class. Each field
            represents “minutes before class start time” for a popup.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>If you want 2 notifications, set the 3rd field to 0.</li>
            <li>If you only need 1 notification, set the other two fields to 0.</li>
            <li>
              If you don’t want any, set all three to 0. You’ll get a quick popup
              [X] minutes before each class.
            </li>
          </ul>

          {/* Placeholder for screenshot */}
          <div className="border border-dashed border-gray-300 p-4 my-3">
            <p className="text-sm text-gray-500 italic">
                <img src="/4.jpg" alt="Sign in screenshot" className="h-[1000px] w-auto object-cover md:h-[450px]" />
              <h1>(Screenshot of setting notifications and an example popup)</h1>
            </p>
          </div>
        </section>

        {/* Step 5 */}
        <section id="step5" className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step 5: Create Class Schedules on Google Calendar
          </h2>
          <p>
            Click <strong>“Create Schedules (Click Once and Wait)”</strong> only
            once, then wait for a success message. Open your Google Calendar
            (signed into the same account from Step 1). Switch to Day/Week/Month
            view as you prefer. You should see each class slot as a recurring
            event. Clicking on any event shows details like professor name,
            classroom, etc.
          </p>

          {/* Placeholder for success screenshot */}
          <div className="border border-dashed border-gray-300 p-4 my-3">
            <p className="text-sm text-gray-500 italic">
                <img src="/5.jpg" alt="Sign in screenshot" className="h-[452px] w-auto object-cover md:h-[450px]" />
              <h1>(Screenshot of “Calendar events Best Settings) </h1>
             
            </p>
            <br />
            
            <p className="text-sm text-gray-500 italic">
             <img src="/6.jpg" alt="Sign in screenshot" className="h-[452px] w-auto object-cover md:h-[450px]" />
              <h1>(Screenshot of Faculty Detailes inside each Event)</h1>
            </p>
          </div>
        </section>

        {/* Thank You / Conclusion */}
        <section id="thankyou" className="space-y-4">
          <h2 className="text-xl font-semibold">Thank You!</h2>
          <p>
            You’re all set! Your class schedule is now conveniently managed in
            Google Calendar. If you found this helpful, please share with friends
            who still rely on static timetable images. Enjoy your streamlined
            schedule!
          </p>
        </section>
      </div>
    </div>
  );
}
