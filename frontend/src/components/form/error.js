import React from 'react'
import { FormHelperText } from '@mui/material';

const Error = ({ formik, name, data }) =>  {
        return (
            !data.includes(formik?.values?.[name]) && formik?.touched?.[name] && formik?.errors?.[name] && 
                <FormHelperText>{formik?.errors?.[name]}</FormHelperText>
        );
}

export default Error;