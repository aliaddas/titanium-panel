'use client';
import React from 'react';
import { ProfileForm } from './profile-form';

import { Card, CardContent, CardHeader } from '@/components/ui/shadcn/card';
import { Badge } from '@/components/ui/shadcn/badge';
import { Separator } from '@/components/ui/shadcn/separator';

const ProfilePage = () => (
  <div className="pl-10">
    <h3 className="text-lg font-medium">Profile</h3>
    <p className="text-sm text-muted-foreground">
      This is how others will see you on the site.
    </p>
    <Separator />
    <ProfileForm />
  </div>
);

export default ProfilePage;
