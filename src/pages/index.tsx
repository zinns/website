import type { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home = () => {
  return (
    <section className='w-full h-full flex flex-col items-center justify-center gap-20 relative z-[1] home'>
      <img
        src='/icons/512x512.png'
        alt=''
        className='w-1/3 home__logo'
      />
      <p className='text-slate-700 text-4xl lg:text-6xl font-thin home__title'>Coming Soon...</p>
    </section>
  );
};

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default Home;
