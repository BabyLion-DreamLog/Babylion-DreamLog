export default function Navbar() {
  return (
    <nav style={{
      width: "100%",
      backgroundColor: "#fff",
      borderBottom: "0.5px solid #eee",
      padding: "0 60px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
      boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
    }}>
      <span style={{ fontSize: "20px", fontWeight: "700", color: "#426b36", letterSpacing: "-0.5px" }}>
        DreamLog
      </span>

      <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
        {["홈", "내 책장", "리포트"].map((menu) => (
          <span key={menu} style={{
            fontSize: "14px",
            color: menu === "홈" ? "#426b36" : "#6b7765",
            cursor: "pointer",
            fontWeight: menu === "홈" ? "600" : "400",
          }}>
            {menu}
          </span>
        ))}
      </div>
    </nav>
  );
}