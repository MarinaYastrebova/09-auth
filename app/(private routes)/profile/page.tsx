import { getMe } from '@/lib/api/serverApi';
import ProfilePage from '@/components/ProfilePage/ProfilePage';

export const metadata = {
  title: 'Profile Page',
  description: 'User profile',
};

export default async function Page() {
  const user = await getMe();

  return <ProfilePage user={user} />;
}
