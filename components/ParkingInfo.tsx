"use client";
import { useState } from "react";

export default function ParkingInfo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: "16px" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          background: "none",
          border: "none",
          padding: "0",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          fontWeight: 500,
          color: "#6B625A",
          fontFamily: "var(--font-dm-sans), sans-serif",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        주차장 안내
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{
          marginTop: "12px",
          background: "#FAFAFA",
          border: "1px solid #D3D3D3",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#8B8675", marginBottom: "4px" }}>
              1 · 유료 주차장
            </p>
            <p style={{ fontSize: "14px", color: "#1A1A1A", fontWeight: 400, lineHeight: 1.6 }}>
              서울특별시 서초구 강남대로 101길 40
            </p>
            <p style={{ fontSize: "12px", color: "#8B8675" }}>도보 10초 거리</p>
          </div>
          <div style={{ borderTop: "1px solid #D3D3D3", paddingTop: "14px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#8B8675", marginBottom: "4px" }}>
              2 · 공영 주차장
            </p>
            <p style={{ fontSize: "14px", color: "#1A1A1A", fontWeight: 400, lineHeight: 1.6 }}>
              서울특별시 서초구 잠원동 89-5
            </p>
            <p style={{ fontSize: "12px", color: "#8B8675" }}>도보 5분 거리 · 저렴</p>
          </div>
        </div>
      )}
    </div>
  );
}
