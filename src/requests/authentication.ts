import type AuthenticationRequest from "../types/authenticationRequest";
import type AuthenticationResponse from "../types/authenticationResponse";
import { baseUrl } from "../utils/config";
import { devConsole } from "../utils/debugLogger";
import AuthenticationError from "../types/authenticationError";
import type ErrorMessages from "../types/errorMessages";
import type LoginInfo from "../types/loginInfo";
import type RegistrationRequest from "../types/registrationRequest";

const usernameErrorRegex = /Username '.*' is already taken./;

export async function register(request: RegistrationRequest): Promise<AuthenticationResponse> {
  devConsole('register', Date.now());
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request),
  };
  const response = await fetch(`${baseUrl}/authentication/register`, config);
  if (!response.ok) {
    const error = (await response.json()) as ErrorMessages;
    const messages = error.errors.filter(mes => !usernameErrorRegex.test(mes));
    throw new AuthenticationError("Error registering user.", messages);
  }
  return (await response.json()) as AuthenticationResponse;
}

export async function login(request: AuthenticationRequest): Promise<AuthenticationResponse> {
  devConsole('login', Date.now());
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request),
  };
  const response = await fetch(`${baseUrl}/authentication/login`, config);
  if (!response.ok) {
    const error = (await response.json()) as ErrorMessages;
    throw new AuthenticationError("Error logging user in.", error.errors);
  }
  return (await response.json()) as AuthenticationResponse;
}

export async function logout(): Promise<boolean> {
  devConsole('logout', Date.now());
  const config = {
    method: 'POST'
  };
  const response = await fetch(`${baseUrl}/authentication/logout`, config);
  return response.ok;
}

export async function getUserInfo(): Promise<LoginInfo> {
  devConsole('fetching user info', Date.now());
  const response = await fetch(`${baseUrl}/authentication/userInfo`);
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  return (await response.json()) as LoginInfo;
}