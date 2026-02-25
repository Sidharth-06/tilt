import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-cyan-100 selection:text-cyan-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-[#f8fafc]/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-cyan-400 text-white font-bold text-lg">
              T
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Tilt</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#product" className="text-sm font-medium text-slate-600 hover:text-slate-900">Product</Link>
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900">Pricing</Link>
            <Link href="#resources" className="text-sm font-medium text-slate-600 hover:text-slate-900">Resources</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Log in</Link>
            <Link href="/signup" className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-500 shadow-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 mb-6 border border-cyan-100">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              <span className="text-xs font-semibold text-cyan-600 tracking-wide uppercase">New: Stripe Integration 2.0</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Run your own affiliate program <br />
              <span className="text-cyan-400 italic">in minutes</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl">
              Launch, manage, and scale your referral programs with ease. Built for modern SaaS companies who value speed and reliability.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/signup" className="rounded-md bg-cyan-400 px-6 py-3 text-base font-medium text-white transition-all hover:bg-cyan-500 hover:shadow-lg hover:-translate-y-0.5 shadow-md">
                Start free trial
              </Link>
              <button className="rounded-md bg-white border border-slate-200 px-6 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50">
                View Demo
              </button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-50 bg-slate-200"></div>
                ))}
              </div>
              <span className="text-sm text-slate-500">Joined by 1,000+ growing companies</span>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-400 p-8 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full rounded-xl bg-white shadow-lg overflow-hidden flex flex-col">
                <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                </div>
                <div className="flex-1 p-6 relative">
                  <div className="w-3/4 h-8 bg-slate-100 rounded mb-6"></div>
                  <div className="flex gap-4 items-end h-40">
                    {[40, 70, 45, 90, 65, 80, 55, 100, 75, 40, 60, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-cyan-200 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos */}
        <section className="py-12 border-y border-slate-200/50">
          <p className="text-center text-xs font-semibold tracking-widest text-slate-400 uppercase mb-8">Trusted by fast-growing companies</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale items-center grayscale hover:grayscale-0 transition-all">
            <div className="h-8 w-24 bg-slate-300 rounded"></div>
            <div className="h-8 w-24 bg-slate-300 rounded"></div>
            <div className="h-8 w-24 bg-slate-300 rounded"></div>
            <div className="h-8 w-24 bg-slate-300 rounded"></div>
            <div className="h-8 w-24 bg-slate-300 rounded"></div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Everything you need to grow your affiliate network</h2>
            <p className="text-lg text-slate-600">Stop managing spreadsheets. Tilt provides the automation tools you need to build a high-performance referral engine.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Auto-payouts</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Pay your affiliates automatically via Stripe or PayPal. Set custom thresholds and schedules without lifting a finger.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Seamless Integrations</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Connect with Stripe, Paddle, or Lemon Squeezy in seconds. No complex coding required to get started.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Analytics</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Track every click, conversion, and commission in real-time. Make data-driven decisions to optimize your program.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-600">Everything you need to run your affiliate program. No hidden fees, no complexity. Scale your revenue today.</p>

            <div className="mt-8 inline-flex bg-slate-100 p-1 rounded-full items-center">
              <button className="px-6 py-2 rounded-full text-sm font-medium bg-white shadow-sm text-slate-900">Monthly</button>
              <button className="px-6 py-2 rounded-full text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-2">
                Yearly <span className="text-[10px] font-bold bg-cyan-100 text-cyan-600 px-2 py-0.5 rounded-full">SAVE 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Starter</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-slate-900">$0</span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <p className="text-slate-500 text-sm mb-6">Perfect for individuals getting started with affiliate programs.</p>

              <ul className="space-y-4 mb-8">
                {['Up to 10 affiliates', 'Unlimited referrals', 'Basic analytics dashboard', 'Standard payouts'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg bg-slate-50 text-slate-900 font-semibold hover:bg-slate-100 transition-colors">Get Started</button>
            </div>

            {/* Growth */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-cyan-400 relative scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Growth</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-slate-900">$29</span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <p className="text-slate-500 text-sm mb-6">Best for growing businesses with active communities.</p>

              <ul className="space-y-4 mb-8">
                {['Up to 100 affiliates', 'Custom tracking domains', 'Advanced reporting', 'Priority email support', 'Stripe & PayPal integration'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg bg-cyan-400 text-white font-semibold hover:bg-cyan-500 transition-colors shadow-md">Get Started</button>
            </div>

            {/* Scale */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Scale</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-slate-900">$99</span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <p className="text-slate-500 text-sm mb-6">Advanced tools for established enterprise networks.</p>

              <ul className="space-y-4 mb-8">
                {['Unlimited affiliates', 'White-label portal', 'Full API access', 'Dedicated account manager', 'Custom contracts'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg bg-slate-50 text-slate-900 font-semibold hover:bg-slate-100 transition-colors">Get Started</button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Can I change plans later?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">Yes, you can upgrade or downgrade your plan at any time from your dashboard settings.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Is there a free trial?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">Our Starter plan is free forever for up to 10 affiliates. For Growth and Scale, we offer a 14-day money-back guarantee.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Do you handle payouts?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">We provide the data and integrations to automate payouts through Stripe, PayPal, or Wise.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">What is white-labeling?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">The Scale plan allows you to remove Tilt branding and use your own domain and custom CSS for the affiliate portal.</p>
            </div>
          </div>
        </section>

        {/* CTA Block */}
        <section className="py-24">
          <div className="bg-[#111e25] rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to grow your revenue?</h2>
              <p className="text-lg text-slate-300 mb-10">Join 1,000+ businesses who trust Tilt to manage their affiliate programs.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup" className="w-full sm:w-auto rounded-md bg-cyan-400 px-8 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:bg-cyan-300 shadow-lg">
                  Get started for free
                </Link>
                <button className="w-full sm:w-auto rounded-md bg-transparent border border-slate-600 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-slate-800">
                  Talk to sales
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-6">No credit card required • 14-day free trial</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-12 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-cyan-400 text-white font-bold text-xs">
              T
            </div>
            <span className="font-bold text-slate-900">Tilt</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-slate-900">Product</Link>
            <Link href="#" className="hover:text-slate-900">Company</Link>
            <Link href="#" className="hover:text-slate-900">Support</Link>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Tilt Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
