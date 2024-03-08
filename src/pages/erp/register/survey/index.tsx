import { FormEvent, useId } from 'react';
import useForm from 'hooks/useForm';
import { cleanInputValue } from 'utils';

const Survey = () => {
  const key = useId();
  const { form, handleChange } = useForm({
    type: 'company',
    questions: [
      {
        title: 'Question 1',
        type: 'select',
        options: ['option 1'],
      },
    ],
  });

  const handleQuestion = (value: string, desc: string) => {
    const newQuestions = [...form.questions];
    const index: number = Number(desc.split('-')[1]);

    if (desc.includes('title')) {
      (newQuestions[index] as { [key: string]: string }).title = value;
    }

    if (desc.includes('questionType')) {
      (newQuestions[index] as { [key: string]: string }).type = value;
    }

    if (desc.includes('questionOption')) {
      (newQuestions[index] as { [key: string]: string[] }).options[index] = value;
    }

    handleChange(newQuestions as { [key: string]: string | string[] }[], 'questions');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/erp/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        accept: 'application/json',
        type: 'survey',
      },
    });

    // Handle response if necessary
    // const data = await response.json();
    // ...
  };

  return (
    <main>
      <h1>Register Survey</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='type'>Survey Type:</label>
        <select
          className='border border-solid'
          name='type'
          id='type'
          value={form.type as string}
          onChange={e => handleChange(cleanInputValue(e.target.value), 'type')}
        >
          <option value='company'>Company</option>
          <option value='padawan'>Padawan</option>
          <option value='personal'>Personal</option>
          <option value='service'>Service</option>
        </select>

        <br />
        <br />
        {(
          form.questions as {
            title: string;
            type: string;
            options: string[];
          }[]
        ).map((question, index) => (
          <div key={`question-${index}-${key}`}>
            <label htmlFor={`question-${index}`}>Question {index + 1}</label>
            <br />
            <input
              type='text'
              name={`question-${index}`}
              id={`question-${index}`}
              value={question.title}
              onChange={e => handleQuestion(cleanInputValue(e.target.value), `title-${index}`)}
            />
            <br />
            <label htmlFor={`question-${index}-type`}>Type</label>
            <br />
            <select
              className='border border-solid'
              name='type'
              id='type'
              value={question.type}
              onChange={e =>
                handleQuestion(cleanInputValue(e.target.value), `questionType-${index}`)
              }
            >
              <option value='multiple'>Multiple Choice</option>
              <option value='text'>Text</option>
              <option value='select'>Select</option>
              <option value='scale'>Scale</option>
            </select>
            <br />
            <label htmlFor={`question-${index}-options`}>Options</label>
            <br />
            {question.options.map((opt, index) => (
              <div key={`question-option-${index}-${key}`}>
                <input
                  type='text'
                  name={`question-option-${index}`}
                  id={`question-option-${index}`}
                  value={opt}
                  onChange={e =>
                    handleQuestion(cleanInputValue(e.target.value), `questionOption-${index}`)
                  }
                />
              </div>
            ))}
            <br />
          </div>
        ))}
        <button type='submit'>Submit</button>
      </form>
    </main>
  );
};

export default Survey;
