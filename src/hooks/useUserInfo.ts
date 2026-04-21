import { useMutation, useQueryClient, useSuspenseQuery, type UseMutateFunction } from "@tanstack/react-query";
import type UserInfo from "../types/userInfo";
import { getUserInfo, login, logout, register } from "../requests/authentication";
import type AuthenticationResponse from "../types/authenticationResponse";
import type AuthenticationRequest from "../types/authenticationRequest";
import cacheTimes from "../utils/cacheTimes";

const queryKey = 'userInfo';

export type UserServices = {
  registerUser: UseMutateFunction<AuthenticationResponse, Error, AuthenticationRequest, unknown>,
  loginUser: UseMutateFunction<AuthenticationResponse, Error, AuthenticationRequest, unknown>,
  logoutUser: UseMutateFunction<boolean, Error, void, unknown>
}

export default function useUserInfo() {
  const queryClient = useQueryClient();
  const { data: userInfo, isError } = useSuspenseQuery<UserInfo>({
    queryKey: [queryKey],
    staleTime: cacheTimes.day,
    gcTime: cacheTimes.day * 2,
    queryFn: getUserInfo
  });

  const registering = async (request: AuthenticationRequest): Promise<AuthenticationResponse> => {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    return await register(request);
  }

  const loggingIn = async (request: AuthenticationRequest): Promise<AuthenticationResponse> => {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    return await login(request);
  }

  const loggingOut = async (): Promise<boolean> => {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    return await logout();
  }

  const registerUser = useMutation({
    mutationFn: async (request: AuthenticationRequest) => await registering(request),
    onSuccess: (response: AuthenticationResponse) => {
      try {
        queryClient.cancelQueries();
        queryClient.clear();
        const user: UserInfo = { isLoggedIn: response.succeeded, email: response.userName };
        queryClient.setQueryData([queryKey], user);
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const loginUser = useMutation({
    mutationFn: async (request: AuthenticationRequest) => await loggingIn(request),
    onSuccess: (response: AuthenticationResponse) => {
      try {
        queryClient.cancelQueries();
        queryClient.clear();
        const user: UserInfo = { isLoggedIn: response.succeeded, email: response.userName };
        queryClient.setQueryData([queryKey], user);
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const logoutUser = useMutation({
    mutationFn: async () => await loggingOut(),
    onSuccess: () => {
      try {
        const user: UserInfo = { isLoggedIn: false, email: undefined };
        queryClient.setQueryData([queryKey], user);
        queryClient.cancelQueries();
        queryClient.clear();
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  return {
    userInfo,
    isError,
    services: {
      registerUser,
      loginUser,
      logoutUser
    }
  };
}