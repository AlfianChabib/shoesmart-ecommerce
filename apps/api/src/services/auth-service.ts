import { walkUpBindingElementsAndPatterns } from 'typescript';
import { prisma } from '../app/prisma';
import { ResponseError } from '../helpers/response-error';
import { RegisterPayload } from '../model/auth-model';

export class AuthService {
  static async register(payload: RegisterPayload) {
    try {
      const existEmail = await prisma.user.count({ where: { email: payload.email } });
      if (existEmail > 0) throw new ResponseError(400, 'Email already exist');
    } catch (error) {
      throw error;
    }
  }
}
