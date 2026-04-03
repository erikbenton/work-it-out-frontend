import { useState, type ReactNode } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import UserInfoContext from "../../contexts/userInfoContext";

type Props = {
  children: ReactNode
};

export function UserInfoProvider({ children }: Props) {
  const { userInfo, services } = useUserInfo();
  const [loading, setLoading] = useState(false);

  const handleRegisterAttempt = (
    email: string,
    password: string,
    onSuccessCallBack?: () => void,
    onErrorCallBack?: () => void
  ) => {
    setLoading(true);
    services.registerUser({ email, password }, {
      onSuccess: () => {
        setLoading(false);
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: () => {
        setLoading(false);
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
    services.loginUser({ email, password }, {
      onSuccess: () => {
        setLoading(false);
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: () => {
        setLoading(false);
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
    services.logoutUser(undefined, {
      onSuccess: () => {
        setLoading(false);
        if (onSuccessCallBack) {
          onSuccessCallBack();
        }
      },
      onError: () => {
        setLoading(false);
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