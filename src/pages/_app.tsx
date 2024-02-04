import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import 'styles/main.scss';

const App = ({ Component, pageProps }: AppProps) => {
  const { push, pathname, asPath, locale } = useRouter();

  useEffect(() => {
    push(pathname, asPath, { locale });
  }, [locale]);

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <meta
          httpEquiv='self'
          content="default-src 'self'"
        />
        <meta
          name='application-name'
          content='zinns.io'
        />
        <meta
          name='theme-color'
          content='#262424'
        />
        <meta
          name='description'
          content='Mexican company dedicated to help small business to create their ideas, websites, mobile applications. zinns.io is a company committed with the new era of technology offering courses for those one who want to learn everything about this area. As a good mexican company we love everything we do and we need some free spaces that&gt;s the reason we also play videogames and stream via Twitch'
        />
        <meta
          name='robots'
          content='index,follow'
        />
        <meta
          name='googlebot'
          content='index,follow'
        />
        <meta
          name='google'
          content='nositelinkssearchbox'
        />
        <meta
          name='google'
          content='notranslate'
        />
        <meta
          name='generator'
          content='NextJS'
        />
        <meta
          name='subject'
          content="your document's subject"
        />
        <meta
          name='rating'
          content='General'
        />
        <meta
          name='referrer'
          content='no-referrer'
        />
        <meta
          name='format-detection'
          content='telephone=no'
        />
        <meta
          httpEquiv='x-dns-prefetch-control'
          content='off'
        />
        <meta
          httpEquiv='Window-Target'
          content='_value'
        />
        <meta
          name='ICBM'
          content='19.39735, -99.07169'
        />
        <meta
          name='geo.position'
          content='19.39735; -99.07169'
        />
        <meta
          name='geo.region'
          content='MX'
        />
        <meta
          name='geo.placename'
          content='Mexico City'
        />
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
        />
        <meta
          name='apple-mobile-web-app-capable'
          content='yes'
        />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='default'
        />
        <meta
          name='apple-mobile-web-app-title'
          content='PWA App'
        />
        <meta
          name='format-detection'
          content='telephone=no'
        />
        <meta
          name='mobile-web-app-capable'
          content='yes'
        />
        <meta
          name='msapplication-TileColor'
          content='#262424'
        />
        <meta
          name='msapplication-tap-highlight'
          content='no'
        />
        <meta
          name='theme-color'
          content='#262424'
        />
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:title'
          content='zinns.io'
        />
        <meta
          property='og:description'
          content='Mexican company dedicated to help small business to create their ideas, websites, mobile applications. zinns.io is a company committed with the new era of technology offering courses for those one who want to learn everything about this area. As a good mexican company we love everything we do and we need some free spaces that&gt;s the reason we also play videogames and stream via Twitch'
        />
        <meta
          property='og:site_name'
          content='zinns.io'
        />
        <meta
          property='og:url'
          content='https://zinns.io'
        />
        <meta
          property='og:image'
          content='https://yourdomain.com/icons/apple-touch-icon.png'
        />
        <link
          rel='manifest'
          href='/manifest.json'
        />
        <link
          rel='apple-touch-icon'
          href='/icons/touch-icon-iphone.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='144x144'
          href='/icons/144x14-app.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='250x250'
          href='/icons/250x14-app.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='250x250'
          href='/icons/250x14-app.png'
        />

        <link
          rel='icon'
          type='image/png'
          sizes='36x36'
          href='/icons/36x36.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/16x16.png'
        />
        <link
          rel='mask-icon'
          href='/icons/safari-pinned-tab.svg'
          color='#262424'
        />
        <link
          rel='shortcut icon'
          href='icons/16x16.png'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_2048.png'
          sizes='2048x2732'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1668.png'
          sizes='1668x2224'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1536.png'
          sizes='1536x2048'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1125.png'
          sizes='1125x2436'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_1242.png'
          sizes='1242x2208'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_750.png'
          sizes='750x1334'
        />
        <link
          rel='apple-touch-startup-image'
          href='/images/apple_splash_640.png'
          sizes='640x1136'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default appWithTranslation(App);
