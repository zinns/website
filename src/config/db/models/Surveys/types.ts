export type AnswerSchemaType = {
  participant: string;
  period: '1st period' | '2nd period' | '3rd period' | '4th period';
  survey: 'Company' | 'Padawan' | 'Personal' | 'Service';
  answer: string;
};
