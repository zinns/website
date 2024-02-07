export type AnswerSchemaType = {
  participant: string;
  period: '1st period' | '2nd period' | '3rd period' | '4th period' | '5th period' | '6th period';
  survey: 'Company' | 'Padawan' | 'Personal' | 'Service';
  answer: string;
};
