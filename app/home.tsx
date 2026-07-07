import Link from "next/link";

const features = [
    {
        title: "Real-time feedback",
        body: "Your camera analyzes every rep as it happens and calls out depth and body alignment instantly — no waiting, no video review.",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 2 4.5 13.5H12l-1 8.5L19.5 10.5H12l1-8.5Z" />
        ),
    },
    {
        title: "Automatic rep counting",
        body: "Every clean rep is detected and tallied for you. Focus on the work while CaliX keeps an honest count.",
        icon: (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h11M9 12h11M9 18h11" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h.01M4 12h.01M4 18h.01" />
            </>
        ),
    },
    {
        title: "Form scoring",
        body: "Elbow depth and hip alignment are graded on every rep, so you know exactly what to fix before the next set.",
        icon: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l4-4" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
            </>
        ),
    },
];

const steps = [
    { n: "1", title: "Get in frame", body: "Set your phone or laptop where it can see your full body from the side." },
    { n: "2", title: "Start moving", body: "Hit start and begin your set. CaliX locks onto your body in real time." },
    { n: "3", title: "Improve every rep", body: "Read the live feedback, fix your form, and watch your reps get cleaner." },
];

const roadmap = [
    { title: "Pull-ups & dips", body: "Full upper-body coverage — bar and parallette movements with the same live form grading." },
    { title: "Squats & lunges", body: "Lower-body tracking with depth and knee-alignment cues to keep every rep safe." },
    { title: "Plank & hold timing", body: "Automatic timers for static holds, with alerts the moment your form starts to break." },
    { title: "Progress history", body: "Every session saved so you can watch your reps, depth, and form scores climb over time." },
    { title: "Personal records & streaks", body: "Celebrate new bests and keep your daily streak alive to stay consistent." },
    { title: "Guided routines", body: "Full-body workouts that string exercises together and coach you set by set." },
];

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#f5ecdf] flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="flex flex-col items-center text-center px-6 pt-20 pb-16">
                <p className="text-xs font-black tracking-widest uppercase text-[#16a34a] mb-4">
                    AI-powered form coach
                </p>
                <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[#1c1917] leading-[1.05] max-w-3xl">
                    Perfect your form.<br />Rep after rep.
                </h1>
                <p className="text-[#846f5c] text-lg max-w-xl mx-auto mt-6">
                    CaliX turns any camera into a personal calisthenics coach — tracking your
                    body, counting your reps, and grading your form in real time. No equipment,
                    no subscriptions, no guesswork.
                </p>
                <div className="flex flex-col items-center gap-3 mt-9">
                    <Link
                        href="/pushups"
                        className="bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-base px-9 py-4 rounded-xl transition-all duration-150 shadow-[0_10px_30px_-10px_rgba(22,163,74,0.5)] hover:shadow-[0_10px_35px_-8px_rgba(22,163,74,0.65)]"
                    >
                        Try the Pushup Analyzer
                    </Link>
                    <span className="text-[#a89984] text-sm">Free · Runs in your browser · Nothing uploaded</span>
                </div>
            </section>

            {/* Features */}
            <section className="px-6 pb-20">
                <div className="max-w-5xl mx-auto grid gap-5 sm:grid-cols-3">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="bg-[#fbf7ef] border border-[#e6dcc9] rounded-2xl p-6 flex flex-col gap-4"
                        >
                            <div className="w-11 h-11 rounded-xl bg-[#16a34a]/10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6 text-[#16a34a]">
                                    {f.icon}
                                </svg>
                            </div>
                            <h3 className="text-[#1c1917] font-bold text-lg tracking-tight">{f.title}</h3>
                            <p className="text-[#846f5c] text-sm leading-relaxed">{f.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="px-6 pb-20 border-t border-[#e6dcc9] pt-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-xs font-black tracking-widest uppercase text-[#16a34a] mb-3">How it works</p>
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1c1917]">
                            Three steps to better reps
                        </h2>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-3">
                        {steps.map((s) => (
                            <div key={s.n} className="flex flex-col gap-3">
                                <span className="text-5xl font-black text-[#16a34a]/25 leading-none">{s.n}</span>
                                <h3 className="text-[#1c1917] font-bold text-lg tracking-tight">{s.title}</h3>
                                <p className="text-[#846f5c] text-sm leading-relaxed">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Roadmap */}
            <section className="px-6 pb-20 border-t border-[#e6dcc9] pt-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-xs font-black tracking-widest uppercase text-[#16a34a] mb-3">On the roadmap</p>
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1c1917]">
                            Where CaliX is headed
                        </h2>
                        <p className="text-[#846f5c] text-base max-w-xl mx-auto mt-4">
                            Pushups are just the start. Here&apos;s what we&apos;re building next.
                        </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {roadmap.map((r) => (
                            <div
                                key={r.title}
                                className="border border-dashed border-[#d9ccb4] rounded-2xl p-6 flex flex-col gap-3"
                            >
                                <span className="self-start text-[10px] font-bold uppercase tracking-[0.15em] text-[#16a34a] bg-[#16a34a]/10 rounded-full px-2.5 py-1">
                                    Coming soon
                                </span>
                                <h3 className="text-[#1c1917] font-bold text-lg tracking-tight">{r.title}</h3>
                                <p className="text-[#846f5c] text-sm leading-relaxed">{r.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="px-6 pb-24">
                <div className="max-w-3xl mx-auto bg-[#1c1917] rounded-3xl px-8 py-14 text-center shadow-[0_30px_60px_-25px_rgba(0,0,0,0.4)]">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                        Your next set starts now
                    </h2>
                    <p className="text-white/60 text-base max-w-md mx-auto mt-4">
                        Open the analyzer, get in frame, and let CaliX coach you through every rep.
                    </p>
                    <Link
                        href="/pushups"
                        className="inline-block mt-8 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-base px-9 py-4 rounded-xl transition-all duration-150 shadow-[0_10px_30px_-10px_rgba(22,163,74,0.6)]"
                    >
                        Start training
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto border-t border-[#e6dcc9] px-6 py-6">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <span className="text-[#1c1917] font-black tracking-tight">CaliX</span>
                    <span className="text-[#a89984] text-sm">Train smarter. Move better.</span>
                </div>
            </footer>
        </div>
    );
}

export function Navbar() {
    return (
        <nav className="w-full px-6 py-4 flex items-center gap-6 border-b border-[#e6dcc9]">
            <Link href="/" className="text-[#1c1917] font-black tracking-tight text-lg hover:text-[#16a34a] transition-colors">CaliX</Link>
            <Link href="/pushups" className="text-sm font-semibold text-[#0f766e] hover:text-[#16a34a] transition-colors">Pushups</Link>
            {["Pullups", "Dips", "Squats"].map((label) => (
                <span
                    key={label}
                    className="group relative text-sm font-semibold text-[#9a8a72] cursor-not-allowed"
                >
                    {label}
                    <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1c1917] px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        Coming soon
                    </span>
                </span>
            ))}
        </nav>
    );
}
