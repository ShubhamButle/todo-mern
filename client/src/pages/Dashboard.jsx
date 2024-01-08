import { redirect, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { FormRow, Tasks, SearchAndAdd } from '../components';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const allTaskQuery = (params) => {
  const { search } = params;
  return {
    queryKey: ['tasks', search ?? ''],
    queryFn: async () => {
      const { data } = await customFetch.get('/task', { params });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allTaskQuery(params));
    return { searchValues: { ...params } };
  };

// Action For Adding New task (Component : Create New Task)
export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    data.status = 'pending';
    try {
      await customFetch.post('/task', data);
      queryClient.invalidateQueries(['tasks']);
      toast.success('Task Added Successfully');
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Dashboard = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allTaskQuery(searchValues));
  const { tasks: taskData } = data;

  return (
    <Wrapper>
      <div className='action-bar'>
        <SearchAndAdd />
      </div>
      <div className='todo-list'>
        {taskData.tasks &&
          taskData.tasks.map((task, index) => {
            return <Tasks key={task._id} tasks={task} />;
          })}
      </div>
      {taskData.tasks.length <= 0 && (
        <h4 className='not-found-text'>No Task Found</h4>
      )}
    </Wrapper>
  );
};
export default Dashboard;
