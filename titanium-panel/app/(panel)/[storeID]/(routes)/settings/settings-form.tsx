/* eslint-disable react/react-in-jsx-scope */
'use client';

import * as z from 'zod';
import axios from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

import { Modal } from '@/components/ui/shadcn/modal';
import { Input } from '@/components/ui/shadcn/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/shadcn/form';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';

const SettingsForm = async () => {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  return <div>homes</div>;
};

export default SettingsForm;
