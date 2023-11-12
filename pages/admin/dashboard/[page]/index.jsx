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
// import { useAuthContext } from "../../../context/authContext";
import UsersPanel from "../../../../components/AdminDashboard/Pages/Users";
import SupportPanel from "../../../../components/AdminDashboard/Pages/Support";
import Departments from "../../../../components/AdminDashboard/Pages/Departments";
import EditModule from "../../../../components/AdminDashboard/Pages/EditModule";
import { useSession } from "next-auth/react";
import { ADMIN_KEY } from "../../../../constants/variables";

const DashboardPages = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { page } = props;
  // const { isAuth, user } = useAuthContext();

  const [isReady, setIsReady] = useState(false);

  const dashboardRoutes = useRef({
    "add-module": <AddModule page={page} />,
    "edit-module": <EditModule page={page} />,
    index: <Dashboard page={page} />,
    users: <UsersPanel />,
    support: <SupportPanel />,
    departments: <Departments />,
  });

  const Page = useMemo(() => {
    return dashboardRoutes?.current[page];
  }, [page, dashboardRoutes]);

  useEffect(() => {
    const authTimeout = setTimeout(() => {
      if (!session) {
        router.push("/login");
      }
      if (session.user.role !== ADMIN_KEY) {
        router.push("/modules");
      }
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(authTimeout);
  }, [router, session]);

  return (
    <AdminContextProvider>
      <div className="min-h-screen h-screen max-h-screen min-w-[100vw] max-w-[100vw] z-50  flex flex-col fixed top-0 left-0 bg-slate-100 bg-opacity-100">
        <Head>
          <title>Download Modules</title>
        </Head>
        {!isReady ? (
          <FullScreenLoader />
        ) : isReady && session.user.role === ADMIN_KEY ? (
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
        ) : null}
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
