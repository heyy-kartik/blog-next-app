import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// 1. Define your route matchers
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/' // Example: Make the homepage public
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  
  // 2. Check if the route is an admin route
  if (isAdminRoute(req)) {
    const { sessionClaims } = auth();

    // If the user isn't logged in, redirect to sign-in
    if (!sessionClaims) {
      return auth().redirectToSignIn({ returnBackUrl: req.url });
    }

    // If they are logged in, check if they are an admin
    // This reads from the "Public Metadata" you set in your Clerk Dashboard
    if (sessionClaims.metadata?.role !== 'admin') {
      
      // Not an admin. Redirect them to a safe page (e.g., the homepage)
      // You could also create a custom /unauthorized page
      const homeUrl = new URL('/', req.url);
      return NextResponse.redirect(homeUrl);
    }
    
    // User is logged in AND is an admin. Allow them to proceed.
    return; 
  }

  // 3. If not an admin route, check if it's a public route
  if (isPublicRoute(req)) {
    // Allow access to public routes
    return;
  }

  // 4. If not admin and not public, it's a standard protected route
  // (e.g., /dashboard, /profile). Just protect it.
  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}