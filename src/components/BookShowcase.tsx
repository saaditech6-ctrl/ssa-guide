import React from 'react'
import Image from 'next/image'
import { ExternalLink, ShieldCheck } from 'lucide-react'

export function BookShowcase() {
  const books = [
    {
      title: 'THE COMPLETE SOCIAL SECURITY HANDBOOK',
      subtitle: 'Your Essential Guide to Maximizing Retirement, Disability, and Survivor Benefits (2026 Edition)',
      author: 'Amine Saadi',
      price: '$12.58',
      format: 'Paperback & Kindle',
      coverUrl: '/images/handbook-cover.webp',
      amazonUrl: 'https://www.amazon.com/dp/YOUR_ASIN_1',
    },
    {
      title: 'The Social Security Decision',
      subtitle: 'A Complete Guide to Understanding, Calculating, and Maximizing Your Retirement Benefits',
      author: 'Amine Saadi',
      price: '$11.48',
      format: 'Paperback, Hardcover & Kindle',
      coverUrl: '/images/decision-cover.webp',
      amazonUrl: 'https://www.amazon.com/dp/YOUR_ASIN_2',
    },
  ]

  return (
    <div className="relative rounded-2xl border border-slate-700/60 bg-slate-800/60 p-5 shadow-2xl backdrop-blur-md sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
          <ShieldCheck size={14} />
          Official Amazon Published Books
        </div>
        <span className="text-[11px] font-medium text-slate-300">By Amine Saadi</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {books.map((book, index) => (
          <div
            key={`${book.title}-${index}`}
            className="group flex flex-col justify-between rounded-xl border border-slate-700/50 bg-slate-900/70 p-3.5 transition-all hover:border-slate-600"
          >
            <div>
              <div className="mb-2.5 flex gap-3">
                <div className="h-22 w-16 flex-shrink-0 overflow-hidden rounded border border-slate-700 bg-slate-800 shadow-md">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    width={64}
                    height={88}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="line-clamp-2 text-xs font-bold leading-tight text-white">
                    {book.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-[10px] text-slate-300">
                    {book.subtitle}
                  </p>
                  <span className="mt-1.5 inline-block rounded border border-emerald-800/50 bg-emerald-950/60 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                    {book.price} • {book.format}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 py-2 text-[11px] font-semibold text-slate-100 transition-colors hover:border-amber-500 hover:bg-amber-600 hover:text-white"
            >
              <span>Buy on Amazon</span>
              <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
