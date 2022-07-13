import { extendTheme } from '@chakra-ui/react';
import '@fontsource/rufina/700.css';
import '@fontsource/quicksand/600.css';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  fonts: {
    body: 'Quicksand, sans-serif',
    heading: 'Rufina, sans-serif',
  },
  components: {
    Steps,
  },
  config,
});

export default customTheme;
