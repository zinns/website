import { GetStaticProps } from 'next';

const ServiceSurvey = () => {
  return (
    <>
      <p>Personal Survey</p>
    </>
  );
};

export default ServiceSurvey;

export const getStaticProps: GetStaticProps = async () => {
  // const { data } = await

  return {
    props: {
      data: true,
    },
  };
};
