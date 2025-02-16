import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-sm text-center">
          Effective Date: <span className="font-semibold">{new Date().toLocaleDateString()}</span>
        </p>

        <hr className="my-6 border-gray-300" />

        {/* Section: Introduction */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">1. Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold">Syllabus Surfing Hub</span>. This Privacy Policy explains how we handle user data when using our platform.
        </p>

        {/* Section: Information We Collect */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">2. Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed">Our website uses two types of authentication:</p>
        <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
          <li>
            <strong>Supabase Authentication</strong>: Users sign up with email and OTP verification to access general website features.
          </li>
          <li>
            <strong>Google Authentication (Only for Calendar Events)</strong>: This is used exclusively for{" "}
            <span className="font-semibold">Google Calendar event creation</span> at our timetable scheduling tool.{" "}
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

        {/* Section: How We Use Information */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">3. How We Use Your Information</h2>
        <p className="text-gray-700 leading-relaxed">
          - We <span className="font-semibold">do not store</span> your Google account details or any private information.
          <br />- Google authentication is <span className="font-semibold">only used to create calendar events</span>.
          <br />- We <span className="font-semibold">do not share</span> any user data with third parties.
        </p>

        {/* Section: Google API Permissions */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">4. Google API & Permissions</h2>
        <p className="text-gray-700 leading-relaxed">
          When you sign in via Google on the timetable scheduling tool, we only request the **Google Calendar scope** to create your class schedule.
          <br />
          You can manage or revoke permissions anytime via your Google account settings.
        </p>

        {/* Section: Changes to Privacy Policy */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">5. Changes to This Privacy Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          We may update this Privacy Policy. If we make significant changes, we will notify users on our website.
        </p>

        {/* Section: Contact Information */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">6. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions, contact us at{" "}
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
