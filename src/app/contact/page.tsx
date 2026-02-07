"use client";

import * as React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  HelpCircle,
} from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Button } from "@/components/atoms/Button";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@nepremit.com",
    href: "mailto:support@nepremit.com",
    color: "primary",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977-1-4XXXXXX",
    href: "tel:+977-1-4XXXXXX",
    color: "secondary",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Kathmandu, Nepal",
    href: "#map",
    color: "accent",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Sun-Fri: 9AM - 6PM",
    href: null,
    color: "pink",
  },
];

const subjects = [
  { value: "", label: "Select a subject" },
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "feedback", label: "Feedback / Suggestion" },
  { value: "press", label: "Press / Media" },
  { value: "other", label: "Other" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/nepremit", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/nepremit", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/nepremit", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/nepremit", label: "LinkedIn" },
];

export default function ContactPage() {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-16 md:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
          </div>

          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
              <p className="text-lg text-white/80 max-w-xl mx-auto">
                Have questions about remittance rates or need help? We&apos;re here to assist you.
              </p>
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
              <path
                d="M0 80L60 72C120 64 240 48 360 42.7C480 37 600 43 720 48C840 53 960 59 1080 56C1200 53 1320 43 1380 37.3L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
                className="fill-neutral-50"
              />
            </svg>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-8 -mt-8 relative z-10">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div
                    className={`inline-flex items-center justify-center h-10 w-10 rounded-lg mb-3 ${
                      info.color === "primary"
                        ? "bg-primary-100"
                        : info.color === "secondary"
                        ? "bg-secondary-100"
                        : info.color === "accent"
                        ? "bg-accent-100"
                        : "bg-pink-100"
                    }`}
                  >
                    <info.icon
                      className={`h-5 w-5 ${
                        info.color === "primary"
                          ? "text-primary-600"
                          : info.color === "secondary"
                          ? "text-secondary-600"
                          : info.color === "accent"
                          ? "text-accent-600"
                          : "text-pink-600"
                      }`}
                    />
                  </div>
                  <div className="text-xs text-neutral-500 mb-1">{info.label}</div>
                  {info.href ? (
                    <a href={info.href} className="text-sm font-medium text-neutral-900 hover:text-primary-600">
                      {info.value}
                    </a>
                  ) : (
                    <div className="text-sm font-medium text-neutral-900">{info.value}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">Send us a message</h2>
                  <p className="text-neutral-600 mb-6">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary-100 mb-4">
                        <CheckCircle className="h-8 w-8 text-secondary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">Message Sent!</h3>
                      <p className="text-neutral-600 mb-6">
                        Thank you for reaching out. We&apos;ll respond to your inquiry soon.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1.5">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                        >
                          {subjects.map((subject) => (
                            <option key={subject.value} value={subject.value}>
                              {subject.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* FAQ Link */}
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                      <HelpCircle className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 mb-1">Check our FAQs</h3>
                      <p className="text-sm text-neutral-600 mb-3">
                        Find quick answers to common questions about remittance rates and our platform.
                      </p>
                      <Link
                        href="/faqs"
                        className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        View FAQs
                        <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                  <h3 className="font-bold text-neutral-900 mb-4">Follow Us</h3>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                        title={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Map Placeholder */}
                <div id="map" className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                  <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                      <p className="text-sm text-neutral-500">Map will be displayed here</p>
                      <p className="text-xs text-neutral-400 mt-1">Kathmandu, Nepal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
