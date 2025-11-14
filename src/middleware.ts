import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ClerkAuthObject } from '@/types/clerk'

// 1. Define your route matchers
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/' 
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)'
]);

export default clerkMiddleware(async (auth: ClerkAuthObject, req: NextRequest) => {
  
  // 2. Check if the route is an admin route
  if (isAdminRoute(req)) {
    // If the user isn't logged in, redirect to sign-in
    if (!auth.userId) {
      return auth.redirectToSignIn({ returnBackUrl: req.url });
    }

    // Check the role from the user's public metadata
    const role = auth.user?.publicMetadata?.role;

    if (role !== 'admin') {
      // Not an admin. Redirect them to the homepage
      const homeUrl = new URL('/', req.url);
      return NextResponse.redirect(homeUrl);
    }
    
    // User is logged in AND is an admin. Allow them.
    return; 
  }

  // 3. If not an admin route, check if it's a public route
  if (isPublicRoute(req)) {
    return;
  }

  // 4. If not admin and not public, protect it (requires login)
  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}