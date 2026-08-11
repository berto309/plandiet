import {useEffect, useRef, useState} from "react";
import {C} from "@/support/const";
import {Link, usePage} from "@inertiajs/react";

interface MarketingNavbarProp {
    onAuth: (action: string) => void
}

export default function Navbar({ onAuth }: MarketingNavbarProp) {
    const [stuck, setStuck] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const headerRef = useRef(null);
    const {app} = usePage().props
    const {url} = usePage()

    const NAV_LINKS = [
        { href: "#problem", label: `Why ${app.name}` },
        { href: "#features", label: "Features" },
        { href: "#how-it-works", label: "How it works" },
        { href: "#for-practitioners", label: "For practitioners" },
        { href: "#technology", label: "Technology" },
        { href: "#faq", label: "FAQ" },
    ];

    useEffect(() => {

        document.addEventListener('click',(e:any)=>{
            const nav2=document.getElementById('nav')!;
            if(!nav2.contains(e.target)) document.getElementById('mobileMenu')?.classList.add('hidden');
        });

        // const onClick = (e:any) => {
        //     if (headerRef.current && !headerRef.current.contains(e.target)) setMobileOpen(false);
        // };
        // document.addEventListener("click", onClick);
        // return () => document.removeEventListener("click", onClick);

        const onScroll = () => setStuck(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);



    const handleNavClick = (e:any, href:any) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
    };
    function toggleNav(){
        const m=document.getElementById('mobileMenu')!;
        m.classList.toggle('hidden');
    }


    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
            style={{
                background: stuck ? "rgba(249,245,236,.92)" : "transparent",
                backdropFilter: stuck ? "blur(20px)" : "none",
                borderColor: stuck ? "rgba(31,94,31,.1)" : "transparent",
            }}

        >
            <div className="max-w-7xl px-5 sm:px-8 flex items-center justify-between h-16 sm:h-[68px]" style={{margin: "0 auto"}}>
                <Link href="/" className="font-display text-xl font-medium tracking-tight" style={{ color: "var(--forest)" }}>
                    {app.name}
                </Link>

                <nav className="hidden lg:flex items-center gap-7">
                    {NAV_LINKS.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={(e) => handleNavClick(e, l.href)}
                            className={`nav-a text-[.82rem] font-normal transition-colors ${url.startsWith('/register') ? 'hidden' : ''}`}
                            style={{ color: "var(--muted)" }}
                            onMouseOver={(e) => (e.currentTarget.style.color = "var(--charcoal)")}
                            onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-3">
                    <button
                        onClick={() => onAuth("signin")}
                        className="text-sm font-medium px-4 py-2 rounded-full transition-colors"
                        style={{ color: "var(--muted)" }}
                        onMouseOver={(e) => (e.currentTarget.style.color = "var(--charcoal)")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
                    >
                        Sign in
                    </button>
                    <Link href="/register" className="btn-shimmer" style={{ color: "white", fontWeight: 500, fontSize: ".875rem", padding: "1rem 2rem", borderRadius: 999, boxShadow: "0 4px 16px rgba(31,94,31,.3)" }}>
                        Get started free
                    </Link>
                </div>

                <button className="lg:hidden p-2" style={{ color: "var(--forest)" }} onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {mobileOpen && (
                <div className="lg:hidden" style={{ background: "rgba(249,245,236,.98)", borderTop: "1px solid rgba(31,94,31,.1)" }}>
                    <div className="px-5 py-4 space-y-1">
                        {NAV_LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                onClick={(e) => handleNavClick(e, l.href)}
                                className={`block py-3 text-sm font-medium ${url.startsWith('/register') ? 'hidden' : ''}`}
                                style={{ color: "var(--muted)", padding: "5px" }}

                            >
                                {l.label}
                            </a>
                        ))}
                        <div className="pt-3 border-t flex flex-col gap-2" style={{ borderColor: "rgba(31,94,31,.1)", marginTop: "5px", padding: "5px" }}>
                            <button
                                onClick={() => {
                                    onAuth("signin");
                                    setMobileOpen(false);
                                }}
                                className="btn-shimmer" style={{ color: "white", fontWeight: 500, fontSize: ".875rem", padding: "1rem 2rem", borderRadius: 999, boxShadow: "0 4px 16px rgba(31,94,31,.3)" }}
                            >
                                Sign in
                            </button>
                            <button
                                onClick={() => {
                                    onAuth("signup");
                                    setMobileOpen(false);
                                }}
                                className="btn-shimmer" style={{ color: "white", fontWeight: 500, fontSize: ".875rem", padding: "1rem 2rem", borderRadius: 999, boxShadow: "0 4px 16px rgba(31,94,31,.3)" }}
                            >
                                Get started free
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
