import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App.tsx';
import ActiveWorkoutProvider from './components/activeWorkout/components/ActiveWorkoutProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <CssBaseline />
        <Router>
          <QueryClientProvider client={queryClient}>
            <ActiveWorkoutProvider>
              <App />
            </ActiveWorkoutProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Router>
    </StyledEngineProvider>
  </StrictMode>,
);
