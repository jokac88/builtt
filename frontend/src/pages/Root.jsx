import Header from '../components/Header';
import {Outlet} from 'react-router-dom';

function Layout() {
  return (
      <>
        <Header/>
        <section className="max-w-[1220px] mx-[15px] md:mx-auto mt-[46px] mb-[30px]">
          <Outlet/>
        </section>
      </>
  )
}

export default Layout;
