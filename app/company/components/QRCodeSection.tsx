"use client";

import { Download } from "lucide-react";
import { useState } from "react";

interface QRCodeSectionProps {
  url: string;
  downloadLabel: string;
}

export function QRCodeSection({ url, downloadLabel }: QRCodeSectionProps) {
  const [qrSize, setQrSize] = useState(200);

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = qrSize;
      canvas.height = qrSize;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "omega-qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="w-full max-w-md mt-8 p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
      <h3 className="text-white text-center font-semibold mb-4">
        QR Code
      </h3>
      
      <div className="flex flex-col items-center gap-4">
        <div 
          className="bg-white p-4 rounded-lg"
          style={{ width: qrSize + 32, height: qrSize + 32 }}
        >
          <svg
            id="qr-code-svg"
            style={{ width: qrSize, height: qrSize }}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simple QR Code pattern - in production use a real QR library */}
            <rect width="200" height="200" fill="white"/>
            <rect x="10" y="10" width="50" height="50" fill="black"/>
            <rect x="20" y="20" width="30" height="30" fill="white"/>
            <rect x="25" y="25" width="20" height="20" fill="black"/>
            
            <rect x="140" y="10" width="50" height="50" fill="black"/>
            <rect x="150" y="20" width="30" height="30" fill="white"/>
            <rect x="155" y="25" width="20" height="20" fill="black"/>
            
            <rect x="10" y="140" width="50" height="50" fill="black"/>
            <rect x="20" y="150" width="30" height="30" fill="white"/>
            <rect x="25" y="155" width="20" height="20" fill="black"/>
            
            {/* Random pattern */}
            <rect x="70" y="10" width="10" height="10" fill="black"/>
            <rect x="90" y="10" width="10" height="10" fill="black"/>
            <rect x="110" y="10" width="10" height="10" fill="black"/>
            <rect x="70" y="30" width="10" height="10" fill="black"/>
            <rect x="100" y="30" width="10" height="10" fill="black"/>
            <rect x="70" y="50" width="10" height="10" fill="black"/>
            <rect x="90" y="50" width="10" height="10" fill="black"/>
            <rect x="110" y="50" width="10" height="10" fill="black"/>
            
            <rect x="10" y="70" width="10" height="10" fill="black"/>
            <rect x="30" y="70" width="10" height="10" fill="black"/>
            <rect x="50" y="70" width="10" height="10" fill="black"/>
            <rect x="10" y="90" width="10" height="10" fill="black"/>
            <rect x="40" y="90" width="10" height="10" fill="black"/>
            <rect x="10" y="110" width="10" height="10" fill="black"/>
            <rect x="30" y="110" width="10" height="10" fill="black"/>
            <rect x="50" y="110" width="10" height="10" fill="black"/>
            
            <rect x="70" y="70" width="10" height="10" fill="black"/>
            <rect x="90" y="70" width="10" height="10" fill="black"/>
            <rect x="110" y="70" width="10" height="10" fill="black"/>
            <rect x="130" y="70" width="10" height="10" fill="black"/>
            <rect x="70" y="90" width="10" height="10" fill="black"/>
            <rect x="100" y="90" width="10" height="10" fill="black"/>
            <rect x="130" y="90" width="10" height="10" fill="black"/>
            <rect x="70" y="110" width="10" height="10" fill="black"/>
            <rect x="90" y="110" width="10" height="10" fill="black"/>
            <rect x="110" y="110" width="10" height="10" fill="black"/>
            <rect x="130" y="110" width="10" height="10" fill="black"/>
            
            <rect x="70" y="140" width="10" height="10" fill="black"/>
            <rect x="90" y="140" width="10" height="10" fill="black"/>
            <rect x="110" y="140" width="10" height="10" fill="black"/>
            <rect x="70" y="160" width="10" height="10" fill="black"/>
            <rect x="100" y="160" width="10" height="10" fill="black"/>
            <rect x="70" y="180" width="10" height="10" fill="black"/>
            <rect x="90" y="180" width="10" height="10" fill="black"/>
            <rect x="110" y="180" width="10" height="10" fill="black"/>
            
            <rect x="140" y="70" width="10" height="10" fill="black"/>
            <rect x="160" y="70" width="10" height="10" fill="black"/>
            <rect x="180" y="70" width="10" height="10" fill="black"/>
            <rect x="140" y="90" width="10" height="10" fill="black"/>
            <rect x="170" y="90" width="10" height="10" fill="black"/>
            <rect x="140" y="110" width="10" height="10" fill="black"/>
            <rect x="160" y="110" width="10" height="10" fill="black"/>
            <rect x="180" y="110" width="10" height="10" fill="black"/>
            
            <rect x="140" y="140" width="10" height="10" fill="black"/>
            <rect x="160" y="140" width="10" height="10" fill="black"/>
            <rect x="180" y="140" width="10" height="10" fill="black"/>
            <rect x="140" y="160" width="10" height="10" fill="black"/>
            <rect x="170" y="160" width="10" height="10" fill="black"/>
            <rect x="140" y="180" width="10" height="10" fill="black"/>
            <rect x="160" y="180" width="10" height="10" fill="black"/>
            <rect x="180" y="180" width="10" height="10" fill="black"/>
          </svg>
        </div>

        <div className="flex gap-2">
          {[200, 300, 400, 500].map((size) => (
            <button
              key={size}
              onClick={() => setQrSize(size)}
              className={`px-3 py-1 rounded text-sm ${
                qrSize === size
                  ? "bg-blue-600 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {size}px
            </button>
          ))}
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download size={18} />
          {downloadLabel}
        </button>
      </div>
    </div>
  );
}
