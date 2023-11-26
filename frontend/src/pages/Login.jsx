import store from '../../store/index.js';
import {Form, json, redirect} from 'react-router-dom';

function LoginPage() {
  return (
      <section className="login">
        <Form method="post">
          <p>Prijavi se na svoj nalog</p>
          <input type="email" name="email"/>
          <input type="password" name="password"/>
          <button type="submit">Prijavi se na nalog</button>
        </Form>
      </section>
  )
}

export default LoginPage;

export async function action({request}) {
  const baseURL = 'http://localhost:4000/login';
  const data = await request.formData();

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({message: 'Could not authenticate user.'}, {status: 500});
  }

  const resData = await response.json();

  store.dispatch({type: 'AUTHENTICATION'});
  // const { token } = resData;

  return redirect('/');
}
