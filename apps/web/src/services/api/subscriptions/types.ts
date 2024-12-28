import { Plan } from "@/models";

export interface GetSubInfoProps {
    token: string;
  }

export interface GetPlansSubscriptionProps {
  token: string;
}

export type GetPlansSubscriptionRes = Plan[];
