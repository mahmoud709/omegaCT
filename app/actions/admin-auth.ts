"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    username === (process.env.ADMIN_USER || "admin") &&
    password === (process.env.ADMIN_PASS || "omega2026")
  ) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    redirect("/admin");
  } else {
    throw new Error("Invalid credentials");
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
