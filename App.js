import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const App = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3001/api/saveData', data);
      alert('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Personal Details:
          <br />
          <input {...register('userData.name')} placeholder="Name" />
          <input {...register('userData.phone')} placeholder="Phone" />
          <input {...register('userData.email')} placeholder="Email" />
        </label>
        <br />
        <label>
          Category:
          <br />
          <select {...register('category')}>
            <option value="Education">Education</option>
            <option value="Experience">Experience</option>
            <option value="Co-curricular">Co-curricular</option>
          </select>
        </label>
        <br />
        <label>
          Title:
          <br />
          <input {...register('title')} placeholder="Title" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
