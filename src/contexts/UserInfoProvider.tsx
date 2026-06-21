import { useState, type ReactNode } from "react";
import useUserInfo from "../hooks/useUserInfo";
import UserInfoContext from "./userInfoContext";
import AuthenticationError from "../types/authenticationError";
import { useNavigate } from "react-router-dom";
import type { MutateOptions } from "@tanstack/react-query";
import type AuthenticationResponse from "../types/authenticationResponse";
import type AuthenticationRequest from "../types/authenticationRequest";

type Props = {
  children: ReactNode
};

export function UserInfoProvider({ children }: Props) {
  const { userInfo, services } = useUserInfo();
  const [loading, setLoading] = useState(false);
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleRegisterAttempt = (
    email: string,
    password: string,
    onSuccessCallBack?: () => void,
    onErrorCallBack?: () => void
  ) => {
    setLoading(true);
    setUserMessages([]);
    services.registerUser({ email, password }, {
      onSuccess: () => {
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: (error) => {
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
        if (onErrorCallBack) {
          onErrorCallBack();
        }
      },
      onSettled: () => {
        setLoading(false);
      }
    });
  }

  const handleLoginAttempt = (
    email: string,
    password: string,
    onSuccessCallBack?: () => void,
    onErrorCallBack?: () => void
  ) => {
    setLoading(true);
    setUserMessages([]);
    services.loginUser({ email, password }, {
      onSuccess: () => {
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: (error) => {
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
        if (onErrorCallBack) {
          onErrorCallBack();
        }
      },
      onSettled: () => {
        setLoading(false);
      }
    });
  }

  const handleLoginAttempt2 = (
    email: string,
    password: string,
    options?: MutateOptions<AuthenticationResponse, Error, AuthenticationRequest, unknown>
  ) => {
    setLoading(true);
    setUserMessages([]);
    services.loginUser({ email, password }, {
      ...options,
      onError: (error, variables, result, context) => {
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
        if (options && options.onError) {
          options.onError(error, variables, result, context);
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
    onSuccessCallBack?: () => void,
    onErrorCallBack?: () => void
  ) => {
    setLoading(true);
    setUserMessages([]);
    services.logoutUser(undefined, {
      onSuccess: () => {
        navigate("/");
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: (error?) => {
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
        if (onErrorCallBack) {
          onErrorCallBack();
        }
      },
      onSettled: () => {
        setLoading(false);
      }
    });
  }

  const userInfoContext = {
    userInfo,
    services,
    loading,
    setLoading,
    userMessages,
    setUserMessages,
    handleRegisterAttempt,
    handleLoginAttempt,
    handleLoginAttempt2,
    handleLogoutAttempt
  };

  return (
    <UserInfoContext.Provider value={userInfoContext}>
      {children}
    </UserInfoContext.Provider>
  );
}