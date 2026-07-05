import Link from "next/link";

export default function HomePage() {
    return (
        <div className="h-screen bg-[#f5ecdf] flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
                <div className="text-center flex flex-col gap-3">
                    <p className="text-xs font-black tracking-widest uppercase text-[#16a34a]">CaliX</p>
                    <h1 className="text-5xl font-black tracking-tight text-[#1c1917] leading-tight">
                        Train smarter.<br />Move better.
                    </h1>
                    <p className="text-[#846f5c] text-base max-w-sm mx-auto mt-1">
                        Real-time form analysis powered by your camera. No equipment needed.
                    </p>
                </div>

                <div className="w-full max-w-sm flex flex-col gap-3">
                    <Link
                        href="/pushups"
                        className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-base py-4 rounded-xl transition-all duration-150 shadow-[0_10px_30px_-10px_rgba(22,163,74,0.5)] hover:shadow-[0_10px_35px_-8px_rgba(22,163,74,0.65)] text-center"
                    >
                        Pushup Analyzer
                    </Link>
                </div>
            </div>
        </div>
    );
}

export function Navbar() {
    return (
        <nav className="w-full px-6 py-4 flex items-center gap-6 border-b border-[#e6dcc9]">
            <Link href="/" className="text-[#1c1917] font-black tracking-tight text-lg hover:text-[#16a34a] transition-colors">CaliX</Link>
            <Link href="/pushups" className="text-sm font-semibold text-[#846f5c] hover:text-[#16a34a] transition-colors">Pushups</Link>
        </nav>
    );
}
