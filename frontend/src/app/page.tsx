"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const weekDays = ["월", "화", "수", "목", "금", "토"];
  const completedDays = [true, false, true, true, true, false];
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);

  const recentStories = [
    { title: "나비를 처음 만난 날", sub: "어제 · 8분", emoji: "🦋" },
    { title: "당근밭의 여우", sub: "3일 전 · 6분", emoji: "🦊" },
    { title: "바닷속 친구들", sub: "5일 전 · 10분", emoji: "🐳" },
  ];

  return (
    <div style={{ backgroundColor: "#f7f7f4", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "100px 40px 60px" }}>

        {/* 히어로 섹션 */}
        <div style={{
          background: "linear-gradient(135deg, #7ab893 0%, #5a9e75 100%)",
          borderRadius: "24px",
          padding: "52px 60px",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          boxShadow: "0 8px 32px rgba(90,158,117,0.25)",
        }}>
          <div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "10px", letterSpacing: "0.5px" }}>
              2026. 5. 10. 일요일
            </p>
            <h1 style={{ fontSize: "32px", fontWeight: "600", color: "#fff", lineHeight: "1.4", marginBottom: "6px" }}>
              안녕하세요,<br />지우 부모님
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", marginTop: "12px" }}>
              오늘 아이의 하루를 동화로 만들어볼까요?
            </p>
          </div>
          <button
            onClick={() => router.push("/create")}
            style={{
              backgroundColor: "#fff",
              color: "#5a9e75",
              border: "none",
              borderRadius: "50px",
              padding: "14px 32px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              whiteSpace: "nowrap",
            }}>
            새 동화 만들기 →
          </button>
        </div>

        {/* 하단 2열 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "20px" }}>

          {/* 이번 주 동화 기록 */}
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "28px 32px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <span style={{ fontSize: "15px", fontWeight: "600", color: "#222" }}>이번 주 동화 기록</span>
                <span style={{
                  fontSize: "11px",
                  backgroundColor: "#fff0ec",
                  color: "#e07a5f",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontWeight: "500",
                }}>
                  3일 연속 🔥
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                {weekDays.map((day, i) => (
                  <div key={day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      backgroundColor: completedDays[i] ? "#7ab893" : "#f2f2f2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: completedDays[i] ? "0 4px 10px rgba(122,184,147,0.4)" : "none",
                    }}>
                      {completedDays[i] && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6.5 11.5L13 5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: "11px", color: "#bbb" }}>{day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{
                backgroundColor: "#f7f7f4",
                borderRadius: "12px",
                padding: "14px 18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "13px", color: "#888" }}>
                  이번 달 총 <strong style={{ color: "#222", fontWeight: "600" }}>18</strong>개 수집
                </span>
                <span style={{ fontSize: "12px", color: "#5a9e75", fontWeight: "500", cursor: "pointer" }}>전체 기록 →</span>
              </div>
              <div style={{
                backgroundColor: "#f0f8f3",
                borderRadius: "12px",
                padding: "14px 18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "13px", color: "#888" }}>
                  이번 주 <strong style={{ color: "#222", fontWeight: "600" }}>4</strong>개 완성
                </span>
                <span style={{ fontSize: "12px", color: "#5a9e75", fontWeight: "500" }}>목표 6개</span>
              </div>
            </div>
          </div>

          {/* 최근 동화 */}
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "28px 32px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <span style={{ fontSize: "15px", fontWeight: "600", color: "#222" }}>최근 동화</span>
              <span style={{ fontSize: "12px", color: "#5a9e75", fontWeight: "500", cursor: "pointer" }}>전체보기 →</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {recentStories.map((story, i) => (
                <div
                  key={story.title}
                  onMouseEnter={() => setHoveredStory(i)}
                  onMouseLeave={() => setHoveredStory(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    borderRadius: "14px",
                    backgroundColor: hoveredStory === i ? "#f0f8f3" : "transparent",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: hoveredStory === i ? "#7ab893" : "#f2f2f2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      transition: "background 0.2s",
                    }}>
                      {story.emoji}
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "500", color: "#222", marginBottom: "3px" }}>{story.title}</p>
                      <p style={{ fontSize: "12px", color: "#bbb" }}>{story.sub}</p>
                    </div>
                  </div>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: hoveredStory === i ? "#7ab893" : "#f2f2f2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M3.5 2L8 5.5L3.5 9" stroke={hoveredStory === i ? "white" : "#bbb"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}