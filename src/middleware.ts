import { registerUser } from 'middlewares/erp/register';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Limit the middleware to paths starting with `/api/`
// export const config = {
//   matcher: '/api/(.*)',
// };

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.includes('api/erp/register')) {
    const reqTransformed = await request.json();

    return registerUser(reqTransformed);
  }

  return NextResponse.next();
}
