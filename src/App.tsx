import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Fonts, GlobalStyle } from './config/globalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/config/theme';
import useFullVH from '@/hooks/useFullVH';

import Home from './pages/Home';
import Search from './pages/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search',
    element: <Search />,
  },
]);

function App() {
  useFullVH();

  return (
    <ThemeProvider theme={theme}>
      <Fonts />
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
