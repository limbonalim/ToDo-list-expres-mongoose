import { Grid } from '@mui/material';
import { useCallback, useEffect } from 'react';

import Layout from './components/UI/Layout/Layout.tsx';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { selectTasks, selectUser } from './store/taskSlice.ts';
import { getTasks } from './store/taskThunks.ts';
import Task from './components/Task/Task.tsx';


const App = () => {
  const token = localStorage.getItem('token')
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const user = useAppSelector(selectUser);

  const renderTask = useCallback(async () => {
    if (token) {
      await dispatch(getTasks(token));
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      dispatch(getTasks(token));
    }
  }, []);

  useEffect(() => {
   void renderTask()
  }, [renderTask]);

  return (
    <>
      <Layout>
        <Grid container direction='column' sx={{gap: 1}}>
          {tasks.map((item) => (
            <Task
              key={item._id}
              _id={item._id}
              title={item.title}
              description={item.description}
              status={item.status}
            />
          ))}
        </Grid>
      </Layout>
    </>
  )
};

export default App
