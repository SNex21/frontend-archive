import { Subscription } from "@/models";
import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";


export const getSubscriptionInfo = async ({ token }: GetSubInfoProps): Promise<Subscription> => {
  const { data } = await apiClient.get<User>(`${API_ENDPOINTS.GET_SUBSCRIPTION_INFO}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
