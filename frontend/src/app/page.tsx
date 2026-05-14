import Navbar from "@/components/Navbar";

export default function Home() {
  const weekDays = ["월", "화", "수", "목", "금", "토"];
  const completedDays = [true, false, true, true, true, false];

  return (
    <div style={{ backgroundColor: "#f5f5f0", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "90px 40px 60px" }}>

        {/* 인사 + 오늘 밤의 동화 카드 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>

          {/* 인사 영역 */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: "14px", color: "#888", marginBottom: "8px" }}>
              2026. 5. 10. 일요일
            </p>
            <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#222", lineHeight: "1.5", marginBottom: "0" }}>
              안녕하세요,<br />
              <span style={{ color: "#5a9e75" }}>지우 부모님</span>
            </h1>
          </div>

          {/* 오늘 밤의 동화 카드 */}
          <div style={{
            backgroundColor: "#7ab893",
            borderRadius: "16px",
            padding: "28px",
          }}>
            <span style={{
              fontSize: "11px",
              backgroundColor: "rgba(255,255,255,0.25)",
              color: "#fff",
              padding: "3px 10px",
              borderRadius: "20px",
              display: "inline-block",
              marginBottom: "12px",
            }}>
              오늘 밤의 동화
            </span>
            <p style={{ fontSize: "20px", fontWeight: "500", color: "#fff", lineHeight: "1.5", marginBottom: "6px" }}>
              오늘 우리 아이의<br />하루를 들려주세요
            </p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "20px" }}>
              한 줄이면 충분해요
            </p>
            <button style={{
              backgroundColor: "#fff",
              color: "#5a9e75",
              border: "none",
              borderRadius: "20px",
              padding: "8px 20px",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
            }}>
              새 동화 만들기 →
            </button>
          </div>
        </div>

        {/* 이번 주 동화 기록 + 최근 동화 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

          {/* 이번 주 동화 기록 */}
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "15px", fontWeight: "500", color: "#222" }}>이번 주 동화 기록</span>
              <span style={{
                fontSize: "11px",
                backgroundColor: "#fff0ec",
                color: "#e07a5f",
                padding: "3px 10px",
                borderRadius: "20px",
              }}>
                3일 연속 기록 중
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              {weekDays.map((day, i) => (
                <div key={day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: completedDays[i] ? "#7ab893" : "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {completedDays[i] && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L6.5 11.5L13 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: "12px", color: "#999" }}>{day}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "0.5px solid #f0f0f0" }}>
              <span style={{ fontSize: "13px", color: "#888" }}>
                이번 달 총 <strong style={{ color: "#222" }}>18</strong>개의 동화 수집
              </span>
              <span style={{ fontSize: "13px", color: "#5a9e75", cursor: "pointer" }}>전체 기록 &gt;</span>
            </div>
          </div>

          {/* 최근 동화 */}
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "15px", fontWeight: "500", color: "#222" }}>최근 동화</span>
              <span style={{ fontSize: "13px", color: "#888", cursor: "pointer" }}>전체보기 &gt;</span>
            </div>

            {[
              { title: "나비를 처음 만난 날", sub: "어제 · 8분" },
              { title: "당근밭의 여우", sub: "3일 전 · 6분" },
              { title: "바닷속 친구들", sub: "5일 전 · 10분" },
            ].map((story) => (
              <div key={story.title} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "0.5px solid #f5f5f5",
              }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: "500", color: "#222", marginBottom: "3px" }}>{story.title}</p>
                  <p style={{ fontSize: "12px", color: "#aaa" }}>{story.sub}</p>
                </div>
                <div style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  backgroundColor: "#7ab893",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4 2.5L9 6L4 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}