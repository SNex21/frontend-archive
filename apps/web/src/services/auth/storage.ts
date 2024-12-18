export const ACCESS_TOKEN_NAME = "access_token";
export const USER_ID_NAME = "user_id";

export const saveAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
  // return new Promise((resolve, reject) => {
    
  // });
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_NAME);
  // return new Promise((resolve, reject) => {
    
  // });
};

export const saveUserId = (userId: number) => {
  localStorage.setItem(USER_ID_NAME, userId.toString());
  // return new Promise((resolve, reject) => {
    
  // });
};

export const removeUserId = () => {
  localStorage.removeItem(USER_ID_NAME);
  // return new Promise((resolve, reject) => {
  // });
};
