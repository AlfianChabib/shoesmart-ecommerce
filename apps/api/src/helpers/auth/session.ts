import { User, UserProfile } from '@prisma/client';

export const sessionResponse = (user: User & { userProfile: UserProfile | null }) => {
  return {
    userId: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    avatarUrl: user.userProfile?.avatarUrl,
  };
};
