"use client";

import Navbar from "@/components/Navbar";
import { Gowun_Batang } from "next/font/google";

const gowunBatang = Gowun_Batang({ subsets: ["latin"], weight: "400" });

export default function ReportPage() {
  return (
    <div style={{ backgroundColor: "#fdfcf8", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "100px 40px 60px" }}>

        {/* 페이지 헤더 */}
        <div style={{
          background: "linear-gradient(135deg, #eef5eb 0%, #e3efe0 100%)",
          borderRadius: "24px",
          padding: "28px 36px",
          marginBottom: "28px",
          boxShadow: "0 4px 20px rgba(66,107,54,0.10)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}>
          <div>
            <p style={{ fontSize: "13px", color: "#426b36", marginBottom: "14px", letterSpacing: "0.5px", fontWeight: "500" }}>
              2026. 5. 10. 일요일
            </p>
            <p style={{ fontSize: "13px", color: "#6b7765", marginBottom: "10px" }}>
              오늘의 동화 리포트
            </p>
            <h1
              className={gowunBatang.className}
              style={{ fontSize: "30px", color: "#1f2a1a", lineHeight: "1.55", margin: 0 }}
            >
              지우의 하루는<br />이런 동화가 되었어요
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{
              display: "flex",
              gap: "20px",
              color: "#6b7765",
              fontSize: "14px",
            }}>
              <span>⏱ 8분</span>
              <span>💬 4번 대화</span>
              <span>🎙 엄마 목소리</span>
            </div>
          </div>
        </div>

        {/* 메인 2열 그리드 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "20px" }}>

          {/* 왼쪽: 동화 요약 */}
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "32px 36px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#426b36" }} />
              <span style={{ fontSize: "14px", color: "#426b36", fontWeight: "600" }}>오늘의 동화 요약</span>
            </div>

            <div style={{ borderLeft: "3px solid #426b36", paddingLeft: "18px" }}>
              <p
                className={gowunBatang.className}
                style={{ fontSize: "16px", color: "#3e4a37", lineHeight: "1.9", margin: 0 }}
              >
                유치원에서 만난 노란 나비를 따라<br />
                지우가 꽃밭으로 떠난 작은 모험
              </p>
            </div>

            <div style={{
              backgroundColor: "#fdfcf8",
              borderRadius: "12px",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              border: "1px solid #ede9e0",
            }}>
              <p style={{ fontSize: "12px", color: "#6b7765", fontWeight: "500", margin: 0 }}>이야기 정보</p>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "11px", color: "#6b7765" }}>소요 시간</span>
                  <span style={{ fontSize: "13px", color: "#3e4a37", fontWeight: "500" }}>⏱ 8분</span>
                </div>
                <div style={{ width: "1px", backgroundColor: "#ede9e0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "11px", color: "#6b7765" }}>대화 수</span>
                  <span style={{ fontSize: "13px", color: "#3e4a37", fontWeight: "500" }}>💬 4번</span>
                </div>
                <div style={{ width: "1px", backgroundColor: "#ede9e0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "11px", color: "#6b7765" }}>읽어준 사람</span>
                  <span style={{ fontSize: "13px", color: "#3e4a37", fontWeight: "500" }}>🎙 엄마 목소리</span>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 활동 추천 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* 가정 활동 추천 카드 */}
            <div style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "28px 32px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
                <div>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor: "#fdf5ef",
                    borderRadius: "20px",
                    padding: "4px 12px",
                    marginBottom: "12px",
                  }}>
                    <span style={{ fontSize: "12px", color: "#e89b7a", fontWeight: "500" }}>🎨 가정 활동 추천 · 10분</span>
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: "600", color: "#000", margin: "0 0 5px" }}>
                    나비에게 그림 편지 보내기
                  </h3>
                  <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
                    관찰력과 표현력을 함께 기르는 활동
                  </p>
                </div>
                <div style={{
                  width: "64px",
                  height: "64px",
                  background: "radial-gradient(circle at 60% 40%, #ffe0c8 0%, #ffb07a 50%, #f4845f 100%)",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  flexShrink: 0,
                }}>
                  🦋
                </div>
              </div>

              <div style={{
                backgroundColor: "#fdfcf8",
                borderRadius: "12px",
                padding: "16px 18px",
                border: "1px solid #ede9e0",
              }}>
                <p style={{ fontSize: "12px", color: "#ec7d4e", fontWeight: "600", margin: "0 0 6px" }}>
                  이렇게 시작해보세요
                </p>
                <p style={{ fontSize: "13px", color: "#1f2a1a", lineHeight: "1.7", margin: 0 }}>
                  "오늘 만난 노란 나비한테 그림 그려줄까? 어떤 꽃을 좋아할 것 같아?"
                </p>
              </div>
            </div>

            {/* 하단 2열: 추천 대화 + 주말 활동 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

              <div style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                padding: "24px 22px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontSize: "22px", marginBottom: "12px" }}>💬</div>
                <p style={{ fontSize: "12px", color: "#426b36", fontWeight: "600", margin: "0 0 10px" }}>
                  오늘의 추천 대화
                </p>
                <p style={{ fontSize: "12px", color: "#1f2a1a", lineHeight: "1.7", margin: 0 }}>
                  "오늘 가장 신기했던 건 뭐야?<br />
                  그때 어떤 느낌이 들었어?"
                </p>
              </div>

              <div style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                padding: "24px 22px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontSize: "22px", marginBottom: "12px" }}>🌿</div>
                <p style={{ fontSize: "12px", color: "#426b36", fontWeight: "600", margin: "0 0 10px" }}>
                  이번 주말 활동 추천
                </p>
                <p style={{ fontSize: "12px", color: "#1f2a1a", lineHeight: "1.7", margin: 0 }}>
                  근처 공원에서 곤충 찾기<br />
                  나만의 &apos;나비 도감&apos; 만들기
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
