import 'styled-components';

import { BaseTheme } from '@/config/theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends BaseTheme {}
}
