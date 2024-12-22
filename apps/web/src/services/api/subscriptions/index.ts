import { Subscription } from "@/models";
import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { GetSubInfoProps } from "./types";


export const getSubscriptionInfo = async ({ token }: GetSubInfoProps): Promise<Subscription> => {
  const { data } = await apiClient.get<Subscription>(`${API_ENDPOINTS.GET_SUBSCRIPTION_INFO}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
