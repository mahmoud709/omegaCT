"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Copy, Download } from "lucide-react";

interface FixedQrCodeProps {
  qrUrl: string;
}

export function FixedQrCode({ qrUrl }: FixedQrCodeProps) {
  const [size, setSize] = useState(300);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const value = qrUrl.trim() || "https://omega-tc.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1500);
    } catch (error) {
      setCopyStatus("failed");
      window.setTimeout(() => setCopyStatus("idle"), 1500);
    }
  };

  const downloadQr = () => {
    const svg = document.getElementById("fixed-qr-svg") as SVGSVGElement | null;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    
    // Create canvas to convert SVG to PNG
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "omega-qr-code.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(source)));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">QR Code Preview</p>
            <p className="text-sm text-gray-500">Fixed QR linking to the configured URL.</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Static</span>
        </div>

        <div className="mt-6 flex items-center justify-center rounded-3xl bg-slate-50 p-6">
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <QRCode id="fixed-qr-svg" value={value} size={size} level="M" />
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500 break-words">{value}</div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-gray-900">QR Code Size</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {[200, 300, 400, 500].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    size === option
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {option}px
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-black transition"
            >
              <Copy size={16} /> {copyStatus === "copied" ? "Copied" : "Copy QR Link"}
            </button>

            <button
              type="button"
              onClick={downloadQr}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              <Download size={16} /> Download QR Image
            </button>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Important</p>
            <p className="mt-2">This QR code will remain fixed as long as this URL is not changed from the admin settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
