import { format } from 'date-fns';
import useForm from 'hooks/useForm';
import { FormEvent } from 'react';

const Member = () => {
  const { form, handleChange } = useForm({
    birthday: '1994-03-21',
    lastName: 'Zea',
    memberSince: '2019-01-01',
    name: 'Edgar',
    phoneNumber: '5535057614',
    position: 'CEO',
    telegramUser: 'eamzea',
    tShirtSize: 'xs',
  });

  const maxDate = format(new Date(), 'yyyy-MM-dd');

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
          value={form.lastName}
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
          value={form.phoneNumber}
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
          value={form.telegramUser}
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
          min='1950-01-01'
          value={form.birthday}
          onChange={e => handleChange(e.target.value, 'birthday')}
        />
        <br />
        <br />
        <label htmlFor='tShirtSize'>T-Shirt:</label>
        <select
          className='border border-solid'
          name='tShirtSize'
          id='tShirtSize'
          value={form.tShirtSize}
          onChange={e => handleChange(e.target.value, 'tShirtSize')}
        >
          <option value='xs'>XS</option>
          <option value='s'>S</option>
          <option value='m'>M</option>
          <option value='l'>L</option>
          <option value='xxl'>XLL</option>
        </select>
        <br />
        <br />
        <label htmlFor='memberSince'>Member Since:</label>
        <input
          className='border border-solid'
          type='date'
          min='2019-01-01'
          max={maxDate}
          name='memberSince'
          id='memberSince'
          value={form.memberSince}
          onChange={e => handleChange(e.target.value, 'memberSince')}
        />
        <br />
        <br />
        <label htmlFor='position'>Position:</label>
        <input
          className='border border-solid'
          type='text'
          name='position'
          id='position'
          value={form.position}
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
