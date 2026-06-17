import Link from "next/link";

export const metadata = {
  title: "Terms of Service | SAA Collection",
  description: "Read the Terms of Service for SAA Collection's website and online store.",
};

export default function TermsPage() {
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">Terms of Service</span>
      </nav>

      <h1 className="font-display text-4xl md:text-5xl text-moss mb-4">Terms of Service</h1>
      <p className="font-sans text-xs text-moss/50 mb-12">Last updated: June 2026</p>

      <div className="space-y-10 font-sans text-sm text-moss/80 leading-relaxed">
        <section>
          <h2 className="font-display text-xl text-moss mb-4">1. Introduction</h2>
          <p>Welcome to SAA Collection. These Terms of Service govern your use of our website (saacollection.com) and your purchase of products from our online store. By accessing or using our website, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">2. Products & Pricing</h2>
          <p className="mb-3">All products listed on our website are subject to availability. We reserve the right to modify or discontinue any product at any time without notice. Prices are listed in Nepalese Rupees (NPR) and are subject to change. All prices include applicable taxes unless otherwise stated.</p>
          <p>Product images are for illustrative purposes. Due to the handmade nature of our items, slight variations in color, texture, and dimensions may occur. These variations are not defects but are part of what makes each SAA piece unique.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">3. Orders & Payment</h2>
          <p className="mb-3">By placing an order, you are making an offer to purchase. We reserve the right to accept or decline any order. Once your order is confirmed, you will receive a confirmation email with your order details.</p>
          <p>Payment must be made at the time of purchase through our accepted payment methods. We do not store your payment card information on our servers.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">4. Shipping & Delivery</h2>
          <p>Please refer to our <Link href="/shipping" className="text-umber hover:underline">Shipping Information</Link> page for detailed shipping policies, delivery timelines, and costs. We are not responsible for delays caused by shipping carriers, customs, or force majeure events.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">5. Returns & Refunds</h2>
          <p>Please refer to our <Link href="/returns" className="text-umber hover:underline">Returns & Refunds</Link> page for our complete return policy, eligibility conditions, and refund process.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">6. Intellectual Property</h2>
          <p>All content on this website — including but not limited to text, images, graphics, logos, designs, and code — is the intellectual property of SAA Collection and is protected by copyright and trademark laws. You may not reproduce, distribute, or use any content without our prior written consent.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">7. Limitation of Liability</h2>
          <p>SAA Collection shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our total liability for any claim shall not exceed the amount paid for the product giving rise to the claim.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">8. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of Nepal. Any disputes shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-moss mb-4">9. Contact</h2>
          <p>For questions about these terms, please <Link href="/contact" className="text-umber hover:underline">contact us</Link> or email hello@saacollection.com.</p>
        </section>
      </div>
    </div>
  );
}
