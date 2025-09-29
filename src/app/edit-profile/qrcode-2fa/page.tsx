"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Info, Plus } from "lucide-react";
import QRCode from "qrcode";

const QRCode2FAPage = () => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [secretKey] = useState("OGZISNOGVVOE5DU2INIRORBITNLYTBXB");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const otpauthUrl = `otpauth://totp/VestRoll:user@example.com?secret=${secretKey}&issuer=VestRoll`;
        const qrDataUrl = await QRCode.toDataURL(otpauthUrl, {
          width: 164,
          margin: 1,
          color: {
            dark: '#17171C',
            light: '#FFFFFF'
          }
        });
        setQrCodeDataUrl(qrDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [secretKey]);

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(secretKey);
      alert("Copied to clipboard!");
    } catch {
      alert("Failed to copy. Please copy manually.");
    }
  };

  const onBack = () => {
    console.log("Going back...");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-4 py-4 md:px-6">
        <div>
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Edit profile</h1>
      </div>

      <div className="flex justify-center pt-8 px-4">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#414F62]">
                Scan QR code
              </h2>

              <div className="flex gap-2">
                <div className="w-1/2 h-1 bg-[#5E2A8C] rounded-full"></div>
                <div className="w-1/2 h-1 bg-[#DCE0E5] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-6">

              <div className="text-center">
                <p className="text-sm font-semibold text-[#17171C] leading-[120%]">
                  Scan this QR code with your authenticator<br />
                  app to link it to your VestRoll account
                </p>
              </div>

              <div className="flex justify-center">
                <div
                  className="bg-white border border-gray-200 flex items-center justify-center"
                  style={{
                    width: '164px',
                    height: '164px',
                    borderRadius: '8.2px'
                  }}
                >
                  {qrCodeDataUrl ? (
                    <>
                      <img
                        src={qrCodeDataUrl}
                        alt="QR Code for authenticator setup"
                        className="w-[140px] h-[140px]"
                      />
                    </>
                  ) : (
                    <div className="w-[140px] h-[140px] bg-gray-100 animate-pulse rounded" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-[#414F62] text-center leading-[120%]">
                  Or manually enter this key in your authenticator app
                </p>

                <div className="bg-[#F5F6F7] rounded-lg p-4 flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#7F8C9F] rounded-full flex-shrink-0"></div>

                  <div className="w-px h-4 bg-[#512EDC] flex-shrink-0"></div>

                  <span className="flex-1 text-sm font-medium text-[#414F62] font-mono">
                    {secretKey}
                  </span>

                  <div className="w-4 h-4 bg-[#7F8C9F] flex-shrink-0"></div>

                  <button
                    onClick={handleCopyKey}
                    className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    <span className="text-sm font-medium text-[#17171C]">Copy</span>
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-[#FEF7EB] border border-[#DCE0E5] rounded-lg p-4 flex gap-4">
                <Info size={24} className="text-[#E79A23] flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[#17171C] leading-[120%]">
                    Don&apos;t have an authenticator app?
                  </p>
                  <p className="text-xs font-medium text-[#414F62] leading-[120%]">
                    You can download one from the App Store or Google Play on your mobile device.
                    Some compatible apps include Google Authenticator, Microsoft Authenticator, Authy, and more.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 h-14 border-[1.5px] border-[#17171C] rounded-xl hover:bg-gray-50 transition-colors">
                <Plus size={16} />
                <span className="text-base font-medium text-[#17171C]">Prev</span>
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 h-14 bg-[#5E2A8C] rounded-xl hover:bg-[#4A1F6E] transition-colors">
                <span className="text-base font-medium text-white">Next</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCode2FAPage;