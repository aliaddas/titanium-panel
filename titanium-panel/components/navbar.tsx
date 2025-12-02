/* eslint-disable react/react-in-jsx-scope */

import { Card } from './ui/shadcn/card';

const Navbar = async () => {
  return (
    <Card className="ml-2 mb-2">
      <div className="flex h-12 items-center">
        <div className="ml-auto mr-2 flex item-center"></div>
      </div>
    </Card>
  );
};

export default Navbar;
