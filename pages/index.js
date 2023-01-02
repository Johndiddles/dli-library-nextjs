import Head from "next/head";
import Hero from "../components/HomePage/Hero";
import CommonBooks from "../components/HomePage/CommonBooks";
import HowItWorks from "../components/HomePage/HowItWorks";

import moduleTemplateCopy, { update } from "../models/createModule";
import storeModuleTemplateCopy from "../models/storeModule";

const Home = ({ modules, files }) => {
  return (
    <>
      <Head>
        <title>DLI Library</title>
        <meta name="description" content="Find all UNILAG dli modules" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-screen w-screen">
        <Hero />
        <HowItWorks />
        <CommonBooks books={JSON.parse(modules)} files={JSON.parse(files)} />
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const modules = await moduleTemplateCopy.find();

  const slicedModules = modules?.slice(0, 3);

  const filesArray = [
    ...(await storeModuleTemplateCopy.find({
      id: modules[0]?.id,
    })),

    ...(await storeModuleTemplateCopy.find({
      id: modules[1]?.id,
    })),

    ...(await storeModuleTemplateCopy.find({
      id: modules[2]?.id,
    })),
  ];

  // const files = async () =>
  //   slicedModules.map(
  //     async (module) =>
  //       await storeModuleTemplateCopy.find({
  //         id: module?.id,
  //       })
  //   );

  return {
    props: {
      modules: JSON.stringify(slicedModules),
      files: JSON.stringify(filesArray),
    },
  };
}
