import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export { default } from "next-auth/middleware";
export default withAuth(
  function middleware(req) {
    // console.log({ req });

    if (
      req.nextUrl.pathname.startsWith("/admin/dashboard") &&
      req.nextauth.token.role !== process.env.ADMIN_KEY
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/dashboard/index",
    "/admin/dashboard/add-module",
    "/admin/dashboard/edit-module",
    "/admin/dashboard/users",
    "/admin/dashboard/support",
    "/admin/dashboard/departments",
  ],
};
