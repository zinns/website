import { useEffect, useRef } from 'react';
import Head from 'next/head';
// import { Bubbles, Footer, Navbar } from 'components';
import { LayoutProps } from './interface';

const Layout: React.FC<LayoutProps> = ({ children, fullScreen, title, bubbles = false }) => {
  const safeContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (safeContainerRef.current !== null && footerRef.current !== null) {
      if (fullScreen) {
        safeContainerRef.current.style.height = `calc(100vh - ${footerRef.current.clientHeight}px)`;
      } else {
        safeContainerRef.current.style.minHeight = `calc(100vh - ${footerRef.current.clientHeight}px)`;
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title ?? 'zinns.io'}</title>
      </Head>
      <main className='w-full relative overflow-hidden'>
        {/* <Navbar /> */}
        <div
          className='w-full max-w-screen-xl mx-auto pt-12 layout__safe-container'
          ref={safeContainerRef}
        >
          {/* {bubbles && <Bubbles />} */}
          {children}
        </div>
        {/* <Footer ref={footerRef} /> */}
      </main>
    </>
  );
};

export default Layout;
