"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStoryStore } from "@/store/storyStore";

export default function CreateStory() {
  const router = useRouter();
  const { place, name, activity, setInput } = useStoryStore();
  const [selectedKids, setSelectedKids] = useState<number[]>([0]);
  const [duration, setDuration] = useState(8);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [errors, setErrors] = useState({ place: false, name: false, activity: false });

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
    if (Object.values(newErrors).some(Boolean)) return;
    router.push("/generate");
  };

  const inputStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "14px",
    color: "#333",
    backgroundColor: "transparent",
    fontFamily: "sans-serif",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ backgroundColor: "#f7f7f4", minHeight: "100vh", fontFamily: "sans-serif" }}>

      {/* 상단 헤더 */}
      <div style={{
        backgroundColor: "#fff",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        borderBottom: "0.5px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <button
          onClick={() => router.back()}
          style={{
            width: "36px", height: "36px", borderRadius: "50%",
            backgroundColor: "#f2f2f2", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px",
          }}>
          ←
        </button>
        <span style={{ fontSize: "18px", fontWeight: "600", color: "#222" }}>오늘의 동화 만들기</span>
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px 120px" }}>

        {/* 아이의 하루 입력 */}
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#222", marginBottom: "6px" }}>
            오늘 아이의 하루는 어땠나요?
          </h2>
          <p style={{ fontSize: "13px", color: "#aaa", marginBottom: "16px" }}>
            장소, 이름, 활동을 모두 입력해주세요
          </p>

          <div style={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            border: errors.place || errors.name || errors.activity ? "1.5px solid #e07a5f" : "1.5px solid #e8e8e8",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}>

            {/* 장소 */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#5a9e75", display: "block", marginBottom: "6px" }}>
                📍 장소
              </label>
              <input
                value={place}
                onChange={(e) => {
                  setInput("place", e.target.value);
                  setErrors((prev) => ({ ...prev, place: false }));
                }}
                placeholder="예: 유치원 운동장, 공원, 집"
                style={inputStyle}
              />
              {errors.place && (
                <p style={{ fontSize: "12px", color: "#e07a5f", marginTop: "4px" }}>장소를 입력해주세요</p>
              )}
            </div>

            {/* 이름 */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#5a9e75", display: "block", marginBottom: "6px" }}>
                👤 이름
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setInput("name", e.target.value);
                  setErrors((prev) => ({ ...prev, name: false }));
                }}
                placeholder="예: 지우, 서아"
                style={inputStyle}
              />
              {errors.name && (
                <p style={{ fontSize: "12px", color: "#e07a5f", marginTop: "4px" }}>이름을 입력해주세요</p>
              )}
            </div>

            {/* 활동 */}
            <div style={{ padding: "16px 20px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#5a9e75", display: "block", marginBottom: "6px" }}>
                🌟 활동
              </label>
              <input
                value={activity}
                onChange={(e) => {
                  setInput("activity", e.target.value);
                  setErrors((prev) => ({ ...prev, activity: false }));
                }}
                placeholder="예: 나비를 처음 봤어요, 친구랑 모래놀이를 했어요"
                style={inputStyle}
              />
              {errors.activity && (
                <p style={{ fontSize: "12px", color: "#e07a5f", marginTop: "4px" }}>활동을 입력해주세요</p>
              )}
            </div>

          </div>
        </section>

        {/* 누가 사용하나요 */}
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#222", marginBottom: "16px" }}>
            누가 사용하나요?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {kids.map((kid, i) => (
              <div
                key={kid.name}
                onClick={() => toggleKid(i)}
                style={{
                  backgroundColor: selectedKids.includes(i) ? "#f0f8f3" : "#fff",
                  border: selectedKids.includes(i) ? "1.5px solid #7ab893" : "1.5px solid #eee",
                  borderRadius: "14px",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    backgroundColor: selectedKids.includes(i) ? "#d4ead9" : "#f2f2f2",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
                  }}>
                    {kid.emoji}
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "500", color: "#222" }}>{kid.name}</p>
                    <p style={{ fontSize: "12px", color: "#aaa" }}>{kid.role}</p>
                  </div>
                </div>
                <div style={{
                  width: "22px", height: "22px", borderRadius: "50%",
                  backgroundColor: selectedKids.includes(i) ? "#7ab893" : "#eee",
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
              border: "1.5px dashed #ccc",
              borderRadius: "14px",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              color: "#bbb",
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

          {/* 1명 선택 시 */}
          {selectedKids.length === 1 && (
            <div style={{
              marginTop: "12px",
              backgroundColor: "#f0f8f3",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "13px",
              color: "#5a9e75",
            }}>
              ✨ {kids[selectedKids[0]].name}가 주인공이 되는 이야기를 만들어드릴게요
            </div>
          )}

          {/* 2명 이상 선택 시 */}
          {selectedKids.length >= 2 && (
            <div style={{
              marginTop: "12px",
              backgroundColor: "#f0f8f3",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "13px",
              color: "#5a9e75",
            }}>
              ✨ {kids.filter((_, i) => selectedKids.includes(i)).map(k => k.name).join("와 ")}가 함께 할 수 있는 이야기를 만들어드릴게요
            </div>
          )}
        </section>

        {/* 동화 길이 설정 */}
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#222", marginBottom: "16px" }}>
            동화 길이 설정
          </h2>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "20px",
            backgroundColor: "#fff",
            borderRadius: "50px",
            padding: "10px 24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid #eee",
          }}>
            <button
              onClick={() => setDuration((d) => Math.max(1, d - 1))}
              style={{
                width: "32px", height: "32px", borderRadius: "50%",
                backgroundColor: "#f2f2f2", border: "none", fontSize: "18px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
              −
            </button>
            <span style={{ fontSize: "16px", fontWeight: "600", color: "#222", minWidth: "40px", textAlign: "center" }}>
              {duration}분
            </span>
            <button
              onClick={() => setDuration((d) => Math.min(30, d + 1))}
              style={{
                width: "32px", height: "32px", borderRadius: "50%",
                backgroundColor: "#f2f2f2", border: "none", fontSize: "18px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
              +
            </button>
          </div>
        </section>

        {/* 나레이션 목소리 */}
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#222", marginBottom: "16px" }}>
            나레이션 목소리
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {voices.map((v, i) => (
              <div
                key={v.label}
                onClick={() => setSelectedVoice(i)}
                style={{
                  backgroundColor: selectedVoice === i ? "#f0f8f3" : "#fff",
                  border: selectedVoice === i ? "1.5px solid #7ab893" : "1.5px solid #eee",
                  borderRadius: "14px",
                  padding: "20px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "50%",
                  backgroundColor: selectedVoice === i ? "#7ab893" : "#f2f2f2",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
                }}>
                  {v.icon}
                </div>
                <p style={{ fontSize: "14px", fontWeight: "500", color: "#222" }}>{v.label}</p>
                <p style={{ fontSize: "12px", color: "#aaa" }}>{v.sub}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 하단 고정 버튼 */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        padding: "16px 24px 32px",
        backgroundColor: "#f7f7f4",
        borderTop: "0.5px solid #eee",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              backgroundColor: "#5a9e75",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              padding: "16px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(90,158,117,0.3)",
            }}>
            동화 생성 시작하기
          </button>
        </div>
      </div>

    </div>
  );
}
