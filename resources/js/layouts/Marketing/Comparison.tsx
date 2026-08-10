import {C} from "@/support/const";

export default function Comparison() {

    type Row = [string, boolean, boolean | "~", boolean]

    const rows: Row[] = [
        ["Practitioner-verified clinical rules", true, false, false],
        ["Formal hard-constraint enforcement (100%)", true, false, false],
        ["HCPC/AND register verification", true, false, false],
        ["Per-meal explainability trace", true, "~", false],
        ["Between-appointment compliance dashboard", true, false, false],
        ["Personalised cultural cuisine preferences", true, "~", true],
        ["Rule change audit trail", true, false, false],
        ["Rule sandbox pre-testing", true, false, false],
    ];

    const renderTick = (v: (boolean | "~")) => {
        if (v === true) return <span style={{ color: C.forestLight, fontWeight: "bold", fontSize: "1.1rem" }}>✓</span>;
        if (v === false) return <span style={{ color: "#d1d5db", fontSize: "1.1rem" }}>✗</span>;
        return <span style={{ color: C.gold, fontSize: "1.1rem" }}>~</span>;
    };

    return (
        <section style={{ padding: "5rem 0", background: C.ivoryWarm }}>
            <div style={{ maxWidth: 896, margin: "0 auto", padding: "0 2rem" }}>
                <div className="sr" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <div className="overline-text" style={{ color: C.forest, marginBottom: "0.75rem" }}>How PlanDiet compares</div>
                    <h2 className="section-lg display" style={{ color: C.charcoal }}>Not all nutrition AI is equal</h2>
                </div>
                <div className="sr-scale" style={{ background: "white", borderRadius: "1.5rem", border: "1px solid rgba(31,94,31,.1)", overflow: "hidden" }}>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                            <tr style={{ background: C.forest }}>
                                <th style={{ textAlign: "left", padding: "1rem 1.5rem", fontWeight: 500, color: "white" }}>Capability</th>
                                <th style={{ textAlign: "center", padding: "1rem 1.25rem", fontWeight: 600, color: "white" }}>PlanDiet</th>
                                <th style={{ textAlign: "center", padding: "1rem 1.25rem", fontWeight: 300, color: "rgba(255,255,255,.5)" }}>Generic AI</th>
                                <th style={{ textAlign: "center", padding: "1rem 1.25rem", fontWeight: 300, color: "rgba(255,255,255,.5)" }}>Consumer apps</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows.map(([cap, ...vals]: Row) => (
                                <tr key={cap} style={{ borderBottom: "1px solid rgba(31,94,31,.06)" }}>
                                    <td style={{ padding: "14px 24px", fontWeight: 300, color: C.muted, fontSize: ".875rem" }}>{cap}</td>
                                    {vals.map((v, i) => (
                                        <td key={i} style={{ textAlign: "center", padding: "14px 20px" }}>{renderTick(v)}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
