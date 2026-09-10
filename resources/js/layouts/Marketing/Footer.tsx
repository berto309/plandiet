import {C} from "@/support/const";
import {usePage} from "@inertiajs/react";

export default function MarketingFooter() {
    type Listings = string[]
    type Row = [string, Listings]
    const rows:Row[] = [
        ["Platform", ["For Practitioners", "For Clients", "Features", "Pricing"]],
        ["Clinical", ["Conditions supported", "Template library", "Evidence sources", "Verification process"]],
        ["Company", ["About PlanDiet", "Research", "Contact", "Careers"]],
        ["Legal", ["Privacy policy", "Terms of service", "GDPR statement", "Cookie policy"]],
    ];

    const {app} = usePage().props

    return (
        <footer style={{ padding: "3.5rem 0", background: C.charcoal, borderTop: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
                <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8">
                    <div>
                        <div className="display" style={{ fontSize: "1.25rem", marginBottom: 8, fontWeight: 500, color: "rgba(134,239,172,.7)" }}>PlanDiet</div>
                        <p style={{ fontSize: ".75rem", fontWeight: 300, lineHeight: 1.6, color: "rgba(255,255,255,.25)" }}>Your clinical rules, every client's daily meals</p>
                    </div>
                    {rows.map(([heading, items]) => (
                        <div key={heading}>
                            <div style={{ fontSize: ".7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(255,255,255,.2)", marginBottom: "0.75rem" }}>{heading}</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {items.map(item => <div key={item} style={{ fontSize: ".75rem", fontWeight: 300, color: "rgba(255,255,255,.35)", cursor: "pointer" }}>{item}</div>)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:flex lg:items-center lg:justify-between border-t border-white/6 pt-6">
                    <div style={{ fontSize: ".75rem", fontWeight: 300, color: "rgba(255,255,255,.2)" }}>© { new Date().getFullYear() } {app.name} Ltd. All rights reserved.</div>
                    <div className="flex lg:flex-col flex-row gap-4 text-xs font-light text-white/20">
                        <span>HCPC Partner</span><span>·</span><span>NHS Compatible</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
