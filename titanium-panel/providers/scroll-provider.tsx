// context/ScrollContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { z } from 'zod';

// Define the scroll state schema using Zod
const ScrollStateSchema = z.object({
  isScrolled: z.boolean(),
});

// TypeScript type for the scroll state
type ScrollState = z.infer<typeof ScrollStateSchema>;

// Default scroll state
const defaultState: ScrollState = {
  isScrolled: false,
};

// Create the context
const ScrollContext = createContext<{
  scrollState: ScrollState;
  setScrollState: React.Dispatch<React.SetStateAction<ScrollState>>;
}>({
  scrollState: defaultState,
  setScrollState: () => {},
});

// ScrollProvider component to wrap around the app
export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollState, setScrollState] = useState<ScrollState>(defaultState);

  // Handle window scroll to update the context state
  useEffect(() => {
    const handleScroll = () => {
      setScrollState({
        isScrolled: window.scrollY > 10,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollState, setScrollState }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Hook to use the scroll context
export const useScrollContext = () => useContext(ScrollContext);

//Scroll Provider V2
// context/ScrollContext.tsx
// 'use client';

// import { createContext, useContext, useState, useEffect, useRef } from 'react';
// import { z } from 'zod';

// // Define the scroll state schema using Zod
// const ScrollStateSchema = z.object({
//   isScrolled: z.boolean(),
// });

// // TypeScript type for the scroll state
// type ScrollState = z.infer<typeof ScrollStateSchema>;

// // Default scroll state
// const defaultState: ScrollState = {
//   isScrolled: false,
// };

// // Create the context
// const ScrollContext = createContext<{
//   scrollState: ScrollState;
//   setScrollState: React.Dispatch<React.SetStateAction<ScrollState>>;
//   scrollContainerRef: React.RefObject<HTMLDivElement>;
// }>({
//   scrollState: defaultState,
//   setScrollState: () => {},
//   scrollContainerRef: { current: null },
// });

// // ScrollProvider component to wrap around the app
// export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
//   const [scrollState, setScrollState] = useState<ScrollState>(defaultState);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   // Handle container scroll to update the context state
//   useEffect(() => {
//     const handleScroll = () => {
//       if (scrollContainerRef.current) {
//         setScrollState({
//           isScrolled: scrollContainerRef.current.scrollTop > 25,
//         });
//       }
//     };

//     const container = scrollContainerRef.current;
//     if (container) {
//       container.addEventListener('scroll', handleScroll);
//       return () => {
//         container.removeEventListener('scroll', handleScroll);
//       };
//     }
//   }, []);

//   return (
//     <ScrollContext.Provider
//       value={{ scrollState, setScrollState, scrollContainerRef }}
//     >
//       {children}
//     </ScrollContext.Provider>
//   );
// };

// // Hook to use the scroll context
// export const useScrollContext = () => useContext(ScrollContext);
