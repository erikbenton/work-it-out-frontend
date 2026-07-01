import { useState, type ReactNode } from "react";
import useUserInfo from "../hooks/useUserInfo";
import UserInfoContext from "./userInfoContext";
import AuthenticationError from "../types/authenticationError";
import { useNavigate } from "react-router-dom";
import type { MutateOptions } from "@tanstack/react-query";
import type AuthenticationResponse from "../types/authenticationResponse";
import type AuthenticationRequest from "../types/authenticationRequest";
import type RegistrationRequest from "../types/registrationRequest";
import type UserInfo from "../types/userInfo";
import { weightUnits } from "../types/weightUnit";
import { distanceUnits } from "../types/distanceUnit";

type Props = {
  children: ReactNode
};

const defaultUserInfo: UserInfo = {
  bodyWeight: 68,
  weightUnit: weightUnits[0],
  distanceUnit: distanceUnits[0]
}

export function UserInfoProvider({ children }: Props) {
  const { userInfo: user, services } = useUserInfo();
  const [loading, setLoading] = useState(false);
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleRegisterAttempt = (
    email: string,
    password: string,
    userInfo: UserInfo,
    options?: MutateOptions<AuthenticationResponse, Error, RegistrationRequest, unknown>
  ) => {
    setLoading(true);
    setUserMessages([]);
    services.registerUser({ email, password, ...userInfo }, {
      ...options,
      onError: (error, variables, result, context) => {
        if (options && options.onError) {
          options.onError(error, variables, result, context);
        }
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
      },
      onSettled: (data, error, variables, result, context) => {
        if (options && options.onSettled) {
          options.onSettled(data, error, variables, result, context);
        }
        setLoading(false);
      }
    });
  }

  const handleLoginAttempt = (
    email: string,
    password: string,
    options?: MutateOptions<AuthenticationResponse, Error, AuthenticationRequest, unknown>
  ) => {
    setLoading(true);
    setUserMessages([]);
    services.loginUser({ email, password }, {
      ...options,
      onError: (error, variables, result, context) => {
        if (options && options.onError) {
          options.onError(error, variables, result, context);
        }
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
      },
      onSettled: (data, error, variables, result, context) => {
        if (options && options.onSettled) {
          options.onSettled(data, error, variables, result, context);
        }
        setLoading(false);
      }
    });
  }

  const handleLogoutAttempt = (
    options?: MutateOptions<boolean, Error, void, unknown>
  ) => {
    setLoading(true);
    setUserMessages([]);
    services.logoutUser(undefined, {
      ...options,
      onSuccess: (data, variables, result, context) => {
        if (options && options.onSuccess) {
          options.onSuccess(data, variables, result, context);
        }
        navigate("/");
      },
      onError: (error, variables, result, context) => {
        if (options && options.onError) {
          options.onError(error, variables, result, context);
        }
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
      },
      onSettled: (data, error, variables, result, context) => {
        if (options && options.onSettled) {
          options.onSettled(data, error, variables, result, context);
        }
        setLoading(false);
      }
    });
  }

  const userInfoContext = {
    user,
    defaultUserInfo,
    services,
    loading,
    setLoading,
    userMessages,
    setUserMessages,
    handleRegisterAttempt,
    handleLoginAttempt,
    handleLogoutAttempt
  };

  return (
    <UserInfoContext.Provider value={userInfoContext}>
      {children}
    </UserInfoContext.Provider>
  );
}