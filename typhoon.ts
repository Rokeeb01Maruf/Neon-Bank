import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value ?? null,
        set: (name: string, value: string, options: any) => {
          res.cookies.set(name, value, options)
        },
        remove: (name: string, options: any) => {
          res.cookies.delete(name)
        },
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.error("Auth error:", error.message)
  }

  if (!user) {
    return NextResponse.redirect(new URL('/Login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:id*'],
}
