"use client";

import { analyzeImage } from "@/actions/analyze-image";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setLoading(true);
    try {
      const { result } = await analyzeImage(selectedImage);
      setResult(result || "");
    } catch (error) {
      setResult((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded"
        />

        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Selected"
            width={500}
            height={300}
            className="max-w-md h-auto rounded-lg shadow-lg"
          />
        )}

        <button
          onClick={handleAnalyze}
          disabled={!selectedImage || loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Analiz ediliyor..." : "Analiz Et"}
        </button>
      </div>

      {result && (
        <div className="max-w-2xl bg-gray-100 p-4 rounded-lg">
          <h2 className="font-bold mb-2">Analiz Sonucu:</h2>
          <p className="whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}
