import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import type { AuthUser } from '../types';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    initialUser?: AuthUser | null;
}

// Custom render function that includes providers
export function renderWithProviders(ui: ReactElement, options: CustomRenderOptions = {}) {
    const { initialUser = null, ...renderOptions } = options;

    // Mock localStorage if initialUser is provided
    if (initialUser) {
        localStorage.setItem('forumApp_user', JSON.stringify(initialUser));
    }

    function Wrapper({ children }: PropsWithChildren) {
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
