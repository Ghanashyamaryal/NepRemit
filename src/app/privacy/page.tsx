import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Shield, Lock, Eye, Database, Cookie, UserCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | NepalRemit",
  description:
    "Read NepalRemit's privacy policy to understand how we collect, use, and protect your personal information.",
};

const sections = [
  { id: "introduction", title: "Introduction", icon: Shield },
  { id: "information-collected", title: "Information We Collect", icon: Database },
  { id: "how-we-use", title: "How We Use Information", icon: Eye },
  { id: "data-sharing", title: "Data Sharing", icon: UserCheck },
  { id: "cookies", title: "Cookie Policy", icon: Cookie },
  { id: "user-rights", title: "Your Rights", icon: Lock },
  { id: "contact", title: "Contact Us", icon: Mail },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-white/80">
                Your privacy is important to us. This policy explains how we handle your data.
              </p>
              <p className="text-sm text-white/60 mt-4">
                Last updated: February 1, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Table of Contents - Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                  <h2 className="font-semibold text-neutral-900 mb-4">Contents</h2>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600 py-1.5 transition-colors"
                      >
                        <section.icon className="h-4 w-4" />
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                <article className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm prose prose-neutral max-w-none">
                  {/* Introduction */}
                  <section id="introduction" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">Introduction</h2>
                    </div>
                    <p>
                      Welcome to NepalRemit (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy
                      and ensuring you have a positive experience on our website. This Privacy Policy explains how we
                      collect, use, disclose, and safeguard your information when you visit our website nepremit.com.
                    </p>
                    <p>
                      Please read this privacy policy carefully. If you do not agree with the terms of this privacy
                      policy, please do not access the site.
                    </p>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* Information We Collect */}
                  <section id="information-collected" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-secondary-100 flex items-center justify-center">
                        <Database className="h-5 w-5 text-secondary-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">Information We Collect</h2>
                    </div>
                    <p>We may collect information about you in a variety of ways:</p>

                    <h3 className="text-lg font-semibold mt-6">Personal Data</h3>
                    <p>
                      When you register on our site, subscribe to our newsletter, or fill out a form, you may be asked
                      to enter your:
                    </p>
                    <ul>
                      <li>Name and email address</li>
                      <li>Phone number</li>
                      <li>Country of residence</li>
                      <li>Preferred currencies for comparison</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-6">Derivative Data</h3>
                    <p>
                      Our servers automatically collect information when you access the site, such as your IP address,
                      browser type, operating system, access times, and the pages you have viewed directly before and
                      after accessing the site.
                    </p>

                    <h3 className="text-lg font-semibold mt-6">Financial Data</h3>
                    <p>
                      We do not collect or store any financial information such as bank account numbers or payment card
                      details. All rate comparisons are for informational purposes only.
                    </p>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* How We Use Information */}
                  <section id="how-we-use" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-accent-100 flex items-center justify-center">
                        <Eye className="h-5 w-5 text-accent-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">How We Use Your Information</h2>
                    </div>
                    <p>We may use the information we collect from you to:</p>
                    <ul>
                      <li>Personalize your experience and deliver content relevant to your interests</li>
                      <li>Improve our website based on your feedback</li>
                      <li>Send periodic emails regarding rate alerts you&apos;ve subscribed to</li>
                      <li>Respond to your inquiries and provide customer service</li>
                      <li>Process transactions and send related information</li>
                      <li>Monitor and analyze usage trends to improve user experience</li>
                      <li>Compile anonymous statistical data for research purposes</li>
                    </ul>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* Data Sharing */}
                  <section id="data-sharing" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <UserCheck className="h-5 w-5 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">Data Sharing</h2>
                    </div>
                    <p>We may share information we have collected about you in certain situations:</p>

                    <h3 className="text-lg font-semibold mt-6">Third-Party Service Providers</h3>
                    <p>
                      We may share your information with third parties that perform services for us, including payment
                      processing, data analysis, email delivery, hosting services, and customer service.
                    </p>

                    <h3 className="text-lg font-semibold mt-6">Business Transfers</h3>
                    <p>
                      If we undergo a merger, acquisition, or sale of all or a portion of our assets, your information
                      may be transferred as part of that transaction.
                    </p>

                    <h3 className="text-lg font-semibold mt-6">Legal Requirements</h3>
                    <p>
                      We may disclose your information if required by law or in response to valid requests by public
                      authorities.
                    </p>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* Cookie Policy */}
                  <section id="cookies" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <Cookie className="h-5 w-5 text-orange-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">Cookie Policy</h2>
                    </div>
                    <p>
                      We use cookies and similar tracking technologies to track activity on our website and hold
                      certain information. Cookies are files with a small amount of data which may include an anonymous
                      unique identifier.
                    </p>
                    <p>We use the following types of cookies:</p>
                    <ul>
                      <li>
                        <strong>Essential Cookies:</strong> Required for the website to function properly
                      </li>
                      <li>
                        <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website
                      </li>
                      <li>
                        <strong>Preference Cookies:</strong> Remember your settings and preferences
                      </li>
                    </ul>
                    <p>
                      You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                    </p>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* User Rights */}
                  <section id="user-rights" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                        <Lock className="h-5 w-5 text-purple-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">Your Rights</h2>
                    </div>
                    <p>You have the right to:</p>
                    <ul>
                      <li>Access the personal data we hold about you</li>
                      <li>Request correction of inaccurate data</li>
                      <li>Request deletion of your data</li>
                      <li>Object to processing of your data</li>
                      <li>Request data portability</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                    <p>
                      To exercise these rights, please contact us using the information provided below.
                    </p>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* Contact */}
                  <section id="contact" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-pink-100 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-pink-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">Contact Us</h2>
                    </div>
                    <p>
                      If you have questions or comments about this Privacy Policy, please contact us at:
                    </p>
                    <div className="bg-neutral-50 rounded-xl p-6 mt-4">
                      <p className="m-0">
                        <strong>NepalRemit</strong>
                        <br />
                        Email:{" "}
                        <a href="mailto:privacy@nepremit.com" className="text-primary-600">
                          privacy@nepremit.com
                        </a>
                        <br />
                        Address: Kathmandu, Nepal
                      </p>
                    </div>
                  </section>
                </article>

                {/* Related Links */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/terms"
                    className="flex-1 p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all text-center"
                  >
                    <span className="text-sm text-neutral-500">Also read</span>
                    <span className="block font-semibold text-neutral-900">Terms & Conditions</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all text-center"
                  >
                    <span className="text-sm text-neutral-500">Need help?</span>
                    <span className="block font-semibold text-neutral-900">Contact Us</span>
                  </Link>
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
