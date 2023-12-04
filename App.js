import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const App = () => {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3001/api/saveData', data);
      alert('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An error occurred while saving data.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Personal Details:
          <br />
          <input {...register('userData.name', { required: true })} placeholder="Name" />
          <input {...register('userData.phone', { required: true })} placeholder="Phone" />
          <input {...register('userData.email', { required: true })} placeholder="Email" />
        </label>
        <br />
        <label>
          Category:
          <br />
          <select {...register('category', { required: true })}>
            <option value="Education">Education</option>
            <option value="Experience">Experience</option>
            <option value="Co-curricular">Co-curricular</option>
          </select>
        </label>
        <br />
        <label>
          Title:
          <br />
          <input {...register('title', { required: true })} placeholder="Title" />
        </label>
        <br />
        <button type="submit" disabled={formState.isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
