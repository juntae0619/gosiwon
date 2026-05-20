"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isDatabaseEnabled } from "@/db";
import { createSession, destroySession } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import {
  createTempUser,
  getTempUserByEmail,
  verifyTempUserPassword,
} from "@/lib/temp-users";
import { createUser, getUserByEmail } from "@/lib/users-repository";

export type AuthFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseSignup(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
    agree: formData.get("agree") === "on",
  };
}

function parseLogin(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  };
}

export async function signupAction(
  _prev: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = parseSignup(formData);
  const fieldErrors: Record<string, string> = {};

  if (!parsed.name) fieldErrors.name = "이름을 입력하세요.";
  if (!parsed.email) fieldErrors.email = "이메일을 입력하세요.";
  else if (!EMAIL_RE.test(parsed.email))
    fieldErrors.email = "올바른 이메일 형식이 아닙니다.";
  if (!parsed.password) fieldErrors.password = "비밀번호를 입력하세요.";
  else if (parsed.password.length < 8)
    fieldErrors.password = "비밀번호는 8자 이상이어야 합니다.";
  if (parsed.password !== parsed.confirmPassword)
    fieldErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  if (!parsed.agree) fieldErrors.agree = "이용약관에 동의해 주세요.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "입력 내용을 확인해 주세요.",
      fieldErrors,
    };
  }

  const input = {
    name: parsed.name,
    email: parsed.email,
    phone: parsed.phone || undefined,
    password: parsed.password,
  };

  try {
    const user = isDatabaseEnabled()
      ? await createUser(input)
      : await createTempUser(input);

    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_EXISTS") {
      return {
        ok: false,
        message: "이미 가입된 이메일입니다.",
        fieldErrors: { email: "다른 이메일을 사용하거나 로그인해 주세요." },
      };
    }
    return {
      ok: false,
      message: "가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/?welcome=1");
}

export async function loginAction(
  _prev: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = parseLogin(formData);
  const fieldErrors: Record<string, string> = {};

  if (!parsed.email) fieldErrors.email = "이메일을 입력하세요.";
  if (!parsed.password) fieldErrors.password = "비밀번호를 입력하세요.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "입력 내용을 확인해 주세요.",
      fieldErrors,
    };
  }

  const email = parsed.email.toLowerCase();
  let user;

  if (isDatabaseEnabled()) {
    const stored = await getUserByEmail(email);
    if (!stored || !(await verifyPassword(parsed.password, stored.passwordHash))) {
      return {
        ok: false,
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      };
    }
    user = stored;
  } else {
    user = await verifyTempUserPassword(email, parsed.password);
    if (!user) {
      const exists = await getTempUserByEmail(email);
      return {
        ok: false,
        message: exists
          ? "비밀번호가 올바르지 않습니다."
          : "가입된 계정이 없습니다. 회원가입을 진행해 주세요.",
      };
    }
  }

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  revalidatePath("/", "layout");
  redirect("/");
}
