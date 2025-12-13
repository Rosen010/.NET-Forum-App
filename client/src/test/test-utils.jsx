import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';

// Custom render function that includes providers
export function renderWithProviders(ui, options = {}) {
  const { initialUser = null, ...renderOptions } = options;

  // Mock localStorage if initialUser is provided
  if (initialUser) {
    localStorage.setItem('forumApp_user', JSON.stringify(initialUser));
  }

  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <UserProvider>
          {children}
        </UserProvider>
      </BrowserRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing-library
export * from '@testing-library/react';
export { renderWithProviders as render };