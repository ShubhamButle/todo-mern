import customFetch from '../../src/utils/customFetch';

export const fetchData = async () => {
  try {
    await customFetch.get('/user');
  } catch (error) {
    return error;
  }
};
