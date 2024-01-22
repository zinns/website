import parseContent from './parseContent.mjs';

const buildErrorMessage = (automation, description) => {
  return `
%0A
Warning\\!%0A
Something wrong happened running this automation: *${automation}*%0A
Here is the error \\-\\> ${parseContent(description)}
`;
};

export default buildErrorMessage;
