import React from "react";

function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 pt-28 pb-10"> {/* ✅ added top padding */}
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At <strong>JYT PowerTech</strong>, we are committed to protecting your privacy. This
        Privacy Policy explains how we collect, use, and protect your personal
        information when you visit our website or engage with our solar panel
        installation services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information such as your name, contact details,
        email address, and project requirements when you contact us or submit
        an inquiry form. We may also collect non-personal information such as
        browser type, device, and usage data for analytics.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your information to respond to inquiries, provide quotations,
        deliver installation and maintenance services, and send updates or
        promotional offers (if opted-in). We do not sell or share your personal
        information with third parties except when required to deliver our
        services or comply with the law.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3. Data Security</h2>
      <p className="mb-4">
        We implement appropriate technical and organizational measures to
        protect your personal data from unauthorized access, loss, or misuse.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">4. Cookies</h2>
      <p className="mb-4">
        Our website may use cookies to enhance your browsing experience and
        analyze traffic. You can choose to disable cookies through your browser
        settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">5. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or request deletion of your
        personal data by contacting us at{" "}
        <a
          href="mailto:info@jytsolar.com"
          className="text-blue-600 underline"
        >
          info@jytsolar.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">6. Policy Updates</h2>
      <p className="mb-4">
        We may update this Privacy Policy periodically. The latest version will
        always be available on this page.
      </p>

      <p className="mt-8">
        <strong>JYT PowerTech</strong>  
        <br />
        A Govt-Registered APDCL Solar Vendor  
        <br />
        Assam, India
      </p>
    </div>
  );
}

export default PrivacyPolicy;
