import { Link, useRouteError } from 'react-router-dom';
const Error = () => {
  const error = useRouteError();
  console.log(error);
  return <h2>Error Ocurred</h2>;
};
export default Error;
