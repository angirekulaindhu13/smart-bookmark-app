'use client'

import { supabase } from '@/lib/supabase'

export default function Home() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Ensure this matches your Supabase dashboard settings
        redirectTo: 'http://localhost:3000/dashboard'
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      
      {/* The Card: Light Brown background with deep rounded corners */}
      <div className="w-full max-w-[420px] bg-[#F5F1EE] pt-14 pb-10 px-10 rounded-[2.5rem] shadow-sm flex flex-col items-center">
        
        {/* Title and Icon */}
        <div className="flex items-center gap-2 mb-4">
           <span className="text-2xl">🔖</span>
           <h1 className="text-[26px] font-bold text-[#3E3A37]">
            Smart Bookmark
          </h1>
        </div>

        {/* Description with specific max-width to match the first image's wrap */}
        <p className="text-[#7D7671] text-center text-[14px] leading-relaxed mb-10 max-w-[280px]">
          Save your links, keep them private, and sync instantly across tabs.
        </p>

        {/* Brown Button with fixed Google Icon container */}
        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 bg-[#8B5E3C] hover:bg-[#724d31] text-white py-4 rounded-xl font-semibold transition-all shadow-md active:scale-[0.98] overflow-visible"
        >
          {/* White circle container for the Google Logo to prevent cutoff */}
          <div className="flex items-center justify-center bg-white rounded-full p-1.5 min-w-[32px] min-h-[32px]">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <span className="whitespace-nowrap">Continue with Google</span>
        </button>
      
      </div>
    </div>
  )
}