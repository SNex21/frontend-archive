interface User {
  id: number;
  username: string;
  telegramId?: number;
  avatarUrl?: string;
  create_datetime: Date;
  subscription: Subscription | null;
  settings: {
    notifications: boolean;
  };
}

interface Subscription {
  start_date: string;
  end_date: string;
  plan: number;
  price: number;
  type: string;
}

interface UserStats {
  streak: number;
  total_tasks: number;
  accuracy: number;
}

export { type User, type UserStats };
