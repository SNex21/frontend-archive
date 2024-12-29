import { Plan, PaymentUrl } from "@/models";

export interface GetSubInfoProps {
    token: string;
  }

export interface GetPlansSubscriptionProps {
  token: string;
}

export interface GetPaymentUrlReq {
  email: string;
  plan_id: number;

  token: string;
}

export type GetPlansSubscriptionRes = Plan[];

export type GetPayUrlRes = PaymentUrl;
