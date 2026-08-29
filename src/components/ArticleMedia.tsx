import React from 'react';

interface ArticleMediaProps {
  videoUrl?: string;
  videoTitle?: string;
  videoDescription?: string;
  audioUrl?: string;
  uploadDate: string; // تاريخ النشر لربطه بـ uploadDate
  articleTitle: string;
  articleDescription: string;
}

export const ArticleMedia: React.FC<ArticleMediaProps> = ({
  videoUrl,
  videoTitle,
  videoDescription,
  audioUrl,
  uploadDate,
  articleTitle,
  articleDescription,
}) => {
  if (!videoUrl && !audioUrl) return null;

  // ضمان إلحاق المنطقة الزمنية (ISO 8601 / UTC Offset) لإنهاء تنبيه Search Console
  const formattedUploadDate = uploadDate.includes('T') && !uploadDate.endsWith('Z') && !uploadDate.includes('+')
    ? `${uploadDate}Z`
    : uploadDate;

  // بناء VideoObject Schema بشكل آلي عند وجود فيديو
  const videoSchema = videoUrl ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': videoTitle || articleTitle,
    'description': videoDescription || articleDescription,
    'thumbnailUrl': [
      // يمكن استخدام صورة مقال افتراضية أو صورة محددة للفيديو
      'https://www.socialsecurityguidecalc.com/images/og-default.jpg'
    ],
    'uploadDate': formattedUploadDate, // صيغة معتمدة من Google بدون تنبيهات
    'contentUrl': videoUrl,
    'embedUrl': videoUrl.includes('youtube.com') 
      ? videoUrl.replace('watch?v=', 'embed/') 
      : videoUrl,
  } : null;

  return (
    <div className="article-media-container my-6 space-y-4">
      {/* مشغل الفيديو */}
      {videoUrl && (
        <div className="video-wrapper aspect-video w-full rounded-xl overflow-hidden shadow-lg">
          {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
            <iframe
              src={videoUrl.replace('watch?v=', 'embed/')}
              title={videoTitle || articleTitle}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video controls className="w-full h-full">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}

      {/* مشغل الصوت */}
      {audioUrl && (
        <div className="audio-wrapper bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">🎧 Listen to article audio:</p>
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* ضخ كود الـ Schema في الـ DOM تلقائياً عند وجود فيديو */}
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}
    </div>
  );
};