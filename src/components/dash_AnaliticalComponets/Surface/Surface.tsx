'use client';

import {
  Box,
  BoxProps,
  createPolymorphicComponent,
  PaperProps,
} from '@mantine/core';
import { forwardRef, ReactNode } from 'react';

type SurfaceProps = { children: ReactNode } & BoxProps & PaperProps;


const _div=forwardRef<HTMLDivElement, SurfaceProps>(({ children, ...others }, ref) => (
  <Box component="div" {...others} ref={ref} {...others} >
    {children}
  </Box>
))

_div.displayName="_divBox"

const Surface = createPolymorphicComponent<'div', SurfaceProps>(_div);



export default Surface;