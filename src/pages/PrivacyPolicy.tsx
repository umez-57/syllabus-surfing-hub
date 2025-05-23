
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white text-center"
            >
              Privacy Policy
            </motion.h1>
            <p className="text-white/80 text-center text-sm mt-2">
              Effective Date: <span className="font-semibold">20/05/2025</span>
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* 1. Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to <span className="font-semibold">VIT AP Study Hub</span>.
                This Privacy Policy explains how we handle user data on our platform,
                including details about data protection, retention, and deletion.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website uses two types of authentication:
              </p>
              <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-3">
                <li>
                  <strong>Supabase Authentication</strong>: Users sign up with email
                  and OTP verification to access general website features. We store a
                  minimal profile (e.g., email, role) in our database.
                </li>
                <li>
                  <strong>Google Authentication (Only for Calendar Events)</strong>: 
                  Used exclusively for{" "}
                  <span className="font-semibold">
                    creating a separate Google Calendar
                  </span>{" "}
                  containing your class schedule at our timetable scheduling tool.{" "}
                  <a
                    href="https://timetable.vitaphub.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition underline"
                  >
                    (timetable.vitaphub.in)
                  </a>
                  .
                </li>
              </ul>
            </section>

            {/* 3. How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
                <li>
                  We <span className="font-semibold">do not store</span> your Google
                  account details or other private information beyond the brief session
                  needed to create your schedule in Google Calendar.
                </li>
                <li>
                  Google authentication is{" "}
                  <span className="font-semibold">
                    only used to create calendar events
                  </span>{" "}
                  in a separate calendar named "WIN SEM" (or similar).
                </li>
                <li>
                  We <span className="font-semibold">do not share</span> any user data
                  with third parties.
                </li>
              </ul>
            </section>

            {/* 4. Data Protection & Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Data Protection & Security
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We take reasonable measures to protect user data:
              </p>
              <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
                <li>
                  All communication with Google Calendar APIs occurs over{" "}
                  <strong>HTTPS</strong>, ensuring encryption in transit.
                </li>
                <li>
                  We only request the{" "}
                  <span className="font-semibold">Google Calendar scope</span> to
                  create or modify events in a dedicated calendar. We do not request
                  or access other Google data.
                </li>
                <li>
                  We do not store Google OAuth tokens permanently. After the schedule
                  creation process completes, we remove or invalidate tokens, so a new
                  login is required next time.
                </li>
              </ul>
            </section>

            {/* 5. Data Retention & Deletion */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Data Retention & Deletion
              </h2>
              <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-3">
                <li>
                  <strong>Minimal Retention:</strong> We store your email and role
                  (student/admin) in our database (Supabase) for account management.
                </li>
                <li>
                  <strong>No Long-Term Google Data Storage:</strong> We do not store any
                  Google Calendar events or tokens on our servers. Events are created in
                  your Google Calendar, and we do not retain copies.
                </li>
                <li>
                  <strong>Session Expiration:</strong> After creating your schedule, we
                  remove the short-lived session token to prevent ongoing access to your
                  Google account.
                </li>
                <li>
                  <strong>Deletion Requests:</strong> If you wish to delete your
                  Supabase profile or any minimal data we hold, please contact us at{" "}
                  <a
                    href="mailto:vitapstudyhub@gmail.com"
                    className="text-indigo-600 hover:text-indigo-800 transition underline"
                  >
                    vitapstudyhub@gmail.com
                  </a>
                  . We will promptly remove your data from our database.
                </li>
              </ul>
            </section>

            {/* 6. Google API Permissions */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Google API & Permissions
              </h2>
              <p className="text-gray-700 leading-relaxed">
                When you sign in via Google on the timetable scheduling tool, we only
                request Calendar access to create or update your class schedule. You
                can manage or revoke these permissions anytime in your Google account
                settings.
              </p>
            </section>

            {/* 7. Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. If we make
                significant changes, we will notify users on our website or via email.
              </p>
            </section>

            {/* 8. Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions, requests for data deletion, or other
                concerns about this Privacy Policy, contact us at{" "}
                <a
                  href="mailto:vitapstudyhub@gmail.com"
                  className="text-indigo-600 hover:text-indigo-800 transition underline"
                >
                  vitapstudyhub@gmail.com
                </a>
                .
              </p>
            </section>
          </div>

          {/* Return Button */}
          <div className="border-t border-gray-200 bg-gray-50 p-6 flex justify-center">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex items-center gap-2 hover:bg-indigo-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
