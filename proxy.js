import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";


export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-facility", "/my-bookings", "/manage-facilities", "/facilities/:path*"],
};