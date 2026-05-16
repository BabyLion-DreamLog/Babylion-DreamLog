"use client";

import Navbar from "@/components/Navbar";
import { Gowun_Batang } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { useStoryStore } from "@/store/storyStore";

const gowunBatang = Gowun_Batang({ subsets: ["latin"], weight: "400" });

function hasBatchim(name: string): boolean {
  const code = name.charCodeAt(name.length - 1);
  return (code - 0xAC00) % 28 !== 0;
}

function p(name: string, withBatchim: string, withoutBatchim: string): string {
  return hasBatchim(name) ? withBatchim : withoutBatchim;
}

function getDialogues(name: string): string[] {
  return [
    "오늘 가장 신기했던 건 뭐야? 그때 어떤 느낌이 들었어?",
    `${name}${p(name, "은", "는")} 오늘 동화에서 어떤 장면이 제일 좋았어?`,
    `${name}${p(name, "이라면", "라면")} 동화 주인공한테 뭐라고 말해줄 것 같아?`,
    "오늘 동화 결말이 마음에 들었어? 다르게 바꾼다면 어떻게 할 것 같아?",
    `동화 속 주인공이랑 ${name}${p(name, "이랑", "랑")} 어떤 점이 비슷한 것 같아?`,
    "오늘 동화에서 가장 용감한 순간은 어디였던 것 같아?",
    "오늘 동화를 친구한테 소개해준다면 뭐라고 할 것 같아?",
    `${name}${p(name, "은", "는")} 오늘 하루 중에 가장 기억에 남는 게 뭐야?`,
    `오늘 동화 주인공이 겪은 일이랑 비슷한 일이 ${name}한테도 있었어?`,
    `${name}${p(name, "이", "가")} 오늘 가장 잘했다고 생각하는 게 뭐야?`,
  ];
}

const weekendActivities = [
  "오늘 동화 주인공처럼 역할극 해보기",
  "점토로 오늘 동화에 나온 것 만들어보기",
  "동화 속 장면 그림으로 그려보기",
  "가족이랑 함께 도서관 가서 좋아하는 책 골라보기",
  "동네 산책하면서 오늘 동화 이야기 나눠보기",
  "동화 제목으로 나만의 책 표지 그려보기",
  "오늘 동화를 인형이나 장난감으로 재연해보기",
  "가족끼리 돌아가며 동화 한 장면씩 이어서 말하기",
  "아이가 직접 동화 결말을 바꿔서 얘기해보기",
  "동화 속 주인공에게 편지 써보기",
];

export default function ReportPage() {
  const { name, duration, voice, storyTitle, storySummary, homeActivity } = useStoryStore();
  const dateStr = new Date().toLocaleDateString("ko-KR", {
    year: "numeric", month: "long", day: "numeric", weekday: "long",
  });

  const [dialogue, setDialogue] = useState("");
  const [weekendActivity, setWeekendActivity] = useState("");

  useEffect(() => {
    const list = getDialogues(name || "OO");
    setDialogue(list[Math.floor(Math.random() * list.length)]);
    setWeekendActivity(weekendActivities[Math.floor(Math.random() * weekendActivities.length)]);
  }, [name]);

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
            <p style={{ fontSize: "17px", color: "#426b36", marginBottom: "14px", letterSpacing: "0.5px", fontWeight: "500" }}>
              {dateStr}
            </p>
            <p style={{ fontSize: "17px", color: "#6b7765", marginBottom: "10px" }}>
              오늘의 동화 리포트
            </p>
            <h1
              className={gowunBatang.className}
              style={{ fontSize: "30px", color: "#1f2a1a", lineHeight: "1.55", margin: 0 }}
            >
              {name}{p(name || "OO", "이", "")}의 하루는<br />이런 동화가 되었어요
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{
              display: "flex",
              gap: "20px",
              color: "#6b7765",
              fontSize: "14px",
            }}>
              <span>⏱ {duration}분</span>
              <span>💬 4번 대화</span>
              <span>🎙 {voice}</span>
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
              <span style={{ fontSize: "16px", color: "#426b36", fontWeight: "600" }}>오늘의 동화 요약</span>
            </div>

            {storyTitle && (
              <p className={gowunBatang.className} style={{ fontSize: "24px", fontWeight: "700", color: "#1f2a1a", margin: "0 0 12px" }}>
                {storyTitle}
              </p>
            )}
            <div style={{ borderLeft: "3px solid #426b36", paddingLeft: "18px" }}>
              <p
                className={gowunBatang.className}
                style={{ fontSize: "18px", color: "#3e4a37", lineHeight: "1.9", margin: 0 }}
              >
                {storySummary || "유치원에서 만난 노란 나비를 따라\n지우가 꽃밭으로 떠난 작은 모험"}
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
              <p style={{ fontSize: "14px", color: "#6b7765", fontWeight: "500", margin: 0 }}>이야기 정보</p>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", color: "#6b7765" }}>소요 시간</span>
                  <span style={{ fontSize: "15px", color: "#3e4a37", fontWeight: "500" }}>⏱ {duration}분</span>
                </div>
                <div style={{ width: "1px", backgroundColor: "#ede9e0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", color: "#6b7765" }}>대화 수</span>
                  <span style={{ fontSize: "15px", color: "#3e4a37", fontWeight: "500" }}>💬 4번</span>
                </div>
                <div style={{ width: "1px", backgroundColor: "#ede9e0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", color: "#6b7765" }}>읽어준 사람</span>
                  <span style={{ fontSize: "15px", color: "#3e4a37", fontWeight: "500" }}>🎙 {voice}</span>
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
                    <span style={{ fontSize: "12px", color: "#e89b7a", fontWeight: "500" }}>🎨 가정 활동 추천</span>
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: "600", color: "#000", margin: "0 0 5px" }}>
                    {homeActivity?.title ?? "나비에게 그림 편지 보내기"}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
                    {homeActivity?.description ?? "관찰력과 표현력을 함께 기르는 활동"}
                  </p>
                </div>
                <div style={{
                  width: "64px",
                  height: "64px",
                  background: homeActivity?.color ?? "#FFD6B0",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  flexShrink: 0,
                }}>
                  {homeActivity?.emoji ?? "🦋"}
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
                  {homeActivity?.tip ?? "오늘 만난 나비한테 그림 그려줄까? 어떤 꽃을 좋아할 것 같아?"}
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
                  {dialogue}
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
                  {weekendActivity}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
