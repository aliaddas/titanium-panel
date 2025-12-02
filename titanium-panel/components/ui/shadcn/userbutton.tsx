import { UserButton } from '@clerk/nextjs';
import { Popover, PopoverContent } from '@/components/ui/shadcn/popover';
import { Card, CardContent } from '@/components/ui/shadcn/card';

export default function AuthUserButton() {
  return <UserButton showName={true} />;
}
