'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();

  const { user, setUser } = useAuthStore();

  if (!user) {
    return <div className={css.loading}>Loading profile...</div>;
  }

  const updateProfile = async (formData: FormData) => {
    const username = formData.get('username') as string;

    try {
      const updatedUserFromApi = await updateMe({ username });

      if (updatedUserFromApi) {
        setUser(updatedUserFromApi);
      } else {
        setUser({ ...user, username });
      }

      router.push('/profile');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Error updating profile');
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || '/default-avatar.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form className={css.profileInfo} action={updateProfile}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user.username}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>

            <button type="button" className={css.cancelButton} onClick={() => router.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
