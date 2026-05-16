"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStoryStore } from "@/store/storyStore";

// ─────────────────────────────────────────
// 타입
// ─────────────────────────────────────────
interface Stage {
  label: string;
  text: string;
}

interface Story {
  title: string;
  stages: Stage[];
}

// ─────────────────────────────────────────
// 컴포넌트
// ─────────────────────────────────────────
export default function StoryPage() {
  const router = useRouter();
  const { place, name, activity, setStoryTitle, setStorySummary, setHomeActivity } = useStoryStore();

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);

  const hasBatchim = (n: string) => (n.charCodeAt(n.length - 1) - 0xAC00) % 28 !== 0;
  const nameWithParticle = name ? `${name}${hasBatchim(name) ? "이의" : "의"}` : "OO의";

  const loadingSteps = [
    { emoji: "🌱", message: `${nameWithParticle} 동화를 만들고 있어요 ✦` },
    { emoji: "📖", message: "이야기를 엮고 있어요 ✦" },
  ];

  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(() => {
      setLoadingIndex((i) => (i + 1) % loadingSteps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [loading]);

  // ── API 호출 ──
  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/story/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ place, name, activity }),
        });
        if (!res.ok) throw new Error("API 오류");
        const data = await res.json();
        setStory(data);
        setStoryTitle(data.title);
        setStorySummary(data.summary);
        setHomeActivity(data.home_activity);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, []);

  // 날짜 포맷
  const today = new Date();
  const dateStr = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  function goNext() {
    if (!story || animating) return;
    if (currentIndex === story.stages.length - 1) {
      setIsFinished(true);
      return;
    }
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setAnimating(false);
    }, 180);
  }

  function goPrev() {
    if (animating || currentIndex === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((i) => i - 1);
      setAnimating(false);
    }, 180);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setIsFinished(false);
  }

  // ── 로딩 화면 ──
  if (loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap');
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          .loading-emoji {
            animation: pulse 1.8s ease-in-out infinite;
          }
          .loading-message {
            transition: opacity 0.4s ease;
          }
        `}</style>
        <div style={{
          minHeight: "100vh",
          background: "#f7f4ee",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}>
          <span className="loading-emoji" style={{ fontSize: 56 }}>
            {loadingSteps[loadingIndex].emoji}
          </span>
          <p className="loading-message" style={{ fontFamily: "'Gowun Batang', serif", fontSize: 18, color: "#4a7c59", margin: 0 }}>
            {loadingSteps[loadingIndex].message}
          </p>
          <p style={{ fontSize: 13, color: "#a89e8e", margin: 0 }}>잠시만 기다려주세요</p>
        </div>
      </>
    );
  }

  // ── 에러 화면 ──
  if (error || !story) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap');`}</style>
        <div style={{
          minHeight: "100vh",
          background: "#f7f4ee",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: "0 24px",
          textAlign: "center",
        }}>
          <span style={{ fontSize: 48 }}>😔</span>
          <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: 18, color: "#2e2a22" }}>
            동화를 불러오지 못했어요
          </p>
          <button
            onClick={() => router.back()}
            style={{
              marginTop: 8,
              padding: "12px 32px",
              borderRadius: 24,
              border: "1.5px solid #d4cfc4",
              background: "#fff",
              fontSize: 14,
              color: "#6b6457",
              cursor: "pointer",
            }}
          >
            돌아가기
          </button>
        </div>
      </>
    );
  }

  // ── 정상 렌더 ──
  const totalStages = story.stages.length;
  const currentStage = story.stages[currentIndex];
  const isLastStage = currentIndex === totalStages - 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Noto+Sans+KR:wght@300;400&display=swap');

        .story-page {
          min-height: 100vh;
          background: #f7f4ee;
          font-family: 'Noto Sans KR', sans-serif;
        }
        .stage-card {
          transition: opacity 0.18s ease, transform 0.18s ease;
          opacity: 1;
          transform: translateY(0);
        }
        .stage-card.animating {
          opacity: 0;
          transform: translateY(8px);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .finish-screen {
          animation: fadeUp 0.5s ease forwards;
        }
        .stage-dot-btn:hover:not(.active-dot):not(.done-dot) {
          border-color: #9fc0a8 !important;
        }
      `}</style>

      <div className="story-page">
        <div style={{
          maxWidth: 520,
          margin: "0 auto",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "0 0 40px",
        }}>

          {/* ── 네비게이션 바 ── */}
          <nav style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 24px 0" }}>
            <button
              onClick={() => router.back()}
              style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1px solid #d4cfc4", background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#6b6457", fontSize: 16, flexShrink: 0,
              }}
              aria-label="뒤로 가기"
            >
              ←
            </button>
            <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: 14, color: "#8a8070" }}>
              오늘의 동화 만들기
            </span>
          </nav>

          {/* ── 메인 콘텐츠 ── */}
          <main style={{
            flex: 1, padding: "32px 24px 0",
            display: "flex", flexDirection: "column", gap: 24,
          }}>

            {/* ── 헤더: 날짜 + 제목 ── */}
            <header style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 14, color: "#a89e8e", letterSpacing: "0.04em" }}>
                {dateStr}
              </span>
              <h1 style={{
                fontFamily: "'Gowun Batang', serif",
                fontSize: 26, fontWeight: 700, color: "#2e2a22", lineHeight: 1.4,
                borderLeft: "3px solid #4a7c59", paddingLeft: 14, margin: 0,
              }}>
                {story.title}
              </h1>
            </header>

            {/* ── 단계 인디케이터 ── */}
            {!isFinished && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {story.stages.map((s, i) => {
                  const isDone = i < currentIndex;
                  const isActive = i === currentIndex;
                  return (
                    <Fragment key={i}>
                      <button
                        className={`stage-dot-btn ${isActive ? "active-dot" : ""} ${isDone ? "done-dot" : ""}`}
                        onClick={() => !animating && setCurrentIndex(i)}
                        style={{
                          width: 28, height: 28, borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Gowun Batang', serif",
                          fontSize: 12, fontWeight: 700,
                          border: isActive ? "1.5px solid #4a7c59" : isDone ? "1.5px solid #9fc0a8" : "1.5px solid #d4cfc4",
                          background: isActive ? "#4a7c59" : isDone ? "#e8f0eb" : "#fff",
                          color: isActive ? "#fff" : isDone ? "#5a8a6a" : "#b0a899",
                          cursor: "pointer", transition: "all 0.25s", flexShrink: 0,
                        }}
                        aria-label={`${i + 1} 단계`}
                      >
                        {i + 1}
                      </button>
                      {i < totalStages - 1 && (
                        <div style={{
                          flex: 1, height: 1,
                          background: i < currentIndex ? "#9fc0a8" : "#d4cfc4",
                          transition: "background 0.3s",
                        }} />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            )}

            {/* ── 동화 카드 ── */}
            {!isFinished && (
              <div
                className={`stage-card${animating ? " animating" : ""}`}
                style={{
                  background: "#fff", borderRadius: 20,
                  border: "1px solid #e8e2d8",
                  padding: "32px 28px 24px",
                  display: "flex", flexDirection: "column", gap: 16,
                  position: "relative", overflow: "hidden", minHeight: 220,
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: 3, background: "#4a7c59", borderRadius: "20px 20px 0 0",
                }} />
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontFamily: "'Gowun Batang', serif",
                  fontSize: 12, fontWeight: 700, color: "#4a7c59",
                  letterSpacing: "0.08em", background: "#eef5f0",
                  padding: "4px 12px", borderRadius: 20, width: "fit-content",
                }}>
                  ✦ {currentIndex + 1}/{totalStages}
                </span>
                <p style={{
                  fontFamily: "'Gowun Batang', serif",
                  fontSize: 18, color: "#2e2a22",
                  lineHeight: 1.95, wordBreak: "keep-all",
                  whiteSpace: "pre-line", flex: 1,
                }}>
                  {currentStage.text}
                </p>
                <span style={{
                  fontSize: 28, color: "#4a7c59", lineHeight: 1,
                  alignSelf: "flex-end", marginTop: "auto", userSelect: "none", opacity: 0.5,
                }} aria-hidden>
                  ✦
                </span>
              </div>
            )}

            {/* ── 완독 화면 ── */}
            {isFinished && (
              <div className="finish-screen" style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 12,
                padding: "32px 0 8px", textAlign: "center",
              }}>
                <span style={{ fontSize: 48 }} role="img" aria-label="꽃">🌸</span>
                <h2 style={{ fontFamily: "'Gowun Batang', serif", fontSize: 22, color: "#2e2a22", marginTop: 4 }}>
                  동화가 끝났어요
                </h2>
                <p style={{ fontSize: 13, color: "#a89e8e", lineHeight: 1.8 }}>
                  오늘 {name}의 하루가<br />소중한 동화 한 편이 되었어요.
                </p>
                <div style={{ display: "flex", gap: 10, marginTop: 16, width: "100%" }}>
                  <button
                    onClick={handleRestart}
                    style={{
                      flex: 1, height: 48, borderRadius: 24,
                      border: "1.5px solid #d4cfc4", background: "#fff",
                      fontSize: 14, color: "#6b6457", cursor: "pointer",
                      fontFamily: "'Noto Sans KR', sans-serif",
                    }}
                  >
                    다시 읽기
                  </button>
                  <Link href="/report" style={{
                    flex: 1, height: 48, borderRadius: 24,
                    background: "#4a7c59", color: "#fff", fontSize: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none", fontFamily: "'Noto Sans KR', sans-serif",
                  }}>
                    리포트 보기 →
                  </Link>
                </div>
              </div>
            )}

            {/* ── 이전 / 다음 버튼 ── */}
            {!isFinished && (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  style={{
                    width: 48, height: 48, borderRadius: "50%",
                    border: "1.5px solid #d4cfc4", background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: currentIndex === 0 ? "default" : "pointer",
                    color: "#6b6457", fontSize: 18,
                    opacity: currentIndex === 0 ? 0.3 : 1,
                    transition: "opacity 0.2s", flexShrink: 0,
                  }}
                  aria-label="이전 장면"
                >
                  ←
                </button>
                <button
                  onClick={goNext}
                  style={{
                    flex: 1, height: 52, borderRadius: 26, border: "none",
                    background: isLastStage ? "#c5a97a" : "#4a7c59",
                    color: "#fff", fontSize: 15, cursor: "pointer",
                    transition: "background 0.25s",
                    fontFamily: "'Noto Sans KR', sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  {isLastStage ? "동화 완성! ✦" : "다음 장면으로 →"}
                </button>
              </div>
            )}

          </main>
        </div>
      </div>
    </>
  );
}