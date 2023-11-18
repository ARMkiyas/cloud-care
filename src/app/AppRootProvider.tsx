"use client";

// import { useGlobalTheme } from "@/styles/theme";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  createEmotionCache,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootStyleRegistry from "./_helpers/emotion";

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { useConfigStore } from '@/stores/config';


const queryClient = new QueryClient();

const rtlCache = createEmotionCache({
  key: "mantine-rtl",
  prepend: true,
});

export default function AppRootProvider({ children }: { children: React.ReactNode }) {
  // const { colorScheme, direction, setColorScheme } = useConfigStore();
  // const theme = useGlobalTheme({ colorScheme });

  // const toggleColorScheme = (value?: ColorScheme) =>
  // 	setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <QueryClientProvider client={queryClient}>
      <RootStyleRegistry>
        {/* <ColorSchemeProvider
					colorScheme={colorScheme}
					toggleColorScheme={toggleColorScheme}
				> */}
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          // emotionCache={direction === 'rtl' ? rtlCache : undefined}
          // theme={{ ...theme, dir: direction }}
        >
          <ModalsProvider>{children}</ModalsProvider>
          <Notifications />
        </MantineProvider>
        {/* </ColorSchemeProvider> */}
      </RootStyleRegistry>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
