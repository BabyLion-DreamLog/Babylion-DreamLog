"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

const books = [
  { id: 1, title: "나비의 하루", date: "2026.05.12", cover: "linear-gradient(145deg, #f4a642, #e8733a)", starred: true },
  { id: 2, title: "당근밭의 여우", date: "2026.05.09", cover: "linear-gradient(145deg, #e07848, #c95f35)", starred: true },
  { id: 3, title: "달빛 산책", date: "2026.05.07", cover: "linear-gradient(145deg, #7b8ec8, #4d629e)", starred: false },
  { id: 4, title: "작은 꽃잎", date: "2026.05.05", cover: "linear-gradient(145deg, #e8829a, #c95e7a)", starred: false },
  { id: 5, title: "밤의 약속", date: "2026.05.03", cover: "linear-gradient(145deg, #4a6f9e, #2d4f7e)", starred: false },
  { id: 6, title: "초록 비밀", date: "2026.05.01", cover: "linear-gradient(145deg, #5a8e5c, #3a6e40)", starred: false },
  { id: 7, title: "귀뚜라미", date: "2026.04.28", cover: "linear-gradient(145deg, #b87c4a, #8a5c30)", starred: false },
  { id: 8, title: "바닷속 친구들", date: "2026.04.25", cover: "linear-gradient(145deg, #4a9db5, #2d7a99)", starred: true },
  { id: 9, title: "사진이 좋아", date: "2026.04.22", cover: "linear-gradient(145deg, #9a82c8, #7060a8)", starred: false },
  { id: 10, title: "찌르르르 찌르르르", date: "2026.04.18", cover: "linear-gradient(145deg, #e89a5c, #c87838)", starred: false },
  { id: 11, title: "여름의 꿈", date: "2026.04.14", cover: "linear-gradient(145deg, #7ab56a, #5a9a4c)", starred: false },
  { id: 12, title: "하얀 거짓말", date: "2026.04.10", cover: "linear-gradient(145deg, #9aabb8, #7a8fa0)", starred: false },
];

export default function BookcasePage() {
  const [activeTab, setActiveTab] = useState<"books" | "starred">("books");
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  const displayed = activeTab === "starred" ? books.filter((b) => b.starred) : books;
  const mayBooks = displayed.filter((b) => b.date.startsWith("2026.05"));
  const aprBooks = displayed.filter((b) => b.date.startsWith("2026.04"));

  return (
    <div style={{ backgroundColor: "#fdfcf8", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "100px 40px 60px" }}>

        {/* 페이지 제목 */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#1f2a1a", margin: "0 0 4px" }}>
            지우의 책장
          </h1>
          <p style={{ fontSize: "13px", color: "#6b7765", margin: 0 }}>
            지금까지 만든 동화를 모아볼 수 있어요
          </p>
        </div>

        {/* 탭 + 필터 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>

          {/* 탭 */}
          <div style={{
            display: "inline-flex",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            gap: "2px",
          }}>
            {[
              { key: "books", label: "📚 동화책" },
              { key: "starred", label: "⭐ 즐겨찾기" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as "books" | "starred")}
                style={{
                  padding: "8px 20px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  backgroundColor: activeTab === key ? "#5a8e4c" : "transparent",
                  color: activeTab === key ? "#fff" : "#6b7765",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 총 N권 + 정렬 */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "13px", color: "#426b36", fontWeight: "600" }}>
              총 {displayed.length}권
            </span>
            <button style={{
              fontSize: "13px",
              color: "#6b7765",
              background: "none",
              border: "1px solid #e0dbd2",
              borderRadius: "8px",
              padding: "6px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}>
              생성일순 ↓
            </button>
          </div>
        </div>

        {/* 이 달의 기억 카드 */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "20px 28px",
          marginBottom: "32px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <p style={{ fontSize: "12px", color: "#898989", margin: "0 0 6px" }}>✨ 이 달의 기억</p>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#2c2c2c", margin: "0 0 6px" }}>
              "바닷속 친구들을 3번 다시 읽었어요"
            </p>
            <p style={{ fontSize: "13px", color: "#4e7952", margin: 0 }}>2026년 5월 · 지우 6살</p>
          </div>
          <div style={{ fontSize: "36px" }}>🌊</div>
        </div>

        {/* 5월 섹션 */}
        {mayBooks.length > 0 && (
          <section style={{ marginBottom: "36px" }}>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "#5a8e4c", margin: "0 0 16px" }}>
              2026 5월
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
            }}>
              {mayBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  hovered={hoveredBook === book.id}
                  onMouseEnter={() => setHoveredBook(book.id)}
                  onMouseLeave={() => setHoveredBook(null)}
                />
              ))}
            </div>
          </section>
        )}

        {/* 4월 섹션 */}
        {aprBooks.length > 0 && (
          <section>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "#5a8e4c", margin: "0 0 16px" }}>
              2026 4월
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
            }}>
              {aprBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  hovered={hoveredBook === book.id}
                  onMouseEnter={() => setHoveredBook(book.id)}
                  onMouseLeave={() => setHoveredBook(null)}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

type Book = {
  id: number;
  title: string;
  date: string;
  cover: string;
  starred: boolean;
};

function BookCard({
  book,
  hovered,
  onMouseEnter,
  onMouseLeave,
}: {
  book: Book;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [starred, setStarred] = useState(book.starred);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "pointer" }}
    >
      {/* 표지 */}
      <div style={{
        position: "relative",
        background: book.cover,
        borderRadius: "10px",
        aspectRatio: "3/4",
        marginBottom: "10px",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.18)"
          : "0 4px 12px rgba(0,0,0,0.10)",
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "flex-end",
        padding: "12px",
      }}>
        {/* 책 제목 (표지 하단) */}
        <span style={{
          fontSize: "11px",
          fontWeight: "600",
          color: "#fff",
          lineHeight: "1.4",
          textShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}>
          {book.title}
        </span>

        {/* 즐겨찾기 버튼 */}
        <button
          onClick={(e) => { e.stopPropagation(); setStarred(!starred); }}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          }}
        >
          {starred ? "⭐" : "☆"}
        </button>
      </div>

      {/* 날짜 */}
      <p style={{ fontSize: "11px", color: "#898989", margin: 0, textAlign: "center" }}>
        {book.date}
      </p>
    </div>
  );
}
