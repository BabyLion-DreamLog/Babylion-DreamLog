"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

const books = [
  { id: 1, title: "하늘을 나는 오리", date: "2026.05.17", cover: "/covers/하늘을 나는 오리.png", starred: false },
  { id: 2, title: "편지를 쓰자", date: "2026.05.15", cover: "/covers/편지를 쓰자.png", starred: false },
  { id: 3, title: "곰인형과 나", date: "2026.05.13", cover: "/covers/곰인형과 나.png", starred: false },
  { id: 4, title: "나비의 하루", date: "2026.05.12", cover: "/covers/나비의 하루.png", starred: true },
  { id: 5, title: "당근밭의 여우", date: "2026.05.09", cover: "/covers/당근밭의 여우.png", starred: true },
  { id: 6, title: "달빛 산책", date: "2026.05.07", cover: "/covers/달빛 산책.png", starred: false },
  { id: 7, title: "작은 꽃잎", date: "2026.05.05", cover: "/covers/작은 꽃잎.png", starred: false },
  { id: 8, title: "밤의 약속", date: "2026.05.03", cover: "/covers/밤의 약속.png", starred: false },
  { id: 9, title: "초록 비밀", date: "2026.05.01", cover: "/covers/초록 비밀.png", starred: false },
  { id: 10, title: "귀뚜라미", date: "2026.04.29", cover: "/covers/귀뚜라미.png", starred: false },
  { id: 11, title: "바닷속 친구들", date: "2026.04.25", cover: "/covers/바닷속 친구들.png", starred: true },
  { id: 12, title: "사진이 좋아", date: "2026.04.22", cover: "/covers/사진이 좋아.png", starred: false },
  { id: 13, title: "생일파티야", date: "2026.04.20", cover: "/covers/생일파티야.png", starred: false },
  { id: 14, title: "찌르르르 찌르르르", date: "2026.04.18", cover: "/covers/찌르르르찌르르르.png", starred: false },
  { id: 15, title: "여름의 꿈", date: "2026.04.14", cover: "/covers/여름의 꿈.png", starred: false },
  { id: 16, title: "하얀 거짓말", date: "2026.04.10", cover: "/covers/하얀 거짓말.png", starred: false },
  { id: 17, title: "별을 받은 날", date: "2026.04.08", cover: "/covers/별을 받은 날.png", starred: false },
];

export default function BookcasePage() {
  const [activeTab, setActiveTab] = useState<"books" | "starred">("books");
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const [starredIds, setStarredIds] = useState<Set<number>>(
    new Set(books.filter((b) => b.starred).map((b) => b.id))
  );

  function toggleStar(id: number) {
    setStarredIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const displayed = activeTab === "starred"
    ? books.filter((b) => starredIds.has(b.id))
    : books;
  const mayBooks = displayed.filter((b) => b.date.startsWith("2026.05"));
  const aprBooks = displayed.filter((b) => b.date.startsWith("2026.04"));

  return (
    <div style={{ backgroundColor: "#fdfcf8", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "100px 40px 60px" }}>

        {/* 페이지 제목 */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2a1a", margin: "0 0 4px" }}>
            지우의 책장
          </h1>
          <p style={{ fontSize: "15px", color: "#6b7765", margin: 0 }}>
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
                  fontSize: "15px",
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
            <span style={{ fontSize: "15px", color: "#426b36", fontWeight: "600" }}>
              총 {displayed.length}권
            </span>
            <button style={{
              fontSize: "15px",
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
            <p style={{ fontSize: "14px", color: "#898989", margin: "0 0 6px" }}>✨ 이 달의 기억</p>
            <p style={{ fontSize: "18px", fontWeight: "600", color: "#2c2c2c", margin: "0 0 6px" }}>
              "바닷속 친구들을 3번 다시 읽었어요"
            </p>
            <p style={{ fontSize: "15px", color: "#4e7952", margin: 0 }}>2026년 5월 · 지우 6살</p>
          </div>
          <div style={{ fontSize: "36px" }}>🌊</div>
        </div>

        {/* 5월 섹션 */}
        {mayBooks.length > 0 && (
          <section style={{ marginBottom: "36px" }}>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#5a8e4c", margin: "0 0 16px" }}>
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
                  starred={starredIds.has(book.id)}
                  onToggleStar={() => toggleStar(book.id)}
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
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#5a8e4c", margin: "0 0 16px" }}>
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
                  starred={starredIds.has(book.id)}
                  onToggleStar={() => toggleStar(book.id)}
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
  starred,
  onToggleStar,
  hovered,
  onMouseEnter,
  onMouseLeave,
}: {
  book: Book;
  starred: boolean;
  onToggleStar: () => void;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "pointer", position: "relative" }}
    >
      {/* 표지 */}
      <div style={{
        borderRadius: "10px",
        aspectRatio: "3/4",
        marginBottom: "10px",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.18)"
          : "0 4px 12px rgba(0,0,0,0.10)",
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 0.2s ease",
        overflow: "hidden",
      }}>
        <img
          src={book.cover}
          alt={book.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* 즐겨찾기 버튼 */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleStar(); }}
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

      {/* 제목 + 날짜 */}
      <p style={{ fontSize: "17px", fontWeight: "600", color: "#1f2a1a", margin: "0 0 2px", textAlign: "center" }}>
        {book.title}
      </p>
      <p style={{ fontSize: "13px", color: "#898989", margin: 0, textAlign: "center" }}>
        {book.date}
      </p>
    </div>
  );
}
