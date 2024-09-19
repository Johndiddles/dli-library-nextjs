export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.NEXT_PUBLIC_BASE_URL;

export const CLIENT_ORIGIN =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_CLIENT_ORIGIN_LOCAL
    : process.env.NEXT_PUBLIC_CLIENT_ORIGIN;

export const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;
