import {C} from "@/support/const";

export default function Stats() {
    const conditions = ["Type 2 Diabetes","Hypertension","High Cholesterol","CKD","IBS · Low FODMAP","Nut Allergy","PCOS","Coeliac Disease","Shellfish Allergy","Lactose Intolerance","Weight Management","Muscle Gain"];
    return (
        <section style={{ background: C.charcoal, padding: "3.5rem 0", overflow: "hidden" }}>
            <div style={{ position: "relative", marginBottom: "2.5rem", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 48, zIndex: 10, background: `linear-gradient(to right,${C.charcoal},transparent)` }} />
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 48, zIndex: 10, background: `linear-gradient(to left,${C.charcoal},transparent)` }} />
                <div className="marquee-track">
                    {[...conditions, ...conditions].map((c, i) => (
                        <span key={i} className="pill-dark" style={{ marginRight: "1.5rem" }}>{c}</span>
                    ))}
                </div>
            </div>
            <div className="mx-auto grid max-w-[1152px] lg:grid-cols-4 grid-cols-2 gap-8 px-8 text-center">
                {[
                    { value: "1k+", label: "Active users" },
                    { value: "50k+", label: "Meals generated" },
                    { value: "0%", label: "Hard-rule violations" },
                    { value: "148", label: "Verified practitioners" },
                ].map(({ value, label }) => (
                    <div key={label} className="sr">
                        <div className="display" style={{ fontSize: "clamp(2.5rem,4vw,3.75rem)", fontWeight: 300, color: C.forestPale, marginBottom: 8 }}>{value}</div>
                        <div className="overline-text" style={{ color: "rgba(255,255,255,.25)" }}>{label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
