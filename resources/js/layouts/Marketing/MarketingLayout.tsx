import React, {Component, ReactNode, useEffect, useState} from 'react';
import useScrollReveal from "@/hooks/useScrollReveal";
import MarketingNavbar from "@/layouts/Marketing/MarketingNavbar";
import MarketingFooter from "@/layouts/Marketing/Footer";
import MarketingModal from "@/components/Modal/MarketingModal";




export default function MarketingLayout({children}: {children: ReactNode}) {

    const [showStt, setShowStt] = useState(false);

    useScrollReveal();

    useEffect(() => {
        const onScroll = () => setShowStt(window.scrollY > 400);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);

    }, []);
    return (
        <div className="mealai-root">
            <style>
                {`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`}
            </style>
            <MarketingNavbar onAuth={(tab) => setAuthModal(tab)} />

            {children}

            <MarketingFooter />
            { authModal && <MarketingModal initialTab={authModal} onClose={() => setAuthModal(undefined)} /> }

            {showStt && (
                <button className="stt-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
            )}
        </div>
    );
}
