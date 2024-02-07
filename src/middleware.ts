import { DB } from 'config/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/erp/(.*)',
};

export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname);
  return NextResponse.next();
}
