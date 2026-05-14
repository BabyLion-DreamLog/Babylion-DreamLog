"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useStoryStore } from "@/store/storyStore";
import { Gowun_Batang } from "next/font/google";

const gowunBatang = Gowun_Batang({ subsets: ["latin"], weight: "400" });

const CREATE_STORY_FORM_ID = "create-story-form";

export default function CreateStory() {
  const router = useRouter();
  const { place, name, activity, setInput } = useStoryStore();
  const [selectedKids, setSelectedKids] = useState<number[]>([0]);
  const [duration, setDuration] = useState(8);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [errors, setErrors] = useState({ place: false, name: false, activity: false });

  const daySectionRef = useRef<HTMLElement>(null);
  const placeInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const activityInputRef = useRef<HTMLInputElement>(null);

  const kids = [
    { name: "지우", role: "우리 아이", emoji: "🐱" },
    { name: "서아", role: "누나", emoji: "🐱" },
    { name: "하준", role: "동생", emoji: "🐶" },
  ];

  const voices = [
    { label: "엄마 목소리", sub: "2024.3 등록", icon: "🎙️" },
    { label: "기본 목소리", sub: "따뜻한 여성", icon: "🎤" },
  ];

  const toggleKid = (i: number) => {
    setSelectedKids((prev) =>
      prev.includes(i) ? prev.filter((k) => k !== i) : [...prev, i]
    );
  };

  const handleSubmit = () => {
    const newErrors = {
      place: !place.trim(),
      name: !name.trim(),
      activity: !activity.trim(),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      queueMicrotask(() => {
        daySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        if (newErrors.place) placeInputRef.current?.focus();
        else if (newErrors.name) nameInputRef.current?.focus();
        else activityInputRef.current?.focus();
      });
      return;
    }
    router.push("/story");
  };

  const inputStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "14px",
    color: "#1f2a1a",
    backgroundColor: "transparent",
    fontFamily: "sans-serif",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ backgroundColor: "#fdfcf8", minHeight: "100vh", fontFamily: "sans-serif" }}>

      {/* 상단 헤더 */}
      <div style={{
        backgroundColor: "#fff",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        borderBottom: "1px solid #ede9e0",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            width: "36px", height: "36px", borderRadius: "50%",
            backgroundColor: "#fdfcf8", border: "1px solid #ede9e0",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", color: "#3e4a37",
          }}>
          ←
        </button>
        <span
          className={gowunBatang.className}
          style={{ fontSize: "18px", color: "#1f2a1a" }}
        >
          오늘의 동화 만들기
        </span>
      </div>

      <form
        id={CREATE_STORY_FORM_ID}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px 120px" }}
      >

        {/* 아이의 하루 입력 */}
        <section ref={daySectionRef} style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#1f2a1a", marginBottom: "6px" }}>
            오늘 아이의 하루는 어땠나요?
          </h2>
          <p style={{ fontSize: "13px", color: "#6b7765", marginBottom: "16px" }}>
            장소, 이름, 활동을 모두 입력해주세요
          </p>

          <div style={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            border: errors.place || errors.name || errors.activity
              ? "1.5px solid #ec7d4e"
              : "1.5px solid #ede9e0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}>
            {/* 장소 */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #ede9e0" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#426b36", display: "block", marginBottom: "6px" }}>
                📍 장소
              </label>
              <input
                ref={placeInputRef}
                value={place}
                onChange={(e) => {
                  setInput("place", e.target.value);
                  setErrors((prev) => ({ ...prev, place: false }));
                }}
                placeholder="예: 유치원 운동장, 공원, 집"
                style={inputStyle}
              />
              {errors.place && (
                <p style={{ fontSize: "12px", color: "#ec7d4e", marginTop: "4px" }}>장소를 입력해주세요</p>
              )}
            </div>

            {/* 이름 */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #ede9e0" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#426b36", display: "block", marginBottom: "6px" }}>
                👤 이름
              </label>
              <input
                ref={nameInputRef}
                value={name}
                onChange={(e) => {
                  setInput("name", e.target.value);
                  setErrors((prev) => ({ ...prev, name: false }));
                }}
                placeholder="예: 지우, 서아"
                style={inputStyle}
              />
              {errors.name && (
                <p style={{ fontSize: "12px", color: "#ec7d4e", marginTop: "4px" }}>이름을 입력해주세요</p>
              )}
            </div>

            {/* 활동 */}
            <div style={{ padding: "16px 20px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#426b36", display: "block", marginBottom: "6px" }}>
                🌟 활동
              </label>
              <input
                ref={activityInputRef}
                value={activity}
                onChange={(e) => {
                  setInput("activity", e.target.value);
                  setErrors((prev) => ({ ...prev, activity: false }));
                }}
                placeholder="예: 나비를 처음 봤어요, 친구랑 모래놀이를 했어요"
                style={inputStyle}
              />
              {errors.activity && (
                <p style={{ fontSize: "12px", color: "#ec7d4e", marginTop: "4px" }}>활동을 입력해주세요</p>
              )}
            </div>
          </div>
        </section>

        {/* 누가 사용하나요 */}
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#1f2a1a", marginBottom: "16px" }}>
            누가 사용하나요?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {kids.map((kid, i) => (
              <div
                key={kid.name}
                onClick={() => toggleKid(i)}
                style={{
                  backgroundColor: selectedKids.includes(i) ? "#eef5eb" : "#fff",
                  border: selectedKids.includes(i) ? "1.5px solid #5a8e4c" : "1.5px solid #ede9e0",
                  borderRadius: "14px",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.15s",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    backgroundColor: selectedKids.includes(i) ? "#d4e8d0" : "#f2f2f2",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
                  }}>
                    {kid.emoji}
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "500", color: "#1f2a1a", margin: 0 }}>{kid.name}</p>
                    <p style={{ fontSize: "12px", color: "#6b7765", margin: 0 }}>{kid.role}</p>
                  </div>
                </div>
                <div style={{
                  width: "22px", height: "22px", borderRadius: "50%",
                  backgroundColor: selectedKids.includes(i) ? "#5a8e4c" : "#ede9e0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {selectedKids.includes(i) && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            ))}

            <div style={{
              border: "1.5px dashed #c8ddbb",
              borderRadius: "14px",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              color: "#6b7765",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                backgroundColor: "#f2f2f2",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
              }}>
                +
              </div>
              <span style={{ fontSize: "14px" }}>가족 추가하기</span>
            </div>
          </div>

          {selectedKids.length === 1 && (
            <div style={{
              marginTop: "12px",
              backgroundColor: "#eef5eb",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "13px",
              color: "#426b36",
            }}>
              ✨ {kids[selectedKids[0]].name}가 주인공이 되는 이야기를 만들어드릴게요
            </div>
          )}

          {selectedKids.length >= 2 && (
            <div style={{
              marginTop: "12px",
              backgroundColor: "#eef5eb",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "13px",
              color: "#426b36",
            }}>
              ✨ {kids.filter((_, i) => selectedKids.includes(i)).map(k => k.name).join("와 ")}가 함께 할 수 있는 이야기를 만들어드릴게요
            </div>
          )}
        </section>

        {/* 동화 길이 설정 */}
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#1f2a1a", marginBottom: "16px" }}>
            동화 길이 설정
          </h2>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "20px",
            backgroundColor: "#fff",
            borderRadius: "50px",
            padding: "10px 24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid #ede9e0",
          }}>
            <button
              type="button"
              onClick={() => setDuration((d) => Math.max(1, d - 1))}
              style={{
                width: "32px", height: "32px", borderRadius: "50%",
                backgroundColor: "#fdfcf8", border: "1px solid #ede9e0",
                fontSize: "18px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#3e4a37",
              }}>
              −
            </button>
            <span style={{ fontSize: "16px", fontWeight: "600", color: "#1f2a1a", minWidth: "40px", textAlign: "center" }}>
              {duration}분
            </span>
            <button
              type="button"
              onClick={() => setDuration((d) => Math.min(30, d + 1))}
              style={{
                width: "32px", height: "32px", borderRadius: "50%",
                backgroundColor: "#fdfcf8", border: "1px solid #ede9e0",
                fontSize: "18px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#3e4a37",
              }}>
              +
            </button>
          </div>
        </section>

        {/* 나레이션 목소리 */}
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#1f2a1a", marginBottom: "16px" }}>
            나레이션 목소리
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {voices.map((v, i) => (
              <div
                key={v.label}
                onClick={() => setSelectedVoice(i)}
                style={{
                  backgroundColor: selectedVoice === i ? "#eef5eb" : "#fff",
                  border: selectedVoice === i ? "1.5px solid #5a8e4c" : "1.5px solid #ede9e0",
                  borderRadius: "14px",
                  padding: "20px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.15s",
                }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "50%",
                  backgroundColor: selectedVoice === i ? "#5a8e4c" : "#f2f2f2",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
                }}>
                  {v.icon}
                </div>
                <p style={{ fontSize: "14px", fontWeight: "500", color: "#1f2a1a", margin: 0 }}>{v.label}</p>
                <p style={{ fontSize: "12px", color: "#6b7765", margin: 0 }}>{v.sub}</p>
              </div>
            ))}
          </div>
        </section>

      </form>

      {/* 하단 고정 버튼 */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        padding: "16px 24px 32px",
        backgroundColor: "#fdfcf8",
        borderTop: "1px solid #ede9e0",
        zIndex: 20,
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <button
            type="submit"
            form={CREATE_STORY_FORM_ID}
            style={{
              width: "100%",
              backgroundColor: "#5a8e4c",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              padding: "16px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(90,142,76,0.30)",
            }}>
            동화 생성 시작하기
          </button>
        </div>
      </div>

    </div>
  );
}
