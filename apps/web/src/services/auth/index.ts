import { authClient } from "./client";
import { API_ENDPOINTS } from "../api/endpoints";
import { AuthTelegramMiniAppReq, AuthTelegramMiniAppRes, type CheckUsernameReq } from "./types";
import { removeAccessToken, removeUserId, saveAccessToken, saveUserId } from "@/services/auth/storage.ts";

export const checkUsername = async ({ username, cancelToken }: CheckUsernameReq) => {
  const responseData: CheckUsernameReq = { username };
  const { data } = await authClient.get(API_ENDPOINTS.CHECK_USERNAME, { cancelToken, params: responseData });
  return data;
};

export const authTelegramMiniApp = async (responseData: AuthTelegramMiniAppReq) => {
  const { data } = await authClient.post<AuthTelegramMiniAppRes>(API_ENDPOINTS.AUTH_TELEGRAM_MINI_APP, responseData);
  return data;
};

export async function login({ token, userId }: { token: string; userId: number }) {
  await saveAccessToken(token);
  await saveUserId(userId);
}

export async function logout() {
  await removeAccessToken();
  await removeUserId();
}
