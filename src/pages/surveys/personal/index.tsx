import { GetStaticProps } from 'next';

const PersonalSurvey = () => {
  return (
    <>
      <p>Personal Survey</p>
    </>
  );
};

export default PersonalSurvey;

export const getStaticProps: GetStaticProps = async () => {
  // const { data } = await

  return {
    props: {
      data: true,
    },
  };
};
