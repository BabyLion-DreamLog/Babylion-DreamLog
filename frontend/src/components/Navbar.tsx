export default function Navbar() {
    return (
      <nav style={{
        width: "100%",
        backgroundColor: "#fff",
        borderBottom: "0.5px solid #eee",
        padding: "0 40px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
      }}>
        {/* 로고 */}
        <span style={{ fontSize: "18px", fontWeight: "500", color: "#5a9e75" }}>
          드림로그
        </span>
  
        {/* 메뉴 */}
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["홈", "내 책장", "리포트"].map((menu) => (
            <span key={menu} style={{
              fontSize: "14px",
              color: menu === "홈" ? "#5a9e75" : "#888",
              cursor: "pointer",
              fontWeight: menu === "홈" ? "500" : "400",
            }}>
              {menu}
            </span>
          ))}
        </div>
  
        {/* 동화 만들기 버튼 */}
        <button style={{
          backgroundColor: "#7ab893",
          color: "#fff",
          border: "none",
          borderRadius: "20px",
          padding: "8px 20px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}>
          + 새 동화 만들기
        </button>
      </nav>
    );
  }