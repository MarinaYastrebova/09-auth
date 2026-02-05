'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkSession, getMe, logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

interface Props {
  children: React.ReactNode;
}

const PRIVATE_ROUTES = ['/profile', '/notes'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export default function AuthProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { setUser, clearIsAuthenticated } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));

      const isAuthRoute = AUTH_ROUTES.includes(pathname);

      try {
        const sessionUser = await checkSession();

        if (!sessionUser) {
          if (isPrivateRoute) {
            await logout();
            clearIsAuthenticated();
            router.push('/sign-in');
            return;
          }

          setIsLoading(false);
          return;
        }

        const fullUser = await getMe();
        setUser(fullUser);

        if (isAuthRoute) {
          router.push('/profile');
          return;
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
