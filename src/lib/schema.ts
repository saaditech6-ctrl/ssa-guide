import { Article } from "@/lib/articles";

const BASE_URL = "https://www.socialsecurityguidecalc.com";

/**
 * يستخرج تلقائياً الأسئلة والأجوبة المحصورة داخل قسم الـ FAQ فقط
 */
export function generateFAQSchema(content: string) {
  // 1. نبحث فقط عن النص بعد عنوان الأسئلة الشائعة لعدم التقاط عناوِين المقال الأخرى
  const faqSectionMatch = content.match(/<h2[^>]*>.*?(Frequently Asked Questions|FAQ).*?<\/h2>([\s\S]*)/i);
  if (!faqSectionMatch) return null;

  const faqContent = faqSectionMatch[2];

  // 2. استخراج الـ h3 والـ p التالي له مباشرة
  const faqRegex = /<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g;
  const matches = [...faqContent.matchAll(faqRegex)];

  if (matches.length === 0) return null;

  const mainEntity = matches.map((match) => {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);
    return {
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

/**
 * يبني Article schema كامل ومطابق لشروط Google Rich Results
 */
export function generateArticleSchema(article: Article, url: string) {
  const publishedIso = toIsoDate(article.date);
  // dateModified يستخدم article.lastUpdated إن وُجد، وإلا يساوي تاريخ النشر كافتراضي آمن
  const modifiedIso = article.lastUpdated
    ? toIsoDate(article.lastUpdated)
    : publishedIso;

  // إعداد رابط الصورة الكامل (مهم جداً لـ Google)
  const imageUrl = article.image
    ? article.image.startsWith("http")
      ? article.image
      : `${BASE_URL}${article.image}`
    : `${BASE_URL}/og-image.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: imageUrl, // تم إضافتها لضمان التوافق التام مع Google
    author: {
      "@type": "Person",
      name: article.author || "Amine Saadi",
      url: `${BASE_URL}/about`,
      jobTitle: "Financial Content Creator",
    },
    publisher: {
      "@type": "Organization",
      name: "Social Security Guide Calc",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    datePublished: publishedIso,
    dateModified: modifiedIso,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/**
 * يحوّل أي تاريخ نصي إلى صيغة ISO 8601 قياسية كاملة تشتمل على التوقيت والمنطقة الزمنية (Z).
 * مثال ناتج: "2026-05-05T12:00:00.000Z"
 */
function toIsoDate(dateString?: string): string {
  if (!dateString) return new Date().toISOString();

  // إذا كان التاريخ مسبقاً بصيغة ISO كاملة تحتوي على T، نقوم بتحويله مباشرة
  if (dateString.includes("T")) {
    const d = new Date(dateString);
    if (!isNaN(d.getTime())) return d.toISOString();
  }

  // معالجة التواريخ من صيغ مثل "2026-05-05" أو "May 5, 2026"
  const parsed = new Date(dateString);

  if (!isNaN(parsed.getTime())) {
    // تعيين وقت افتراضي (12:00:00 UTC) لمنع التذبذب بين الأيام بسبب المناطق الزمنية
    parsed.setUTCHours(12, 0, 0, 0);
    return parsed.toISOString();
  }

  // fallback آمن في حال وجود نص غير صالح
  return new Date().toISOString();
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}