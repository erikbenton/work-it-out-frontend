import { useMutation, useQueryClient, useSuspenseQuery, type UseMutateFunction } from "@tanstack/react-query";
import { getUserInfo, login, logout, register } from "../requests/authentication";
import type AuthenticationResponse from "../types/authenticationResponse";
import type AuthenticationRequest from "../types/authenticationRequest";
import cacheTimes from "../utils/cacheTimes";
import type LoginInfo from "../types/loginInfo";
import type RegistrationRequest from "../types/registrationRequest";
import type UserInfo from "../types/userInfo";
import { updateUserInfo } from "../requests/userInfo";
import { queryKey as completedWorkoutsQueryKey, convertCompletedWorkouts } from "../hooks/useCompletedWorkouts";
import { queryKey as exerciseHistoryKey } from "../hooks/useExerciseHistory";
import { queryKey as userStatsKey } from "../hooks/useUserStats";
import { devConsole } from "../utils/debugLogger";
import type CompletedWorkout from "../types/completedWorkout";
import type { WeightUnit } from "../types/weightUnit";
import type { DistanceUnit } from "../types/distanceUnit";

export const queryKey = 'userInfo';

export type UserServices = {
  registerUser: UseMutateFunction<AuthenticationResponse, Error, RegistrationRequest, unknown>,
  loginUser: UseMutateFunction<AuthenticationResponse, Error, AuthenticationRequest, unknown>,
  logoutUser: UseMutateFunction<boolean, Error, void, unknown>,
  updateUser: UseMutateFunction<UserInfo, Error, UserInfo, unknown>,
  updateCachedWorkouts: (weightUnit: WeightUnit, distanceUnit: DistanceUnit) => void
}

export default function useUserInfo() {
  const queryClient = useQueryClient();
  const { data: userInfo, isError } = useSuspenseQuery<LoginInfo>({
    queryKey: [queryKey],
    staleTime: cacheTimes.day,
    gcTime: cacheTimes.day * 2,
    queryFn: getUserInfo
  });

  const registering = async (request: RegistrationRequest): Promise<AuthenticationResponse> => {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    return await register(request);
  }

  const loggingIn = async (request: AuthenticationRequest): Promise<AuthenticationResponse> => {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    return await login(request);
  }

  const registerUser = useMutation({
    mutationFn: async (request: RegistrationRequest) => await registering(request),
    onSuccess: (response: AuthenticationResponse) => {
      try {
        queryClient.cancelQueries();
        queryClient.clear();
        const { succeeded, email, userInfo } = response;
        const user: LoginInfo = { isLoggedIn: succeeded, email, userInfo };
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
        const { succeeded, email, userInfo } = response;
        const user: LoginInfo = { isLoggedIn: succeeded, email, userInfo: userInfo };
        queryClient.setQueryData([queryKey], user);
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const logoutUser = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      try {
        const user: LoginInfo = { isLoggedIn: false, email: undefined, userInfo: undefined };
        queryClient.setQueryData([queryKey], user);
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const updateUser = useMutation({
    mutationFn: async (userInfo: UserInfo) => await updateUserInfo(userInfo),
    onSuccess: (updatedInfo: UserInfo) => {
      try {
        const prevUser = queryClient.getQueryData([queryKey]) as LoginInfo;
        const updateUser = { ...prevUser, userInfo: updatedInfo };
        queryClient.setQueryData([queryKey], updateUser);
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const updateCachedWorkouts = (weightUnit: WeightUnit, distanceUnit: DistanceUnit) => {
    devConsole('updating completed workouts');
    const workouts = (queryClient.getQueryData([completedWorkoutsQueryKey]) ?? []) as CompletedWorkout[];
    // Only convert & set the data if there is any
    if (workouts.length > 0) {
      const convertedWorkouts = convertCompletedWorkouts(workouts, weightUnit, distanceUnit);
      queryClient.setQueryData([completedWorkoutsQueryKey], convertedWorkouts);
    }
    // Remove the calc'd cached queries so they can re-calc
    queryClient.removeQueries({ queryKey: [exerciseHistoryKey], exact: false });
    queryClient.removeQueries({ queryKey: [userStatsKey], exact: false });
  }

  return {
    userInfo,
    isError,
    services: {
      registerUser,
      loginUser,
      logoutUser,
      updateUser,
      updateCachedWorkouts
    }
  };
}