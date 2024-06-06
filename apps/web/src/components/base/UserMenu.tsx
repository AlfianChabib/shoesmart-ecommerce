'use client';

import AvatarProfile from './AvatarProfile';
import { LogOut } from 'lucide-react';
import { useCurrentSession } from '../providers/session-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth-service';
import { queryClient } from '@/lib/query';
import { toast } from 'sonner';

export default function UserMenu() {
  const session = useCurrentSession();

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: async () => {
      return await AuthService.signOut();
    },
    onSuccess: (res) => {
      queryClient.resetQueries();
      sessionStorage.removeItem('accessToken');
      toast.success(res.message);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleLogout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full outline-none transition-all hover:scale-105">
        <AvatarProfile avatarUrl={session.avatarUrl} username={session.username} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={16} className="min-w-56">
        <DropdownMenuLabel className="capitalize">{session.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-between" onClick={handleLogout} disabled={isPending}>
          <span>Sign out</span>
          <LogOut size={16} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
