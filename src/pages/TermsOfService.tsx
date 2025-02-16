import React from "react";

const TermsOfService = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Terms of Service
        </h1>
        <p className="text-gray-600 text-sm text-center">
          Effective Date: <span className="font-semibold">{new Date().toLocaleDateString()}</span>
        </p>

        <hr className="my-6 border-gray-300" />

        {/* Section: Agreement */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">1. Agreement</h2>
        <p className="text-gray-700 leading-relaxed">
          By using <span className="font-semibold">Syllabus Surfing Hub</span>, you agree to these terms. 
          If you do not agree, do not use our platform.
        </p>

        {/* Section: Account Registration */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">2. Account Registration</h2>
        <p className="text-gray-700 leading-relaxed">
          - You must sign up using **Supabase OTP Authentication** to access main features.
          <br />- <span className="font-semibold">Google Sign-in is only required for Google Calendar event creation</span>.
        </p>

        {/* Section: Google Calendar Feature */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">3. Use of Google Calendar Feature</h2>
        <p className="text-gray-700 leading-relaxed">
          - The timetable scheduler at{" "}
          <a
            href="https://vitaptimetablescheduler.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition underline"
          >
            vitaptimetablescheduler.streamlit.app
          </a>{" "}
          requires Google authentication.
          <br />- The Google API is used **only to create class schedule events**.
          <br />- We do <span className="font-semibold">not store your Google account information</span>.
        </p>

        {/* Section: User Responsibilities */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">4. User Responsibilities</h2>
        <p className="text-gray-700 leading-relaxed">
          - You are responsible for the security of your **Google account**.
          <br />- You agree not to misuse the service.
        </p>

        {/* Section: Limitation of Liability */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">5. Limitation of Liability</h2>
        <p className="text-gray-700 leading-relaxed">
          We are not responsible for:
        </p>
        <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
          <li>Google Calendar issues.</li>
          <li>Google authentication errors.</li>
          <li>Loss of access due to revoked Google permissions.</li>
        </ul>

        {/* Section: Changes to Terms */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">6. Changes to Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          We may modify these terms at any time. Continued use of the service
          means you accept the changes.
        </p>

        {/* Section: Contact Information */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">7. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          For questions, email us at{" "}
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
