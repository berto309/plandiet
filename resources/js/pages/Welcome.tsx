import React, {Component, useEffect, useState} from 'react';
import useScrollReveal from "@/hooks/useScrollReveal";
import MarketingNavbar from "@/layouts/Marketing/MarketingNavbar";
import Hero from "@/layouts/Marketing/Hero";
import Stats from "@/layouts/Marketing/Stats";
import ProblemSection from "@/layouts/Marketing/ProblemSection";
import Features from "@/layouts/Marketing/Features";
import HowItWorks from "@/layouts/Marketing/HowItWorks";
import Technology from "@/layouts/Marketing/Technology";
import Comparison from "@/layouts/Marketing/Comparison";
import FAQ from "@/layouts/Marketing/FAQ";
import MarketingFooter from "@/layouts/Marketing/Footer";
import FinalCTA from "@/layouts/Marketing/FinalCTA";
import ForPractitioners from "@/layouts/Marketing/ForPractioners";
import MarketingModal from "@/components/Modal/MarketingModal";
import {usePage} from "@inertiajs/react";




export default function Welcome() {
    const [authModal, setAuthModal] = useState<string | undefined>(undefined);
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
            <Hero onAuth={(tab) => setAuthModal(tab)} />
            <Stats />
            <ProblemSection />
            <Features />
            <HowItWorks />
            <ForPractitioners />
            <Technology />
            <Comparison />
            <FAQ />
            <FinalCTA onAuth={(tab) => setAuthModal(tab)} />
            <MarketingFooter />
            { authModal && <MarketingModal initialTab={authModal} onClose={() => setAuthModal(undefined)} /> }

            {showStt && (
                <button className="stt-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
            )}
        </div>
    );
}
