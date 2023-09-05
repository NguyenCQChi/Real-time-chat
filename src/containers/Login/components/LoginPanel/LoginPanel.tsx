import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormBase, FastField } from 'formik';
import { Input, PasswordInput } from '@components';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/base';
import { motion } from 'framer-motion';
import { Alert } from '@mui/material';
import { auth, database } from '../../../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import io from 'socket.io-client';
import Router from 'next/router';
import { SocketContext } from '@src/contexts/SocketContext';

let socket

const LoginPanel = () => {
  const [ failToast, setFailToast ] = useState(false);
  const { setSocket } = useContext(SocketContext);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').min(1, 'Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length')
  })

  const initialValue = {
    email: '',
    password: '',
  }

  const onSubmit = async (value: any) => {
    console.log("Submit")
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then((userCredential) => {
        setFailToast(false)
        socketInitializer(userCredential.user)
        Router.push('/chat')
      })
      .catch((error) => {
        setFailToast(true)
      })
  }

  const socketInitializer = async(user) => {
    await fetch('api/socket')
    socket = io()
    setSocket(socket)
  }

  const CustomButton = styled(Button)(({theme}) => ({
    width: '100%',
    backgroundColor: 'rgba(205, 180, 219, 0.4)',
    border: 'none',
    padding: '10px 0',
    borderRadius: '4px',
  }))

  const buttonContainer = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  }

  const hoverButton = {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(62, 132, 199, 0.4)'
    }
  }

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange
    >
      {(formik) => {
        const { isValid, dirty } = formik;

        return (
          <FormBase className='form'>
            <FastField 
              name='email'
              placeholder='Email'
              required
              component={Input}
            />
            <FastField 
              name='password'
              placeholder='Password'
              required
              component={PasswordInput}
            />
            { failToast && <Alert variant='outlined' severity='error'> Incorrect username or password! Please try again </Alert> }
            <div style={buttonContainer}>
              {(isValid && dirty) ? (
                <motion.div
                  className='box'
                  whileHover={{scale:1.05}}
                  transition={{type: 'spring', stiffness: 400, damping: 10}}
                  style={{width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
                >
                  <CustomButton
                    disabled={!(isValid && dirty)}
                    sx={hoverButton}
                    type='submit'
                  >
                    Login
                  </CustomButton>
                </motion.div>
              ) : (
                <CustomButton
                  disabled={true}
                  sx={{width: '60%'}}
                >
                  Login
                </CustomButton>
              )}
            </div>
          </FormBase>
        )
      }}
    </Formik>
  )
}

export default LoginPanel;