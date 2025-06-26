"use server";
import { cookies } from "next/headers";

export const setRefreshCookie = async (refreshToken: string) => {
  const cookieStore = await cookies();

  cookieStore.set("refresh-token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
};
