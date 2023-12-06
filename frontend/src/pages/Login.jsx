import {useState} from 'react';
import store from '../../store/index.js';
import {
  Form, json, redirect, useActionData, useNavigation,
} from 'react-router-dom';
import Loader from '../components/icons/Loader.jsx';
import EyeIcon from '../components/icons/EyeIcon';
import EyeSlashIcon from '../components/icons/EyeSlashIcon';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isError = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const emailBorderColor = isError && (isError?.credentials || !email) ? 'border-red-500' : 'border-[#757575]';
  const passwordBorderColor = isError && (isError?.credentials || !password) ? 'border-red-500' : 'border-[#757575]';
  const placeholderColor = isError ? 'placeholder:text-red-500' : 'placeholder:text-[#757575]';
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
      <section className="login">
        <Form
            method="post"
            className="flex flex-col justify-center max-w-[450px] m-auto h-screen px-[15px] py-[50px]"
        >
          <h1 className="mb-[40px] text-[20px] font-bold leading-[24px] tracking-[0.2px]">
            Prijavi se na svoj nalog
          </h1>
          <div className="relative flex flex-col justify-between h-[60px] mb-[25px]">
            <label className="text-[12px] leading-[12px] tracking-[0.24px]" htmlFor="email">
              E-mail adresa<span className="text-red-500">*</span>
            </label>
            <span className="text-[12px] leading-[12px] tracking-[0.24px]">
              ivan.jovkovic88@gmail.com
            </span>
            <input
                className={`w-full py-[5px] border-b ${emailBorderColor} leading-[28px] transition-[border-color] duration-[0.5s] hover:border-black focus:border-black focus-visible:outline-none ${placeholderColor} placeholder:transition-[color] placeholder:duration-[0.5s]`}
                type="text"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Upišite e-mail adresu"
            />
            <p className={`${isError && isError.required && !email ? 'opacity-100' : 'opacity-0'} absolute bottom-[-18px] text-[12px] text-red-500 transition-[opacity] duration-[0.5s]`}>
              {isError && isError.required}
            </p>
            <p className={`${isError && isError.credentials ? 'opacity-100' : 'opacity-0'} absolute bottom-[-18px] text-[12px] text-red-500 transition-[opacity] duration-[0.5s]`}>
              {isError && isError.credentials}
            </p>
          </div>
          <div className="flex flex-col justify-between h-[60px] mb-[78px]">
            <label className="text-[12px] leading-[12px] tracking-[0.24px]" htmlFor="password">
              Šifra<span className="text-red-500">*</span>
            </label>
            <span className="text-[12px] leading-[12px] tracking-[0.24px]">builtt</span>
            <div className="relative">
              <input
                  className={`w-full py-[5px] pr-[40px] border-b ${passwordBorderColor} leading-[28px] transition-[border-color] duration-[0.5s] hover:border-black focus:border-black focus-visible:outline-none ${placeholderColor} placeholder:transition-[color] placeholder:duration-[0.5s]`}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Upišite šifru"
              />
              <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[50%] right-[5px] translate-y-[-50%] cursor-pointer"
                  type="button"
              >
                {showPassword ? <EyeSlashIcon/> : <EyeIcon/>}
              </button>
              <p className={`${isError && isError.required && !password ? 'opacity-100' : 'opacity-0'} absolute bottom-[-18px] text-[12px] text-red-500 transition-[opacity] duration-[0.5s]`}>
                {isError && isError.required}
              </p>
              <p className={`${isError && isError.credentials ? 'opacity-100' : 'opacity-0'} absolute bottom-[-18px] text-[12px] text-red-500 transition-[opacity] duration-[0.5s]`}>
                {isError && isError.credentials}
              </p>
            </div>
          </div>
          <button
              className="relative px-[15px] pt-[13px] pb-[14px] rounded-[100px] bg-black text-[18px] text-white leading-[18px] transition-[background-color] duration-[0.5s] hover:bg-neutral-900 disabled:bg-neutral-900 disabled:cursor-not-allowed"
              disabled={isSubmitting}
              type="submit"
          >
            Prijavi se na nalog
            {isSubmitting && <span className="absolute top-[50%] translate-y-[-50%] w-[50px]"><Loader/></span>}
          </button>
        </Form>
      </section>
  )
}

export default LoginPage;

export async function action({request}) {
  const data = await request.formData();

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  if (!authData.email || !authData.password) {
    return {
      required: 'Ovo polje je obavezno.'
    };
  }

  const baseURL = 'https://builtt-e10136fe5c38.herokuapp.com/login';

  try {
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

    store.dispatch({type: 'AUTHENTICATION'});

    return redirect('/');
  } catch (error) {
    throw json({message: 'Nije moguće autentifikovati korisnika.'}, {status: 500});
  }
}
