import { TracingBeam } from "@/components/ui/tracing-beam";

export default function PrivacyPage() {
  return (
    <div className="pt-20 pb-16 px-4">
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased">
          <h1 className="text-3xl font-bold text-theme-700 mb-6">
            Crypto-Bot Privacy Policy
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-theme-600 mb-4">
              1. Information Collection
            </h2>
            <p className="text-gray-700">
              We collect information to provide better services to our users and
              enhance our AI-driven trading solutions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-theme-600 mb-4">
              2. Use of Information
            </h2>
            <p className="text-gray-700">
              The information we collect is used to improve our trading
              algorithms, customer service, and overall user experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-theme-600 mb-4">
              3. Data Protection
            </h2>
            <p className="text-gray-700">
              We implement state-of-the-art security measures to protect your
              personal and financial information from unauthorized access or
              disclosure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-theme-600 mb-4">
              4. Third-Party Sharing
            </h2>
            <p className="text-gray-700">
              We do not sell your personal information to third parties. We may
              share data with trusted partners to help us perform statistical
              analysis, improve our trading strategies, or provide customer
              support.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-theme-600 mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-700">
              You have the right to access, correct, or delete your personal
              information at any time. Contact our support team for assistance
              with managing your data.
            </p>
          </section>
        </div>
      </TracingBeam>
    </div>
  );
}
