import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const authRoute = createRouteMatcher("/dashboard");
const guestRoute = createRouteMatcher(["/login", "/register"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // if (authRoute(request) && !userId) {
  //   return redirectToSignIn();
  // }

  if (guestRoute(request) && userId) {
    return NextResponse.redirect(new URL("/dashboard/riwayat-transaksi", request.url));
  }
});

// * https://clerk.com/docs/references/nextjs/clerk-middleware
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
