import './App.css';
import Navbar from './components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from './components/layout/ErrorMessage';
import { QueryErrorResetBoundary, useQueryClient, type QueryErrorResetFunction } from '@tanstack/react-query';
import ActiveWorkoutProvider from './components/activeWorkout/components/ActiveWorkoutProvider';
import { UserInfoProvider } from './components/layout/UserInfoProvider';
import Router from './Routes';
import { queryKey as userQueryKey } from './hooks/useUserInfo';
import type UserInfo from './types/userInfo';

interface ErrorDetailsShort {
  reason: "imperative-api";
  args: unknown[];
}

interface ErrorDetailsLong {
  reason: "keys";
  prev: unknown[] | undefined;
  next: unknown[] | undefined;
}

export default function App() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleReset = (reset: QueryErrorResetFunction, details?: ErrorDetailsShort | ErrorDetailsLong) => {
    queryClient.cancelQueries();
    if (details && details.reason === "imperative-api") {
      if (details.args[0] === 'reload') {
        const user: UserInfo = { isLoggedIn: false, email: undefined };
        queryClient.setQueryData([userQueryKey], user);
      }
    }
    reset();
    navigate('/');
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={ErrorMessage} onReset={(details?) => { handleReset(reset, details) }}>
          <UserInfoProvider>
            <ActiveWorkoutProvider>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  pt: '64px'
                }}
              >
                <Navbar />
                <Router />
              </Box>
            </ActiveWorkoutProvider>
          </UserInfoProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
