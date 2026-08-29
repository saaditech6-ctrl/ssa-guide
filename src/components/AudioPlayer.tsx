import React from 'react';

interface AudioPlayerProps {
  src: string;
  title?: string;
  description?: string;
}

export default function AudioPlayer({ 
  src, 
  title = "Listen to the Audio Overview",
  description = "Generated via AI audio overview covering key strategies & 2026 benefit caps."
}: AudioPlayerProps) {
  
  // كود البيانات المنظمة (SEO) للصوت بشكل تلقائي
  const audioSchema = {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    "name": title,
    "description": description,
    "contentUrl": src.startsWith('http') ? src : `https://www.socialsecurityguidecalc.com${src}`,
    "encodingFormat": "audio/mpeg",
    "inLanguage": "en"
  };

  return (
    <div className="my-6 p-4 bg-slate-900 text-white rounded-xl shadow-md border border-slate-800">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xl">🎧</span>
        <h4 className="font-semibold text-base m-0 text-slate-100">{title}</h4>
      </div>
      <audio controls preload="metadata" className="w-full h-10 rounded">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <p className="text-xs text-slate-400 mt-2 m-0">
        {description}
      </p>

      {/* إضافة الـ Schema تلقائياً لتحسين SEO المقال */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(audioSchema) }}
      />
    </div>
  );
}