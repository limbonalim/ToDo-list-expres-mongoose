import { Box, Container, Grid } from '@mui/material';

import AuthForm from '../AuthForm/AuthForm.tsx';
import TaskForm from '../TaskForm/TaskForm.tsx';

const Toolbar = () => {

  return (
    <>
      <Box>
        <Container sx={{paddingBottom: 2}}>
					<Grid container justifyContent='space-between'>
						<Grid item>
							<AuthForm/>
						</Grid>
						<Grid item>
							<TaskForm/>
						</Grid>
					</Grid>
        </Container>
      </Box>
    </>
  );
};

export default Toolbar;