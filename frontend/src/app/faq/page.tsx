"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I contact your customer service?",
    answer: "Our SAA Collection customer service team is available Monday through Friday, 10 AM - 6 PM NPT. You can reach us via email at hello@saacollection.com (preferred and our fastest response), via our social media channels, or through the contact form on our website. We will make sure to get back to you within 24 business hours."
  },
  {
    question: "When will my order ship?",
    answer: "Orders are typically processed within 1-2 business days. Once shipped, you will receive a confirmation email with tracking information. Domestic orders within Nepal usually arrive within 3-5 business days. International orders may take 7-14 business days depending on the destination."
  },
  {
    question: "Can I cancel or modify my order?",
    answer: "We understand that plans change! If you need to cancel or modify your order, please contact us within 12 hours of placing it. Once an order has been shipped, we are unable to make modifications. You can, however, initiate a return once you receive your items."
  },
  {
    question: "What are my shipping options?",
    answer: "We offer free standard shipping on all orders within Nepal. For international orders, we provide express courier shipping with estimated delivery times provided at checkout. All shipments are carefully packaged to ensure your items arrive in perfect condition."
  },
  {
    question: "What type of payment methods do you offer?",
    answer: "We accept major credit and debit cards (Visa, Mastercard), eSewa, Khalti, bank transfers, and cash on delivery for orders within the Kathmandu Valley. International orders can be processed through credit cards and online payment gateways."
  },
  {
    question: "Which size will fit me best?",
    answer: "We offer product and body measurements on each of our product pages. Just click on 'Size Guide' to find your best fit. Measuring guides are included. If you're between sizes, we generally recommend sizing up for a more comfortable fit, especially for our corset-style dresses."
  },
  {
    question: "How do I take care of my SAA pieces?",
    answer: "Each SAA garment comes with specific care instructions on its label. In general, we recommend hand washing or dry cleaning for our dresses, storing jewelry in the provided pouch away from moisture, and keeping skincare products in a cool, dry place. Proper care ensures your pieces last beautifully for years."
  },
  {
    question: "Where and how do you manufacture your products?",
    answer: "All SAA Collection pieces are designed and crafted in Kathmandu, Nepal. Our dresses are handmade by skilled local artisans. Our skincare is formulated with natural, locally-sourced botanical ingredients. Our jewelry is crafted using traditional Nepali metalwork and pearl-setting techniques."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes! We ship worldwide. International shipping rates and estimated delivery times are calculated at checkout based on your destination. All customs duties and taxes are the responsibility of the customer and are not included in the shipping cost."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 14-day return policy for unworn, unwashed items in their original packaging with all tags attached. Skincare products can only be returned if unopened and sealed. Please visit our Returns page for the full policy and instructions on how to initiate a return."
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">FAQs</span>
      </nav>

      <h1 className="font-display text-4xl md:text-5xl text-moss mb-12">FAQs</h1>

      <div className="divide-y divide-moss/10">
        {faqs.map((faq, idx) => (
          <div key={idx}>
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex justify-between items-center py-6 text-left group"
            >
              <h2 className={`font-display text-lg pr-8 transition-colors ${openIndex === idx ? "text-umber" : "text-moss group-hover:text-umber"}`}>
                {faq.question}
              </h2>
              {openIndex === idx ? (
                <Minus className="w-5 h-5 text-umber shrink-0" />
              ) : (
                <Plus className="w-5 h-5 text-moss/50 shrink-0 group-hover:text-umber transition-colors" />
              )}
            </button>
            {openIndex === idx && (
              <div className="pb-6 pr-12">
                <p className="font-sans text-sm text-moss/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-parchment p-10 text-center rounded-sm">
        <h3 className="font-display text-2xl text-moss mb-4">Still have questions?</h3>
        <p className="font-sans text-sm text-moss/70 mb-6">We&apos;re here to help. Reach out to our team directly.</p>
        <Link href="/contact" className="inline-block px-10 py-4 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors duration-300">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
