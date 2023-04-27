import React, { useEffect, useState } from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

type InputProps = {
  form: any,
  field: any,
  onUpdateValue: () => void,
  required?: boolean,
  placeholder?: string
}


const Input = ({ form, field, onUpdateValue, placeholder = "", required = false} : InputProps ) => {
  const [ fieldChild, meta, helpers ] = useField(field.name);
  const [ change, setChange ] = useState(false);
  const [ didFocus, setDidFocus ] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const [ showFeedback, setShowFeedback ] = useState(false);
  const [ lostFocus, setLostFocus ] = useState(false);

  const handleChange = (value: any) => {
    if(value) {
      setChange(true);
      form.setFieldValue(field.name, value);
      if(onUpdateValue) {
        onUpdateValue()
      } else {
        setChange(false);
      }
    }
  };

  const handleBlur = () => {
    setLostFocus(true);
  }

  useEffect(() => {
    if((lostFocus && (field.value?.trim().length === 0 || field.value === undefined)) || (field.value && didFocus && field.value?.trim().length > 0 && (meta.error != undefined && meta.error.length != 0))) {
      setShowFeedback(true)
    } else {
      setShowFeedback(false)
    }
  })

  return (
    <div>
      <div>
        <TextField 
          required
          label={placeholder}
          variant='outlined'
          error={showFeedback}
          helperText={showFeedback && meta.error}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{width: '100%', fontSize: '14px'}}
          size="small"
        />
      </div>
    </div>
  )
}

export default Input;