import * as Yup from 'yup';
import { Formik, Form as FormBase, FastField } from 'formik';
import { Input } from '@components';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/base';
import { motion } from 'framer-motion';

const LoginPanel = () => {

  const validationSchema = Yup.object({
    name: Yup.string().required('Username is required').min(1, 'Username is required'),
    password: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length')
  })

  const initialValue = {
    Name: '',
    Password: '',
  }

  const onSubmit = async () => {
    console.log("Submit")
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
              name='name'
              placeholder='Username'
              required
              component={Input}
            />
            <FastField 
              name='password'
              placeholder='Password'
              required
              component={Input}
            />
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