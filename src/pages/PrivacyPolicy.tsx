import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-sm text-center">
          Effective Date:{" "}
          <span className="font-semibold">
            {new Date().toLocaleDateString()}
          </span>
        </p>

        <hr className="my-6 border-gray-300" />

        {/* 1. Introduction */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          1. Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold">VIT AP Study Hub</span>.
          This Privacy Policy explains how we handle user data on our platform,
          including details about data protection, retention, and deletion.
        </p>

        {/* 2. Information We Collect */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          2. Information We Collect
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Our website uses two types of authentication:
        </p>
        <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
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
              href="https://vitaptimetablescheduler.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition underline"
            >
              (vitaptimetablescheduler.streamlit.app)
            </a>
            .
          </li>
        </ul>

        {/* 3. How We Use Your Information */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          3. How We Use Your Information
        </h2>
        <p className="text-gray-700 leading-relaxed">
          - We <span className="font-semibold">do not store</span> your Google
          account details or other private information beyond the brief session
          needed to create your schedule in Google Calendar.
          <br />
          - Google authentication is{" "}
          <span className="font-semibold">
            only used to create calendar events
          </span>{" "}
          in a separate calendar named “WIN SEM” (or similar).
          <br />
          - We <span className="font-semibold">do not share</span> any user data
          with third parties.
        </p>

        {/* 4. Data Protection & Security */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          4. Data Protection & Security
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We take reasonable measures to protect user data:
        </p>
        <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
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

        {/* 5. Data Retention & Deletion */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          5. Data Retention & Deletion
        </h2>
        <p className="text-gray-700 leading-relaxed">
          <strong>Minimal Retention:</strong> We store your email and role
          (student/admin) in our database (Supabase) for account management.
          <br />
          <strong>No Long-Term Google Data Storage:</strong> We do not store any
          Google Calendar events or tokens on our servers. Events are created in
          your Google Calendar, and we do not retain copies.
          <br />
          <strong>Session Expiration:</strong> After creating your schedule, we
          remove the short-lived session token to prevent ongoing access to your
          Google account.
          <br />
          <strong>Deletion Requests:</strong> If you wish to delete your
          Supabase profile or any minimal data we hold, please contact us at{" "}
          <a
            href="mailto:vitapstudyhub@gmail.com"
            className="text-blue-600 hover:text-blue-800 transition underline"
          >
            vitapstudyhub@gmail.com
          </a>
          . We will promptly remove your data from our database.
        </p>

        {/* 6. Google API Permissions */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          6. Google API & Permissions
        </h2>
        <p className="text-gray-700 leading-relaxed">
          When you sign in via Google on the timetable scheduling tool, we only
          request Calendar access to create or update your class schedule. You
          can manage or revoke these permissions anytime in your Google account
          settings.
        </p>

        {/* 7. Changes to Privacy Policy */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          7. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may update this Privacy Policy from time to time. If we make
          significant changes, we will notify users on our website or via email.
        </p>

        {/* 8. Contact Us */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">8. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions, requests for data deletion, or other
          concerns about this Privacy Policy, contact us at{" "}
          <a
            href="mailto:vitapstudyhub@gmail.com"
            className="text-blue-600 hover:text-blue-800 transition underline"
          >
            vitapstudyhub@gmail.com
          </a>
          .
        </p>

        {/* Return to Home Button */}
        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="bg-primary text-white px-6 py-2 rounded-md shadow-md hover:bg-primary/80 transition duration-200"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
