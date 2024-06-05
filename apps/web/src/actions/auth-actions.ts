'use server';
import { cookies } from 'next/headers';

import { api } from '@/lib/axios';
import { LoginPayload } from '@/models/auth-model';

export const signIn = async (payload: LoginPayload) => {
  try {
    const res = await api.post('/auth/login', payload);
    if (res.data.accessToken) {
      cookies().set('token', res.data.accessToken);
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
