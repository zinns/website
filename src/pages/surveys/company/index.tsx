import { GetStaticProps } from 'next';

const CompanySurvey = () => {
  return (
    <>
      <p>Personal Survey</p>
    </>
  );
};

export default CompanySurvey;

export const getStaticProps: GetStaticProps = async () => {
  // const { data } = await

  return {
    props: {
      data: true,
    },
  };
};
