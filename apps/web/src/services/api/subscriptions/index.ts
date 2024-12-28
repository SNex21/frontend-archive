import { Subscription } from "@/models";
import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { GetSubInfoProps, GetPlansSubscriptionProps, GetPlansSubscriptionRes } from "./types";


export const getSubscriptionInfo = async ({ token }: GetSubInfoProps): Promise<Subscription> => {
  const { data } = await apiClient.get<Subscription>(`${API_ENDPOINTS.PAYMENT}subscription`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getSubscriptionPlans = async ({ token }: GetPlansSubscriptionProps): Promise<GetPlansSubscriptionRes> => {
  const { data } = await apiClient.get<GetPlansSubscriptionRes>(`${API_ENDPOINTS.PAYMENT}plans`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
