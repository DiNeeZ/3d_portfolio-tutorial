import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const initialFields = {
  name: '',
  email: '',
  message: ''
};

const Contact = () => {
  const formRef = useRef();
  const [fields, setFields] = useState(initialFields);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFields({
      ...fields,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_0ckrw4r',
        'template_ukr3w4r',
        {
          from_name: fields.name,
          to_name: 'Denis',
          from_email: fields.email,
          to_email: 'maiorov.den.fe@gmail.com',
          message: fields.message
        },
        'jnkABt5CKOns2x5H1'
      )
      .then(
        () => {
          setLoading(false);
          setFields(initialFields);
          toast('Thank you. I will get back to you as soon as possible.');
        },
        (error) => {
          setLoading(false);
          console.log(error);

          alert('Ahh, something went wrong. Please try again.');
        }
      );
  };

  return (
    <div className='xl:mt-12 xl:flex-row flex flex-col-reverse gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Get it on touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'>
          <fieldset className='flex flex-col gap-8'>
            <p className='flex flex-col'>
              <label
                htmlFor='name'
                className='text-white font-medium mb-4'>
                Your Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={fields.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none 
                border-transparent font-medium focus:border'
              />
            </p>
            <p className='flex flex-col'>
              <label
                htmlFor='email'
                className='text-white font-medium mb-4'>
                Your Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={fields.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              />
            </p>
            <p className='flex flex-col'>
              <label
                htmlFor='message'
                className='text-white font-medium mb-4'>
                Your Name
              </label>
              <textarea
                rows={7}
                id='message'
                name='message'
                value={fields.message}
                onChange={handleChange}
                placeholder="What's your good name?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              />
            </p>
          </fieldset>
          <button
            type='submim'
            className='bg-tertiary hover:bg-tertiary-light py-3 px-8 rounded-xl 
            outline-none w-fit text-white font-bold active:shadow-sm shadow-md shadow-primary active:translate-y-[2px] duration-150'>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
        <EarthCanvas />
      </motion.div>

      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
