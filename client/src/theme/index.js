import { extendTheme } from '@chakra-ui/react';
import '@fontsource/lobster/400.css';
import '@fontsource/inter/400.css';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Lobster, system-ui, sans-serif',
  },
  components: {
    Steps,
  },
  config,
});

export default customTheme;
