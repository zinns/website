import { GetStaticProps } from 'next';

const PadawanSurvey = () => {
  return (
    <>
      <p>Personal Survey</p>
    </>
  );
};

export default PadawanSurvey;

export const getStaticProps: GetStaticProps = async () => {
  // const { data } = await

  return {
    props: {
      data: true,
    },
  };
};
