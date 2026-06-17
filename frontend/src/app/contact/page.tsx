"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", orderNumber: "", message: "", agreed: false,
  });

  const subjects = ["General Inquiry", "Order Issue", "Sizing Help", "Returns & Exchanges", "Collaboration", "Other"];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">Contact Us</span>
      </nav>

      <h1 className="font-display text-4xl md:text-5xl text-moss mb-8">Contact Us</h1>

      {/* Info Banner */}
      <div className="bg-parchment border border-moss/10 p-8 mb-12 rounded-sm">
        <p className="font-sans text-sm text-moss/80 leading-relaxed mb-4">
          We always love hearing from our customers! Please do not hesitate to contact us should you have any questions regarding our products and sizing recommendations or inquiries about your current order.
        </p>
        <p className="font-sans text-sm text-moss/80 leading-relaxed mb-4">
          Contact our customer care team through the contact form below, email us at <span className="text-umber font-medium">hello@saacollection.com</span>, or reach out via our social channels.
        </p>
        <p className="font-sans text-sm text-moss/80 leading-relaxed">
          We will aim to respond to you within 1-2 business days.
        </p>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mb-20">
        <div className="flex items-center gap-3 mb-8">
          <Mail className="w-5 h-5 text-umber" />
          <h2 className="font-display text-2xl text-moss">Write Us</h2>
        </div>

        <h3 className="font-display text-lg text-moss mb-6">Your Information</h3>

        <form className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-transparent border-b border-moss/20 py-3 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-transparent border-b border-moss/20 py-3 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors"
          />
          <select
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-transparent border-b border-moss/20 py-3 font-sans text-sm text-moss focus:outline-none focus:border-umber transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="text-moss/40">Subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Order Number"
            value={formData.orderNumber}
            onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
            className="w-full bg-transparent border-b border-moss/20 py-3 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors"
          />
          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="w-full bg-transparent border-b border-moss/20 py-3 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors resize-none"
          />

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreed}
              onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
              className="accent-umber mt-0.5"
            />
            <span className="font-sans text-xs text-moss/70">
              I have read and understood the Contact Us Privacy and Policy.
            </span>
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-12 py-4 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-parchment border border-moss/10 p-8 text-center rounded-sm">
          <MessageSquare className="w-6 h-6 text-umber mx-auto mb-4" />
          <h3 className="font-display text-xl text-moss mb-2">Chat With Us</h3>
          <p className="font-sans text-sm text-moss/70 mb-6">We are here and ready to chat</p>
          <button className="w-full py-3 border border-moss/20 font-sans text-xs uppercase tracking-widest text-moss hover:bg-umber hover:text-linen hover:border-umber transition-colors">
            Start Chat
          </button>
        </div>

        <div className="bg-parchment border border-moss/10 p-8 text-center rounded-sm">
          <Phone className="w-6 h-6 text-umber mx-auto mb-4" />
          <h3 className="font-display text-xl text-moss mb-2">Call Us</h3>
          <p className="font-sans text-sm text-moss/70 mb-6">We&apos;re here to talk to you</p>
          <a href="tel:+9771234567890" className="block w-full py-3 border border-moss/20 font-sans text-xs uppercase tracking-widest text-moss hover:bg-umber hover:text-linen hover:border-umber transition-colors">
            +977 1234567890
          </a>
        </div>

        <div className="bg-parchment border border-moss/10 p-8 text-center rounded-sm">
          <Mail className="w-6 h-6 text-umber mx-auto mb-4" />
          <h3 className="font-display text-xl text-moss mb-2">Email Us</h3>
          <p className="font-sans text-sm text-moss/70 mb-6">You are welcome to send us an email</p>
          <a href="mailto:hello@saacollection.com" className="block w-full py-3 border border-moss/20 font-sans text-xs uppercase tracking-widest text-moss hover:bg-umber hover:text-linen hover:border-umber transition-colors">
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
}
