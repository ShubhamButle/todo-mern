import customFetch from '../../src/utils/customFetch';

export const deleteTaskWithId = async (id) => {
  try {
    await customFetch.delete(`/task/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
