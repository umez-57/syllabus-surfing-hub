import React from "react";

const TermsOfService = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Terms of Service
        </h1>
        <p className="text-gray-600 text-sm text-center">
          Effective Date:{" "}
          <span className="font-semibold">{new Date().toLocaleDateString()}</span>
        </p>

        <hr className="my-6 border-gray-300" />

        {/* 1. Agreement */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">1. Agreement</h2>
        <p className="text-gray-700 leading-relaxed">
          By using <span className="font-semibold">VIT AP Study Hub</span> (the “Service”),
          you acknowledge that you have read, understood, and agree to be bound
          by these Terms of Service. If you do not agree, please do not use our
          platform.
        </p>

        {/* 2. Account Registration */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">2. Account Registration</h2>
        <p className="text-gray-700 leading-relaxed">
          <strong>Supabase OTP Authentication:</strong> You must create an
          account with a valid email and OTP verification to access main
          features. <br />
          <strong>Google Sign-In (Calendar Events):</strong> Google
          authentication is required only if you choose to add your class
          schedule to Google Calendar. You can still use most features without
          connecting your Google account.
        </p>

        {/* 3. Use of Google Calendar Feature */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          3. Use of Google Calendar Feature
        </h2>
        <p className="text-gray-700 leading-relaxed">
          - Our timetable scheduler at{" "}
          <a
            href="https://vitaptimetablescheduler.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition underline"
          >
            vitaptimetablescheduler.streamlit.app
          </a>{" "}
          requires Google authentication to create events on your behalf. <br />
          - We request the minimum necessary permissions from Google Calendar,
          solely to create or modify events in a dedicated calendar (e.g., “WIN
          SEM”). <br />
          - We do <span className="font-semibold">not</span> store your Google
          account credentials or personal Google data. Once events are created,
          we remove or invalidate the short-lived token. <br />
          - You may revoke these permissions at any time via your Google Account
          settings.
        </p>

        {/* 4. User Responsibilities */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          4. User Responsibilities
        </h2>
        <p className="text-gray-700 leading-relaxed">
          - You are responsible for maintaining the security of your{" "}
          <span className="font-semibold">Google account</span> and your
          account credentials for VIT AP Study Hub. <br />
          - You agree not to misuse the Service or use it for unlawful purposes.{" "}
          <br />
          - You are responsible for ensuring that any data you submit (e.g.,
          timetable text, CSV uploads) does not violate the rights of others or
          contain malicious content.
        </p>

        {/* 5. Data Handling & Privacy */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          5. Data Handling & Privacy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          - Please review our{" "}
          <a
            href="/privacy-policy"
            className="text-blue-600 hover:text-blue-800 transition underline"
          >
            Privacy Policy
          </a>{" "}
          to understand how we collect, use, and protect your information. <br />
          - We only retain minimal data (e.g., your email and role) in our
          Supabase database. <br />
          - Any data created in Google Calendar remains under your control; we
          do not store it on our servers. <br />
          - You may request deletion of your Supabase profile data at any time
          by contacting us at{" "}
          <a
            href="mailto:vitapstudyhub@gmail.com"
            className="text-blue-600 hover:text-blue-800 transition underline"
          >
            vitapstudyhub@gmail.com
          </a>
          .
        </p>

        {/* 6. Limitation of Liability */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          6. Limitation of Liability
        </h2>
        <p className="text-gray-700 leading-relaxed">
          <span className="font-semibold">VIT AP Study Hub</span> (the
          “Service”) is provided on an “as-is” basis without warranties of any
          kind, either express or implied. We are not responsible for:
        </p>
        <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
          <li>Google Calendar errors, downtime, or revoked permissions.</li>
          <li>Any scheduling conflicts or missed classes due to incorrect data.</li>
          <li>Loss of access if you remove or revoke our permissions in Google.</li>
          <li>Direct, indirect, or incidental damages arising from the use of this Service.</li>
        </ul>

        {/* 7. Changes to Terms */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          7. Changes to These Terms
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may modify these Terms at any time. Continued use of the Service
          indicates your acceptance of any updated Terms. If changes are
          significant, we will notify you on our website or via email.
        </p>

        {/* 8. Termination */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">8. Termination</h2>
        <p className="text-gray-700 leading-relaxed">
          We reserve the right to suspend or terminate your account at any time
          if we believe you have violated these Terms. Upon termination, any
          access to Google Calendar scheduling will be revoked, and we may
          remove your profile data from our database.
        </p>

        {/* 9. Contact Information */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">9. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions or concerns regarding these Terms, please
          contact us at{" "}
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

export default TermsOfService;
