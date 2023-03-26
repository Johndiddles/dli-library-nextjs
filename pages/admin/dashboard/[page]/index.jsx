import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import DashboardHeader from "../../../../components/AdminDashboard/Components/DashboardHeader";
import AddModule from "../../../../components/AdminDashboard/Pages/AddModule";
import Dashboard from "../../../../components/AdminDashboard/Pages/Dashboard";
import Sidebar from "../../../../components/AdminDashboard/Components/Sidebar";
import Banner from "../../../../components/Banner/Banner";
import FullScreenLoader from "../../../../components/Loader/FullLoader";
import AdminContextProvider from "../../../context/adminAuth";
import { useAuthContext } from "../../../context/authContext";
import UsersPanel from "../../../../components/AdminDashboard/Pages/Users";

const DashboardPages = (props) => {
  const router = useRouter();
  const { page } = props;
  const { isAuth } = useAuthContext();

  // console.log({ router });

  const [isReady, setIsReady] = useState(false);

  const dashboardRoutes = useRef({
    "add-module": <AddModule page={page} />,
    index: <Dashboard page={page} />,
    users: <UsersPanel />,
  });

  const Page = useMemo(() => {
    return dashboardRoutes?.current[page];
  }, [page, dashboardRoutes]);

  useEffect(() => {
    const authTimeout = setTimeout(() => {
      if (!isAuth) {
        router.push("/login");
      }
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(authTimeout);
  }, [isAuth, router]);

  return (
    <AdminContextProvider>
      <div className="min-h-screen h-screen max-h-screen min-w-[100vw] max-w-[100vw] z-50  flex flex-col fixed top-0 left-0 bg-slate-100 bg-opacity-100">
        <Head>
          <title>Download Modules</title>
        </Head>
        {!isReady ? (
          <FullScreenLoader />
        ) : (
          <div className="flex flex-col w-full h-full">
            <DashboardHeader />
            <div className="flex-grow flex w-full overflow-hidden">
              <Sidebar />
              <div className="flex-grow flex flex-col pt-4 ">
                <div className="flex flex-col gap-2 pb-6 px-8 shadow-lg">
                  <h1 className=" font-montserrat text-2xl font-bold text-slate-800">
                    Admin Dashboard
                  </h1>
                </div>
                <div className="px-8 py-8 flex-grow overflow-y-scroll">
                  {Page}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminContextProvider>
  );
};

export default DashboardPages;

export async function getServerSideProps(context) {
  const { page } = context.params;

  return {
    props: {
      page,
    },
  };
}
