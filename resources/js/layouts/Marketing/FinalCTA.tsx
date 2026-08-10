import {C} from "@/support/const";
import {Link} from "@inertiajs/react";

interface FinalCTAProp {
    onAuth: (action: string) => void
}
export default function FinalCTA({ onAuth }: FinalCTAProp) {
    return (
        <section style={{ padding: "6rem 0", background: C.charcoal, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 30% 50%,rgba(45,122,45,.12),transparent 60%),radial-gradient(ellipse at 70% 50%,rgba(200,148,30,.06),transparent 60%)" }} />
            <div className="sr" style={{ maxWidth: 896, margin: "0 auto", padding: "0 2rem", textAlign: "center", position: "relative", zIndex: 10 }}>
                <div className="overline-text" style={{ color: "rgba(134,239,172,.4)", marginBottom: "1.5rem" }}>Ready to begin?</div>
                <h2 className="section-xl display" style={{ color: "white", marginBottom: "1.25rem" }}>
                    Transform how you deliver <em style={{ fontStyle: "italic", color: "rgba(134,239,172,.8)" }}>clinical nutrition care</em>
                </h2>
                <p style={{ fontSize: "clamp(1.05rem,1.5vw,1.25rem)", lineHeight: 1.75, fontWeight: 300, color: "rgba(255,255,255,.45)", marginBottom: "2.5rem", maxWidth: 640, margin: "0 auto 2.5rem" }}>
                    Join verified practitioners using PlanDiet to give every client personalised, safe, clinically governed nutrition — between every appointment, every day.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: "1.75rem" }}>
                    <Link href="/register" className="btn-shimmer" style={{ color: "white", fontWeight: 500, padding: "1rem 2.5rem", borderRadius: 999, fontSize: ".875rem", boxShadow: "0 4px 24px rgba(31,94,31,.4)" }}>Apply as a Practitioner →</Link>
                    <a href="#how-it-works" style={{ fontSize: ".875rem", fontWeight: 300, padding: "1rem 2.5rem", borderRadius: 999, border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.55)", textDecoration: "none" }}>How it works</a>
                </div>
                <p style={{ fontSize: ".75rem", fontWeight: 300, color: "rgba(255,255,255,.2)" }}>HCPC / AfN verified · 2-3 business day review · No credit card required</p>
            </div>
        </section>
    );
}
