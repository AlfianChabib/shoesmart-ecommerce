import { SessionData } from '@/components/providers/session-provider';
import { initialSession } from '@/constants/session';
import { api, authApi } from '@/lib/axios';
import { LoginPayload, RegisterPayload, VerificationPayload } from '@/models/auth-model';
import { SuccessResponse } from '@/types/api';
import { ErrorHandler } from '@/utils/error-handler';

export class AuthService {
  static async register(payload: RegisterPayload) {
    try {
      const res = await api.post<SuccessResponse>('/auth/register', payload);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  }

  static async checkToken(token: string) {
    try {
      const res = await api.get(`/auth/register/check/${token}`);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  }

  static async accountVerification(payload: VerificationPayload): Promise<SuccessResponse> {
    try {
      const res = await api.post<SuccessResponse>('/auth/register/verify', payload);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  }

  static async signIn(payload: LoginPayload) {
    try {
      const res = await api.post<SuccessResponse & { accessToken: string }>('/auth/login', payload);
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  }

  static async getSession(): Promise<SessionData> {
    try {
      const res = await authApi.get('/auth/session');
      const data = res.data.data;
      return {
        ...data,
        isAuthenticated: true,
      };
    } catch (error) {
      return initialSession;
    }
  }

  static async signOut() {
    try {
      const res = await authApi.post<SuccessResponse>('/auth/logout');
      return res.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  }
}
