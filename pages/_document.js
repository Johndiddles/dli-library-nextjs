import { Html, Head, Main, NextScript } from "next/document";
import connectDB from "../db/connect";

connectDB();
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
