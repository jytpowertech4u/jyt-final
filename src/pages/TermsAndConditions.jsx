import React from "react";

function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 pt-28 pb-10"> {/* ✅ added top padding */}
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to <strong>JYT PowerTech</strong>. By accessing or using our website and services, you agree
        to be bound by the following Terms and Conditions. Please read them carefully before proceeding.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">1. Introduction</h2>
      <p className="mb-4">
        JYT PowerTech is an authorized APDCL solar vendor providing solar rooftop installation,
        maintenance, and related electrical solutions across Assam, India. These terms apply to
        all users, clients, and visitors of our website and services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2. Services</h2>
      <p className="mb-4">
        Our services include rooftop solar panel installation, maintenance, AMC contracts, subsidy
        assistance, and supply of electrical equipment. All quotations, project timelines, and pricing
        are subject to confirmation through official communication.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3. User Obligations</h2>
      <p className="mb-4">
        You agree to provide accurate information when contacting us or requesting quotations.
        Misrepresentation or misuse of our services may lead to denial of service or legal action.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">4. Payments & Refunds</h2>
      <p className="mb-4">
        All payments must be made as per the mutually agreed project terms. Once a solar installation
        project has commenced, refunds are not applicable except in cases of service failure or
        technical infeasibility determined by JYT PowerTech.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">5. Warranties & Liability</h2>
      <p className="mb-4">
        JYT PowerTech provides warranties on equipment and workmanship as per manufacturer and
        government norms. However, we are not liable for damage due to misuse, negligence, or
        unauthorized modification of installed systems.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">6. Third-Party Links</h2>
      <p className="mb-4">
        Our website may contain links to third-party sites or services. We do not control or assume
        responsibility for their content, privacy policies, or practices.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">7. Intellectual Property</h2>
      <p className="mb-4">
        All content, images, text, and materials on this website are owned by JYT PowerTech or
        used with permission. Unauthorized reproduction or distribution is strictly prohibited.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">8. Governing Law</h2>
      <p className="mb-4">
        These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to
        the jurisdiction of the courts in Guwahati, Assam.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">9. Contact Information</h2>
      <p className="mb-4">
        For any queries regarding these Terms & Conditions, please contact us at: <br />
        <a href="mailto:jytpowertech@gmail.com" className="text-blue-600 underline">
          jytpowertech@gmail.com
        </a>
      </p>

      <p className="mt-8">
        <strong>JYT PowerTech</strong> <br />
        Authorized APDCL Solar Vendor (Code: 106220) <br />
        Six Mile, VIP Road, Kamrup(M), Guwahati - 22, Assam
      </p>
    </div>
  );
}

export default TermsAndConditions;
