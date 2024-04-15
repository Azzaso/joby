import { Outlet } from "react-router-dom";

const AuthLayout = () => {

  return (
        <>
        <section className="flex flex-1 justify-center items-center flex-col p-4">
            <Outlet />
          </section>
        <div className="hidden xl:block w-1/2 h-screen bg-[url('/assets/workspace.png')] bg-cover bg-center bg-no-repeat" />
        </>
  );
};

export default AuthLayout;