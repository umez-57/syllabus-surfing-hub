
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
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
              Terms of Service
            </motion.h1>
            <p className="text-white/80 text-center text-sm mt-2">
              Effective Date: <span className="font-semibold">20/05/2025</span>
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* 1. Agreement */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Agreement
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By using <span className="font-semibold">VIT AP Study Hub</span> (the "Service"),
                you acknowledge that you have read, understood, and agree to be bound
                by these Terms of Service. If you do not agree, please do not use our
                platform.
              </p>
            </section>

            {/* 2. Account Registration */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Account Registration
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
                  Used exclusively for creating a separate Google Calendar containing your 
                  class schedule at our timetable scheduling tool.{" "}
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

            {/* 3. Use of Google Calendar Feature */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. Use of Google Calendar Feature
              </h2>
              <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
                <li>
                  Our timetable scheduler at{" "}
                  <a
                    href="https://timetable.vitaphub.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition underline"
                  >
                    timetable.vitaphub.in
                  </a>{" "}
                  requires Google authentication to create events on your behalf.
                </li>
                <li>
                  We request the minimum necessary permissions from Google Calendar,
                  solely to create or modify events in a dedicated calendar (e.g., "WIN
                  SEM").
                </li>
                <li>
                  We do <span className="font-semibold">not</span> store your Google
                  account credentials or personal Google data. Once events are created,
                  we remove or invalidate the short-lived token.
                </li>
                <li>
                  You may revoke these permissions at any time via your Google Account
                  settings.
                </li>
              </ul>
            </section>

            {/* 4. User Responsibilities */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. User Responsibilities
              </h2>
              <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
                <li>
                  You are responsible for maintaining the security of your{" "}
                  <span className="font-semibold">Google account</span> and your
                  account credentials for VIT AP Study Hub.
                </li>
                <li>
                  You agree not to misuse the Service or use it for unlawful purposes.
                </li>
                <li>
                  You are responsible for ensuring that any data you submit (e.g.,
                  timetable text, CSV uploads) does not violate the rights of others or
                  contain malicious content.
                </li>
              </ul>
            </section>

            {/* 5. Data Handling & Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Data Handling & Privacy
              </h2>
              <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-3">
                <li>
                  Please review our{" "}
                  <a
                    href="/privacy-policy"
                    className="text-indigo-600 hover:text-indigo-800 transition underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  to understand how we collect, use, and protect your information.
                </li>
                <li>
                  We only retain minimal data (e.g., your email and role) in our
                  Supabase database.
                </li>
                <li>
                  Any data created in Google Calendar remains under your control; we
                  do not store it on our servers.
                </li>
                <li>
                  You may request deletion of your Supabase profile data at any time
                  by contacting us at{" "}
                  <a
                    href="mailto:vitapstudyhub@gmail.com"
                    className="text-indigo-600 hover:text-indigo-800 transition underline"
                  >
                    vitapstudyhub@gmail.com
                  </a>
                  .
                </li>
              </ul>
            </section>

            {/* 6. Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <span className="font-semibold">VIT AP Study Hub</span> (the
                "Service") is provided on an "as-is" basis without warranties of any
                kind, either express or implied. We are not responsible for:
              </p>
              <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
                <li>Google Calendar errors, downtime, or revoked permissions.</li>
                <li>Any scheduling conflicts or missed classes due to incorrect data.</li>
                <li>Loss of access if you remove or revoke our permissions in Google.</li>
                <li>Direct, indirect, or incidental damages arising from the use of this Service.</li>
              </ul>
            </section>

            {/* 7. Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Changes to These Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may modify these Terms at any time. Continued use of the Service
                indicates your acceptance of any updated Terms. If changes are
                significant, we will notify you on our website or via email.
              </p>
            </section>

            {/* 8. Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate your account at any time
                if we believe you have violated these Terms. Upon termination, any
                access to Google Calendar scheduling will be revoked, and we may
                remove your profile data from our database.
              </p>
            </section>

            {/* 9. Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions or concerns regarding these Terms, please
                contact us at{" "}
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

export default TermsOfService;
