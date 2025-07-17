import arcjet, { createMiddleware, detectBot, shield } from '@arcjet/next';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const aj = arcjet({
  key : process.env.ARCJET_KEY, 
  rules :[
    shield({
      mode:'LIVE'
    }),
    detectBot({
      MODE:'LIVE',
      allow:[
        "CATEGORY : SEARCH_ENGINE", "GO_HTTP"
      ]
    })
  ]
})

const isProtectedRoute  = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)"

])


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

const clerk = clerkMiddleware(async(auth,request)=>{
  const {userId,redirectToSignIn} = await auth();
  if(!userId && isProtectedRoute(request)){

      return redirectToSignIn();


  }
});

export default createMiddleware(aj,clerk);