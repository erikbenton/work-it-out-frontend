import { useState, type ReactNode } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import UserInfoContext from "../../contexts/userInfoContext";
import AuthenticationError from "../../types/authenticationError";

type Props = {
  children: ReactNode
};

export function UserInfoProvider({ children }: Props) {
  const { userInfo, services } = useUserInfo();
  const [loading, setLoading] = useState(false);
  const [userMessages, setUserMessages] = useState<string[]>([]);

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
        setLoading(false);
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: (error) => {
        setLoading(false);
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
        if (onErrorCallBack) {
          onErrorCallBack();
        }
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
        setLoading(false);
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: (error) => {
        setLoading(false);
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
        if (onErrorCallBack) {
          onErrorCallBack();
        }
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
        setLoading(false);
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: (error?) => {
        setLoading(false);
        if (error instanceof AuthenticationError) {
          setUserMessages(error.userMessages);
        }
        if (onErrorCallBack) {
          onErrorCallBack();
        }
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
    handleLogoutAttempt
  };

  return (
    <UserInfoContext.Provider value={userInfoContext}>
      {children}
    </UserInfoContext.Provider>
  );
}