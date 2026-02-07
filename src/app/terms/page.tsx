import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { FileText, Scale, UserX, AlertTriangle, Ban, Globe, Gavel, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | NepalRemit",
  description: "Read NepalRemit's terms of service and user agreement.",
};

const sections = [
  { id: "acceptance", title: "Acceptance of Terms", icon: FileText },
  { id: "use-license", title: "Use License", icon: Scale },
  { id: "user-obligations", title: "User Obligations", icon: UserX },
  { id: "disclaimer", title: "Disclaimer", icon: AlertTriangle },
  { id: "limitations", title: "Limitations", icon: Ban },
  { id: "governing-law", title: "Governing Law", icon: Globe },
  { id: "modifications", title: "Modifications", icon: Gavel },
  { id: "contact", title: "Contact", icon: Mail },
];

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Terms & Conditions
              </h1>
              <p className="text-lg text-white/80">
                Please read these terms carefully before using our services.
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
                  {/* Acceptance of Terms */}
                  <section id="acceptance" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">1. Acceptance of Terms</h2>
                    </div>
                    <p>
                      By accessing and using NepalRemit (&quot;the Service&quot;), you accept and agree to be bound by the
                      terms and provisions of this agreement. If you do not agree to abide by these terms, please do
                      not use this service.
                    </p>
                    <p>
                      These Terms of Service apply to all users of the site, including without limitation users who
                      are browsers, vendors, customers, merchants, and/or contributors of content.
                    </p>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* Use License */}
                  <section id="use-license" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-secondary-100 flex items-center justify-center">
                        <Scale className="h-5 w-5 text-secondary-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">2. Use License</h2>
                    </div>
                    <p>
                      Permission is granted to temporarily access the materials on NepalRemit&apos;s website for personal,
                      non-commercial transitory viewing only. This is the grant of a license, not a transfer of title,
                      and under this license you may not:
                    </p>
                    <ul>
                      <li>Modify or copy the materials</li>
                      <li>Use the materials for any commercial purpose</li>
                      <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                      <li>Remove any copyright or other proprietary notations from the materials</li>
                      <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
                    </ul>
                    <p>
                      This license shall automatically terminate if you violate any of these restrictions and may be
                      terminated by NepalRemit at any time.
                    </p>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* User Obligations */}
                  <section id="user-obligations" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-accent-100 flex items-center justify-center">
                        <UserX className="h-5 w-5 text-accent-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">3. User Obligations</h2>
                    </div>
                    <p>As a user of this service, you agree to:</p>
                    <ul>
                      <li>Provide accurate and complete information when creating an account</li>
                      <li>Maintain the security of your account credentials</li>
                      <li>Notify us immediately of any unauthorized use of your account</li>
                      <li>Not use the service for any illegal or unauthorized purpose</li>
                      <li>Not attempt to interfere with the proper functioning of the service</li>
                      <li>Comply with all applicable laws and regulations</li>
                    </ul>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* Disclaimer */}
                  <section id="disclaimer" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">4. Disclaimer</h2>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                      <p className="m-0 text-red-800">
                        <strong>Important:</strong> The materials on NepalRemit&apos;s website are provided on an &apos;as is&apos;
                        basis. NepalRemit makes no warranties, expressed or implied, and hereby disclaims and negates
                        all other warranties.
                      </p>
                    </div>
                    <p>
                      Exchange rates and fees displayed on our platform are for informational purposes only. While we
                      strive to provide accurate and up-to-date information, we cannot guarantee the accuracy of rates
                      at the time of your actual transaction.
                    </p>
                    <p>
                      NepalRemit is a comparison platform and does not directly provide remittance or banking
                      services. We are not responsible for the services, policies, or practices of any third-party
                      providers listed on our platform.
                    </p>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* Limitations */}
                  <section id="limitations" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <Ban className="h-5 w-5 text-orange-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">5. Limitation of Liability</h2>
                    </div>
                    <p>
                      In no event shall NepalRemit or its suppliers be liable for any damages (including, without
                      limitation, damages for loss of data or profit, or due to business interruption) arising out of
                      the use or inability to use the materials on NepalRemit&apos;s website.
                    </p>
                    <p>
                      This limitation applies even if NepalRemit or an authorized representative has been notified
                      orally or in writing of the possibility of such damage.
                    </p>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* Governing Law */}
                  <section id="governing-law" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">6. Governing Law</h2>
                    </div>
                    <p>
                      These terms and conditions are governed by and construed in accordance with the laws of Nepal,
                      and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                    </p>
                    <p>
                      Any disputes arising from or relating to these terms shall be resolved through binding
                      arbitration in Kathmandu, Nepal, in accordance with the Arbitration Act of Nepal.
                    </p>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* Modifications */}
                  <section id="modifications" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                        <Gavel className="h-5 w-5 text-purple-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">7. Modifications</h2>
                    </div>
                    <p>
                      NepalRemit may revise these terms of service at any time without notice. By using this website
                      you are agreeing to be bound by the then current version of these terms of service.
                    </p>
                    <p>
                      We will make reasonable efforts to notify users of significant changes through email or a
                      prominent notice on our website.
                    </p>
                  </section>

                  <hr className="my-8 border-neutral-200" />

                  {/* Contact */}
                  <section id="contact" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-pink-100 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-pink-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-900 m-0">8. Contact Us</h2>
                    </div>
                    <p>
                      If you have any questions about these Terms and Conditions, please contact us:
                    </p>
                    <div className="bg-neutral-50 rounded-xl p-6 mt-4">
                      <p className="m-0">
                        <strong>NepalRemit Legal Team</strong>
                        <br />
                        Email:{" "}
                        <a href="mailto:legal@nepremit.com" className="text-primary-600">
                          legal@nepremit.com
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
                    href="/privacy"
                    className="flex-1 p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all text-center"
                  >
                    <span className="text-sm text-neutral-500">Also read</span>
                    <span className="block font-semibold text-neutral-900">Privacy Policy</span>
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
