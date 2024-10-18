import { TracingBeam } from "@/components/ui/tracing-beam";

export default function TermsPage() {
  return (
    <div className="pt-20 pb-16 px-4">
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased">
          <h1 className="text-3xl font-bold text-theme-700 mb-6">
            Crypto-Bot Terms and Conditions
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-theme-600 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By using Crypto-Bot's AI-driven trading platform and services, you
              agree to these terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-theme-600 mb-4">
              2. Trading Risks
            </h2>
            <p className="text-gray-700">
              Cryptocurrency trading involves significant risks. Users are
              responsible for their trading decisions and potential losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-theme-600 mb-4">
              3. AI Algorithm
            </h2>
            <p className="text-gray-700">
              Our AI trading algorithms are continuously updated to optimize
              performance, but past results do not guarantee future outcomes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-theme-600 mb-4">
              4. Account Security
            </h2>
            <p className="text-gray-700">
              Users are responsible for maintaining the security of their
              account credentials and enabling two-factor authentication.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-theme-600 mb-4">
              5. Data Privacy
            </h2>
            <p className="text-gray-700">
              We prioritize your privacy and handle all data in accordance with
              our comprehensive privacy policy.
            </p>
          </section>
        </div>
      </TracingBeam>
    </div>
  );
}
