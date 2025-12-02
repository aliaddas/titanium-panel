'use client';

import dynamic from 'next/dynamic';

//? Some weird import statement to make sure the component is not server-side rendered
const ApplicationHeaderRaw = dynamic(
  () => import('./application-header.tsx').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[11vh] md:min-h-[7vh] bg-card rounded-3xl animate-pulse" />
    ),
  },
);

interface ApplicationHeaderProps {
  stores: any;
  params: { storeID: string };
}

export default function ApplicationHeader({
  stores,
  params,
}: ApplicationHeaderProps) {
  return <ApplicationHeaderRaw stores={stores} params={params} />;
}
