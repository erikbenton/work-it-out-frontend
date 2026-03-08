import type RegistrationRequest from "../types/authenticationRequest";
import type RegistrationResponse from "../types/authenticationResponse";
import type UserInfo from "../types/userInfo";
import { baseUrl } from "../utils/config";

export async function register(request: RegistrationRequest): Promise<RegistrationResponse> {
  console.log('register', Date.now());
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request),
  };
  const response = await fetch(`${baseUrl}/authentication/register`, config);
  return (await response.json()) as RegistrationResponse;
}

export async function login(request: RegistrationRequest): Promise<RegistrationResponse> {
  console.log('login', Date.now());
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request),
  };
  const response = await fetch(`${baseUrl}/authentication/login`, config);
  return (await response.json()) as RegistrationResponse;
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