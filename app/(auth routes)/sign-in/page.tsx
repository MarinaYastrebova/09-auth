'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginData } from '@/lib/api/clientApi';
import type { APIError } from '@/app/api/api';
import css from './SignInPage.module.css';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setError('');

    try {
      const formValues = Object.fromEntries(formData) as unknown as LoginData;

      const res = await login(formValues);

      if (res) {
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as APIError).response?.data?.error ??
          (error as APIError).message ??
          'Oops... something went wrong'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
