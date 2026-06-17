import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | SAA Collection",
  description: "Read about how SAA Collection collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">Privacy Policy</span>
      </nav>

      <h1 className="font-display text-4xl md:text-5xl text-moss mb-4">Privacy Policy</h1>
      <p className="font-sans text-xs text-moss/50 mb-12">Last updated: June 2026</p>

      <div className="space-y-10 font-sans text-sm text-moss/80 leading-relaxed">
        <section>
          <h2 className="font-display text-xl text-moss mb-4">1. Information We Collect</h2>
          <p className="mb-3">We collect information you provide directly to us when you:</p>
          <ul className="space-y-2 ml-4">
            <li>• Create an account or place an order</li>
            <li>• Subscribe to our newsletter</li>
            <li>• Contact our customer support</li>
            <li>• Participate in promotions or surveys</li>
          </ul>
          <p className="mt-3">This may include your name, email address, phone number, shipping address, and payment information.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">2. How We Use Your Information</h2>
          <ul className="space-y-2 ml-4">
            <li>• To process and fulfill your orders</li>
            <li>• To communicate with you about your orders, returns, and inquiries</li>
            <li>• To send marketing emails (only with your consent)</li>
            <li>• To improve our website and shopping experience</li>
            <li>• To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">3. Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist in operating our website, processing payments, and delivering orders. These providers are bound by confidentiality agreements.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">4. Cookies & Tracking</h2>
          <p>Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings. Disabling cookies may affect certain features of our website.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">5. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security. We encourage you to use strong passwords and protect your account credentials.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">6. Your Rights</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="space-y-2 ml-4">
            <li>• Access and review the personal information we hold about you</li>
            <li>• Request correction of inaccurate information</li>
            <li>• Request deletion of your personal data</li>
            <li>• Opt out of marketing communications at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">7. Data Retention</h2>
          <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order information is retained for record-keeping purposes.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or our data practices, please <Link href="/contact" className="text-umber hover:underline">contact us</Link> or email hello@saacollection.com.</p>
        </section>
      </div>
    </div>
  );
}
