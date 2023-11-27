import {useRouteError, NavLink} from 'react-router-dom';

function ErrorPage({errors}) {
  const error = useRouteError() || errors;

  let title = 'Došlo je do greške!';
  let message = 'Nešto nije u redu!';

  if (error.status === 500) {
    message = error.data?.message || error.message;
  }

  if (error.status === 404) {
    title = 'Nije pronađeno!';
    message = 'Nije moguće pronaći resurs ili stranicu.';
  }

  return (
      <section className="flex flex-col justify-center items-center max-w-[1220px] md:mx-auto h-screen">
        <NavLink to=".." className="border-b border-black mb-[40px]">Vrati se nazad</NavLink>
        <h1 className="mb-[15px] md:mb-[15px] font-bold text-[30px] leading-[24px] tracking-[0.2px]">{title}</h1>
        <p className="text-[24px] text-center leading-[33px] tracking-[0.2px]">{message}</p>
      </section>
  );
}

export default ErrorPage;
