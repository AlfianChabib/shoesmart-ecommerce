import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type AvatarProfileProps = {
  avatarUrl?: string;
  username: string;
};

export default function AvatarProfile({ avatarUrl, username }: AvatarProfileProps) {
  const initialName = username.charAt(0).toUpperCase();

  return (
    <Avatar className="border-primary/50 border-2 border-e">
      <AvatarImage src={avatarUrl} alt={username} />
      <AvatarFallback className="text-foreground/70 font-medium">{initialName}</AvatarFallback>
    </Avatar>
  );
}
