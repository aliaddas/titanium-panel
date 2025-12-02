'use client';
import { useMediaQuery } from '@uidotdev/usehooks';

export const useDeviceType = () => {
  return {
    isMobile: useMediaQuery('only screen and (max-width: 640px)'),
    isSmallDevice: useMediaQuery(
      'only screen and (min-width: 640px) and (max-width: 768px)',
    ),
    isMediumDevice: useMediaQuery(
      'only screen and (min-width: 768px) and (max-width: 1024px)',
    ),
    isLargeDevice: useMediaQuery(
      'only screen and (min-width: 1024px) and (max-width: 1280px)',
    ),
    isExtraLargeDevice: useMediaQuery(
      'only screen and (min-width: 1280px) and (max-width: 1535px)',
    ),
    is2XLargeDevice: useMediaQuery('only screen and (min-width: 1536px)'),
  };
};
