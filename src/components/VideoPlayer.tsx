import React from 'react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  uploadDate?: string;
}

export default function VideoPlayer({
  videoId,
  title,
  description,
  uploadDate = "2026-08-10",
}: VideoPlayerProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "embedUrl": embedUrl,
    "contentUrl": `https://www.youtube.com/watch?v=${videoId}`,
    "inLanguage": "en"
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-slate-800 bg-slate-900">
      <div className="p-4 bg-slate-800/80 border-b border-slate-700/50 flex items-center gap-3">
        <span className="text-xl">🎬</span>
        <div>
          <h4 className="font-semibold text-base m-0 text-slate-100">Watch the Video Breakdown</h4>
          <p className="text-xs text-slate-400 m-0">{title}</p>
        </div>
      </div>
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      {/* Schema تلقائي للسيو */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
    </div>
  );
}