import React, { PropsWithChildren } from 'react';
import { Container } from '@mui/material';

import Toolbar from '../../Toolbar/Toolbar.tsx';


const Layout:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
          <Toolbar/>
      </header>
      <main>
        <Container>
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;