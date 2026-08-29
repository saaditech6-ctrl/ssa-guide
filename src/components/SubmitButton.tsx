"use client"

import { useFormStatus } from "react-dom"

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#071530] hover:bg-[#0b2045] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-xs active:scale-[0.99] flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none w-full"
    >
      {pending ? (
        <>
          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Sending...
        </>
      ) : (
        "Send Message"
      )}
    </button>
  )
}