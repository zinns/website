import { formatContent } from './formatContent';

export const createMessage = (actor: string, description: string, location: string) => {
  const formattedDescription = formatContent(description);
  const formattedlocation = formatContent(location);
  const formattedActor = formatContent(actor);

  const message = `
  %0A
  \\-\\-\\-\\-\\-\\-
  %0A
%0A
*GitHub Changes*%0A
%0A
User: *${formattedActor}*%0A
%0A
Update: ${formattedDescription}%0A
%0A
Repo: *${formattedlocation}*%0A
`;

  return message;
};
