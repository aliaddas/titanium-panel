import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/shadcn/table';
import { Separator } from '@/components/ui/shadcn/separator';
import { Button } from '@/components/ui/shadcn/button';

export default function ForumPage() {
  return (
    <div>
      <Card className="ml-2">
        <CardContent className="p-4">
          <CardTitle className="text-2xl">Forum</CardTitle>
          <Separator />
          {/*DISCUSSION FORUM*/}
          <Card className="mt-2 mb-2 bg-amber-50">
            <CardHeader className="flex">
              <CardTitle className="text-xl">
                Discussions{' '}
                <Button className="ml-[900px]">Nieuwe post maken</Button>
              </CardTitle>

              <CardContent>
                <Table>
                  <TableCaption>
                    Discussions related to products availble in store
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8/12"></TableHead>
                      <TableHead className="text-right">Onderwerpen</TableHead>
                      <TableHead className="text-right">Berichten</TableHead>
                      <TableHead className="text-right">
                        Laatste Bericht
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="cursor-pointer">
                      <TableCell className="font-medium">
                        Nieuwe soort Sativa
                      </TableCell>
                      <TableCell className="text-right">3</TableCell>
                      <TableCell className="text-right">257</TableCell>
                      <TableCell className="text-right">
                        van <b>420younes</b>
                      </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer">
                      <TableCell className="font-medium">
                        Suggestie nieuwe product
                      </TableCell>
                      <TableCell className="text-right">6</TableCell>
                      <TableCell className="text-right">103</TableCell>
                      <TableCell className="text-right">
                        van <b>THC4Life</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="mt-2 mb-2">
            <CardHeader>
              <CardTitle className="text-xl">Reviews</CardTitle>
              <Separator />
            </CardHeader>
          </Card>
          <Card className="mt-2 mb-2">
            <CardHeader>
              <CardTitle className="text-xl">Information</CardTitle>
              <Separator />
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
