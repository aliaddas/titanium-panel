import prismadb from '@/lib/prismadb';

import AssetLibrary from './components/asset-library';

type AssetLibraryProps = {
  params: { storeID: string };
};

const AssetLibraryPage: React.FC<AssetLibraryProps> = async ({ params }) => {
  const { storeID } = await params;

  const store = await prismadb.store.findFirst({
    where: {
      ID: storeID,
    },
  });

  return <AssetLibrary />;
};

export default AssetLibraryPage;
