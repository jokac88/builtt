import { useRouteError } from 'react-router-dom';

function ErrorPage({ errors }) {
  const error = useRouteError() || errors;

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data?.message || error.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <h1>{title}</h1>
      <p>{message}</p>
    </>
  );
}

export default ErrorPage;
