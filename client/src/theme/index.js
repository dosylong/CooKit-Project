import { extendTheme } from '@chakra-ui/react';
import '@fontsource/work-sans/700.css';
import '@fontsource/inter/400.css';

const customTheme = extendTheme({
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif',
  },
});

export default customTheme;
