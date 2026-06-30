import type UserInfo from "../types/userInfo";
import { baseUrl } from "../utils/config";
import { devConsole } from "../utils/debugLogger";


export async function updateUserInfo(userInfo: UserInfo): Promise<UserInfo> {
  devConsole('Updating user info ' + (userInfo.username ?? ''));
  const config = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo),
  };

  const response = await fetch(`${baseUrl}/users`, config);

  if (!response.ok) {
    throw new Error('Failed to update user info with username: ' + (userInfo.username ?? ''));
  }

  return (await response.json()) as UserInfo;
}