/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Dli Library | Modules";
export const contentType = "image/png";

export default async function og({ params }) {
  const id = params.id;
  const book = await axios.get(`${BASE_URL}/modules/get-single-module/${id}`);

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1"
            src={
              book?.thumbnail?.split("http").join("https") +
              "&w=1200&h=630&auto=format&q=75"
            }
            alt={book?.courseTitle}
          />
          {/* Overlay */}
          <div tw="absolute flex inset-0 bg-black bg-opacity-50" />
        </div>
        <div tw="flex flex-col text-neutral-50">
          {/* Title */}
          <div tw="text-7xl font-bold">
            {book?.courseCode} - {book?.courseTitle}
          </div>
          {/* Tags */}
          <div tw="flex mt-6 flex-wrap items-center text-4xl text-neutral-200">
            <div
              tw={`font-medium ${
                book?.courseTitle === "Cities"
                  ? "text-emerald-600"
                  : "text-indigo-600"
              }`}
            >
              {book?.courseTitle}
            </div>
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300 " />
            <div>{book}</div>
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
          </div>
        </div>
      </div>
    ),
    size
  );
}
