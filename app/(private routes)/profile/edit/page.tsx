'use client';

import { useEffect, useState } from 'react';
import { getMe } from '@/lib/api/clientApi';
import type { User } from '@/types/user';
import EditProfilePage from '@/components/EditProfilePage/EditProfilePage';

export default function Page() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe().then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return <EditProfilePage user={user} />;
}
