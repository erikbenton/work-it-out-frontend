import { useMutation, useQueryClient, useSuspenseQuery, type UseMutateFunction } from "@tanstack/react-query";
import type UserInfo from "../types/userInfo";
import { getUserInfo, login, logout, register } from "../requests/authentication";
import type AuthenticationResponse from "../types/authenticationResponse";
import type AuthenticationRequest from "../types/authenticationRequest";

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
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    queryFn: getUserInfo
  });

  const registerUser = useMutation({
    mutationFn: async (request: AuthenticationRequest) => await register(request),
    onSuccess: (response: AuthenticationResponse) => {
      try {
        const user: UserInfo = { isLoggedIn: response.succeeded, email: response.userId };
        queryClient.setQueryData([queryKey], user);
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const loginUser = useMutation({
    mutationFn: async (request: AuthenticationRequest) => await login(request),
    onSuccess: (response: AuthenticationResponse) => {
      try {
        const user: UserInfo = { isLoggedIn: response.succeeded, email: response.userId };
        queryClient.setQueryData([queryKey], user);
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const logoutUser = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: (response: boolean) => {
      try {
        const user: UserInfo = { isLoggedIn: !response, email: undefined };
        queryClient.setQueryData([queryKey], user);
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