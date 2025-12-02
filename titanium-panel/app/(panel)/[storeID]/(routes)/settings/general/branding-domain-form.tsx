'use client';

//>> UI imports
import { Input } from '@/components/ui/shadcn/input';
import { Button } from '@/components/ui/shadcn/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/shadcn/form';

//>> Hooks
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
//>> Libraries
import { Store } from '@prisma/client';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

interface GeneralSettingsFormProps {
  initialData: Store | null;
}
const GeneralSettingsForm: React.FC<GeneralSettingsFormProps> = ({
  initialData,
}) => {
  //?
  const params = useParams();
  const router = useRouter();
  //? Form states
  const [loading, setLoading] = useState(false);

  //? Form schema
  const generalSettingsFormSchema = z.object({
    storeName: z.string().min(3),
  });

  const generalSettingsForm = useForm<
    z.infer<typeof generalSettingsFormSchema>
  >({
    resolver: zodResolver(generalSettingsFormSchema),
    defaultValues: {
      storeName: initialData?.name,
    },
  });

  const [storeName, setStoreName] = useState(initialData?.name || '');

  useEffect(() => {
    setStoreName(initialData?.name || '');
  }, [initialData]);

  //? Form submit handler
  const onSubmit = async (data: z.infer<typeof generalSettingsFormSchema>) => {
    setLoading(true);
    try {
      //? Submit form data}
      axios.patch(`/api/store/${params.storeID}`, { name: data.storeName });
      router.refresh();
      console.log(data);
    } catch (error) {
      toast.error('Something went wrong 😐');
    } finally {
      setLoading(false);
      toast.success('Changes saved successfully! 🎉');
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Toaster />

      <Form {...generalSettingsForm}>
        <form onSubmit={generalSettingsForm.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 space-y-4 gap-4 mb-10">
            <div className="col-span-2 lg:col-span-1">
              <FormField
                control={generalSettingsForm.control}
                name="storeName"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Webshop Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field.field} //@ Actual Value from DB
                        disabled={loading}
                        placeholder="Webshop Name"
                        className="mt-1 block w-full px-3 py-2 border text-md border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                        onChange={(e: any) => {
                          setStoreName(e.target.value);
                          generalSettingsForm.setValue(
                            'storeName',
                            e.target.value,
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            disabled={loading || initialData?.name === storeName}
            type="submit"
            onClick={() => {
              setStoreName(storeName);
            }}
          >
            {initialData?.name === storeName ? 'Changes Saved' : 'Save Changes'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GeneralSettingsForm;
