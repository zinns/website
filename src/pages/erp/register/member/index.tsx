import useForm from 'hooks/useForm';
import { FormEvent } from 'react';

const Member = () => {
  const { form, handleChange } = useForm({
    birthday: '',
    lastName: '',
    memberSince: '',
    memberType: 'worker',
    name: '',
    phoneNumber: '',
    position: '',
    telegramUser: '',
    tShirtSize: 'xs',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/erp/register/member', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        accept: 'application/json',
      },
    });

    // Handle response if necessary
    // const data = await response.json();
    // ...
  };

  return (
    <main>
      <h1>Register Member</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          className='border border-solid'
          type='text'
          name='name'
          id='name'
          value={form.name}
          onChange={e => handleChange(e.target.value, 'name')}
        />
        <br />
        <br />
        <label htmlFor='lastName'>Last Name:</label>
        <input
          className='border border-solid'
          type='text'
          name='lastName'
          id='lastName'
          onChange={e => handleChange(e.target.value, 'lastName')}
        />
        <br />
        <br />
        <label htmlFor='phoneNumber'>Phone:</label>
        <input
          className='border border-solid'
          type='text'
          name='phoneNumber'
          id='phoneNumber'
          onChange={e => handleChange(e.target.value, 'phoneNumber')}
        />
        <br />
        <br />
        <label htmlFor='telegramUser'>Telegram User:</label>
        <input
          className='border border-solid'
          type='text'
          name='telegramUser'
          id='telegramUser'
          onChange={e => handleChange(e.target.value, 'telegramUser')}
        />
        <br />
        <br />
        <label htmlFor='birthday'>Birthday:</label>
        <input
          className='border border-solid'
          type='date'
          name='birthday'
          id='birthday'
          onChange={e => handleChange(e.target.value, 'birthday')}
        />
        <br />
        <br />
        <label htmlFor='tShirtSize'>T-Shirt:</label>
        <input
          className='border border-solid'
          type='text'
          name='tShirtSize'
          id='tShirtSize'
          onChange={e => handleChange(e.target.value, 'tShirtSize')}
        />
        <br />
        <br />
        <label htmlFor='memberSince'>Member Since:</label>
        <input
          className='border border-solid'
          type='date'
          name='memberSince'
          id='memberSince'
          onChange={e => handleChange(e.target.value, 'memberSince')}
        />
        <br />
        <br />
        <label htmlFor='memberType'>Member Type:</label>
        <input
          className='border border-solid'
          type='text'
          name='memberType'
          id='memberType'
          onChange={e => handleChange(e.target.value, 'memberType')}
        />
        <br />
        <br />
        <label htmlFor='position'>Position:</label>
        <input
          className='border border-solid'
          type='text'
          name='position'
          id='position'
          onChange={e => handleChange(e.target.value, 'position')}
        />
        <br />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </main>
  );
};

export default Member;
