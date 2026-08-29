'use client'

import { useEffect } from 'react'

export function PinterestSaveButton({ url, media, description }) {
  useEffect(() => {
    // تحميل السكريبت الخاص بـ Pinterest مرة واحدة فقط
    const script = document.createElement('script')
    script.src = '//assets.pinterest.com/js/pinit.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      // التنظيف عند إلغاء تحميل المكون
      document.body.removeChild(script)
    }
  }, [])

  // ترميز البيانات لضمان سلامة الـ URLs
  const encodedUrl = encodeURIComponent(url)
  const encodedMedia = encodeURIComponent(media)
  const encodedDesc = encodeURIComponent(description)

  const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedMedia}&description=${encodedDesc}`

  return (
    <a
      href={pinUrl}
      data-pin-do="buttonBookmark"
      data-pin-custom="true"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-[#e60023] hover:bg-[#ad001a] text-white font-semibold rounded-full shadow-md transition-all duration-200 text-sm"
    >
      {/* أيقونة Pinterest SVG */}
      <svg
        className="w-4 h-4 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
      <span>Save</span>
    </a>
  )
}