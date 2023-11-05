import { NextResponse } from 'next/server'

export function GET () {
  return NextResponse.redirect('/api/some/route', { status: 307 })
}
