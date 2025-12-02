'use client';

import { Squircle } from '@squircle-js/react';
import Image from 'next/image';
import { NavMenu } from '@/components/nav-menu';
import { CardContent } from '@/components/ui/shadcn/card';
import { useScrollContext } from '@/providers/scroll-provider';
import { UserActions } from '@/components/ui/shadcn/user-actions';
import { Inter } from 'next/font/google';
import { useDeviceType } from '@/hooks/use-device-type';
import { Store } from '@prisma/client';
import GrainedEffectProvider from '@/components/css/grained-effect';
import { motion } from 'framer-motion'; // Make sure to import motion for animations
import useHideHeader from '@/hooks/use-hideheader';

const inter = Inter({ subsets: ['cyrillic'], weight: '400' });

interface ApplicationHeaderProps {
  stores: Store[];
  params: { storeID: string };
}

const ApplicationHeaderRaw = ({ stores, params }: ApplicationHeaderProps) => {
  const {
    isMobile,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    is2XLargeDevice,
  } = useDeviceType();

  return (
    <div
      className={`${inter.className} rounded-3xl drop-shadow-md z-50 sticky top-0 transition-transform duration-250 ease-in-out transform `}
    >
      <Squircle
        id=""
        cornerRadius={19}
        cornerSmoothing={1}
        className="border-0 min-w-full min-h-[11vh] md:min-h-[7vh] relative bg-card"
      >
        <CardContent className="min-w-full min-h-[11vh] md:min-h-[7vh] flex items-center p-2">
          <div className="flex items-center justify-between w-full px-2">
            <div className="flex items-center">
              <Squircle cornerRadius={10} cornerSmoothing={1}>
                <Image
                  src={'/svg/tp-logo/logo.svg'}
                  alt="titanium panel logo"
                  width={!(isMobile || isSmallDevice) ? 40 : 50}
                  height={!(isMobile || isSmallDevice) ? 40 : 50}
                />
              </Squircle>
              <div className="text-center md:flex items-center">
                <p className="font-black tracking-tighter text-xs ml-1">
                  TITANIUM
                </p>
                <p className="font-black tracking-wide ml-1 text-sm sm:text-xs sm:tracking-tighter">
                  PANEL
                </p>
              </div>
            </div>
            <NavMenu className="items-center" stores={stores} />
            {!(isMobile || isSmallDevice) ? <UserActions /> : ''}
          </div>
        </CardContent>
      </Squircle>
    </div>
  );
};

export default ApplicationHeaderRaw;
