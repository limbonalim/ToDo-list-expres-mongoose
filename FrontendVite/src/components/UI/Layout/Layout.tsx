import React, { PropsWithChildren } from 'react';
import { Alert, Container } from '@mui/material';

import Toolbar from '../../Toolbar/Toolbar.tsx';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectError, selectIsError, selectisLoading } from '../../../store/taskSlice.ts';
import Loader from '../Loader/Loader.tsx';


const Layout:React.FC<PropsWithChildren> = ({children}) => {
  const isLoading = useAppSelector(selectisLoading);
  const isError = useAppSelector(selectIsError);
  const error = useAppSelector(selectError);

  return (
    <>
      <header>
          <Toolbar/>
      </header>
      <main>
        <Container>
          {isError? <Alert sx={{mb: 1}} severity="error">{error}</Alert> : ''}
          {isLoading? <Loader/> : children}
        </Container>
      </main>
    </>
  );
};

export default Layout;