
export   function ReviewRow({ label, value, wide }: any) {
    return (
        <div className={`flex justify-between gap-3 ${wide ? "col-span-2" : ""}`}>
            <span style={{ color: "var(--color-sage-400)" }}>{label}</span>
            <span className="font-medium text-right" style={{ color: "var(--color-sage-700)" }}>
        {value || "—"}
      </span>
        </div>
    );
}

