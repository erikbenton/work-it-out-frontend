import type UserInfo from "../types/userInfo";

const baseUrl = 'https://localhost:7185/api';

export async function register(email: string, password: string): Promise<boolean> {
  console.log('register', Date.now());
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch(`${baseUrl}/authentication/register`, config);
  return response.ok;
}

export async function login(email: string, password: string): Promise<boolean> {
  console.log('login', Date.now());
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch(`${baseUrl}/authentication/login`, config);
  return response.ok;
}

export async function logout(): Promise<boolean> {
  console.log('logout', Date.now());
  const config = {
    method: 'POST'
  };
  const response = await fetch(`${baseUrl}/authentication/logout`, config);
  return response.ok;
}

export async function getUserInfo(): Promise<UserInfo> {
  console.log('fetching user info', Date.now());
  const response = await fetch(`${baseUrl}/authentication/userInfo`);
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  return (await response.json()) as UserInfo;
}