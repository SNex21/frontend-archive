interface User {
  id: number;
  username: string;
  telegramId?: number;
  avatarUrl?: string;
  create_datetime: Date;
  settings: {
    notifications: boolean;
  };
}

interface UserStats {
  streak: number;
  total_tasks: number;
  accuracy: number;
}

export { type User, type UserStats };
