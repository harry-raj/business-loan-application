// Business Loan
import React, { useState } from 'react';
import { FormControl, FormLabel, Button, Checkbox, FormControlLabel, Select, MenuItem, Grid, Snackbar, TextField, Alert, DialogTitle, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import Input from '../../components/form/input';
import Error from '../../components/form/error';
import SheetTable from '../../components/table/table';


import { ACCOUNTING_PROVIDER_TYPE, BUSINESS_TYPE } from '../../common/constants';

const BusinessLoanForm = () => {
    const [isAgree, setIsAgree] = useState(false);
    const [isSheet, setIsSheet] = useState({
        isOpen: '',
        sheetData: [],
        loanData: ''
    });
    const [apiResponse, setApiResponse] = useState({
        type: '',
        isOpen: false,
        message: '',
    });
    const [customerDetails, setCustomerDetails] = useState('');

    // Validation Schema
    const businessFormSchema = Yup.object().shape({
        businessName: Yup.string().required('Business name is required.'),
        businessEstablishmentYear: Yup.string()
            .matches(/^\d+$/, 'Establishment year should be in number')
            .required('Establishment year is Required.')
            .min(4, 'Establishment year minimum should be 4 digits.')
            .max(4, 'Establishment year maximum  should be 4 digits.'),
        businessType: Yup.string().required('Business type is required.'),
        businessAddress: Yup.string().required('Business address is required.'),
        fullName: Yup.string().required('Full name is required.'),
        emailAddress: Yup.string().email('Please enter valid email.').required('Email address is required.'),
        phoneNumber: Yup.string()
            .required('Phone number is required.')
            .min(10, ' Phone number minimum should be 10 digits.')
            .max(10, 'Phone number maximum should be 10 digits.'),
        loanAmount: Yup.string().matches(/^\d+$/, 'Loan amount should be in number').required('Loan amount is required.'),
        loanPurpose: Yup.string().required('Loan purpose is required.'),
        accountingProviderName: Yup.string().required('Accounting provider Name is required'),
        accountingProviderContact: Yup.string()
            .required('Accounting provider Contact is required.')
            .matches(/^\d+$/, 'Accounting Provider Contact should be in number')
            .min(10, 'Accounting provider contact minimum should be 10 digits.')
            .max(10, 'Accounting provider Contact maximum should be 10 digits.'),
        accountingProviderType: Yup.string().required('Accounting provider Type is required.'),
    });

    // Formik Validation
    const formik = useFormik({
        initialValues: {
            businessName: '',
            businessEstablishmentYear: '',
            businessType: '',
            businessAddress: '',
            fullName: '',
            emailAddress: '',
            phoneNumber: '',
            loanAmount: '',
            loanPurpose: '',
            accountingProviderName: '',
            accountingProviderContact: '',
            accountingProviderType: '',
        },
        onSubmit: async (values) => {
            await axios
                .post(`${process.env.REACT_APP_BASE_URL}/submit`, values)
                .then((response) => {
                    const { decisionEngineData, sheet } = response?.data?.data;
                    setIsSheet({
                        isOpen: true,
                        sheetData: sheet,
                        loanData: decisionEngineData
                    });
                    formik.resetForm();
                    setIsAgree(false);
                })
                .catch((error) => {
                    setApiResponse({
                        type: 'error',
                        isOpen: true,
                        message: error.response.data.error,
                    })
                });
        },
        validationSchema: businessFormSchema,
    });

    const handleClose = () => {
        setApiResponse({
            type: '',
            isOpen: false,
            message: '',
        });
        setIsSheet({
            isOpen: '',
            sheetData: [],
            loanData: ''
        });
        setCustomerDetails('');
    };

    const getErrorBorderColor = (name, value) => {
        if (value) {
            if (touched?.[name] && errors?.[name] && !BUSINESS_TYPE.includes(values.businessbusinessAddressType)) return '#f71629';
        }
        if (touched?.[name] && errors?.[name]) return '#f71629';
        return '';
    };

    const { touched, errors, handleChange, handleSubmit, values } = formik;

    return (
        <div className="business-form-card">
            <form>
                <h1 className="form-heading">Business Loan Form</h1>

                {/* Business Information */}

                <div className="card-body">
                    <div className="form-content">
                        <h2 className="title">Business Information :</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <FormLabel required>Business Name</FormLabel>
                                    <Input
                                        name="businessName"
                                        type="text"
                                        size="small"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={values.businessName}
                                        formik={formik}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <FormLabel required>Business Establishment Year</FormLabel>
                                    <Input
                                        name="businessEstablishmentYear"
                                        type="text"
                                        size="small"
                                        onChange={handleChange}
                                        value={values.businessEstablishmentYear}
                                        formik={formik}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <FormLabel required>Business Type</FormLabel>
                                    <Select
                                        name="businessType"
                                        id="businessType"
                                        value={values.businessType}
                                        size="small"
                                        onChange={handleChange}
                                        sx={{ fieldset: { borderColor: getErrorBorderColor('businessType', values.businessType) } }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {BUSINESS_TYPE.map((item, index) => {
                                            return (
                                                <MenuItem key={item + index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    <Error formik={formik} name="businessType" data={BUSINESS_TYPE} />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>
                                <FormControl fullWidth>
                                    <FormLabel required>Business Address</FormLabel>
                                    <TextField
                                        id="businessAddress"
                                        name="businessAddress"
                                        type="text"
                                        size="small"
                                        multiline
                                        rows={1}
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={values.businessAddress}
                                        helperText={touched?.businessAddress && errors?.businessAddress}
                                        sx={{ fieldset: { borderColor: getErrorBorderColor('businessAddress') } }}
                                        fullWidth
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div className="mt-20">
                            <h4 className="sub-title">Contact Information :</h4>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth>
                                        <FormLabel required>Full Name</FormLabel>
                                        <Input
                                            name="fullName"
                                            type="text"
                                            size="small"
                                            onChange={handleChange}
                                            value={values.fullName}
                                            formik={formik}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth>
                                        <FormLabel required>Email Address</FormLabel>
                                        <Input
                                            name="emailAddress"
                                            type="email"
                                            size="small"
                                            onChange={handleChange}
                                            value={values.emailAddress}
                                            formik={formik}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth>
                                        <FormLabel required>Phone Number</FormLabel>
                                        <Input
                                            name="phoneNumber"
                                            type="text"
                                            size="small"
                                            onChange={handleChange}
                                            value={values.phoneNumber}
                                            formik={formik}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    {/* Loan Details */}
                    <div className="form-content">
                        <h2 className="title">Loan Details :</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <FormLabel required>Loan Amount</FormLabel>
                                    <Input
                                        name="loanAmount"
                                        type="text"
                                        size="small"
                                        onChange={handleChange}
                                        value={values.loanAmount}
                                        formik={formik}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <FormControl fullWidth>
                                    <FormLabel required>Loan Purpose</FormLabel>
                                    <TextField
                                        id="loanPurpose"
                                        name="loanPurpose"
                                        type="text"
                                        size="small"
                                        multiline
                                        rows={1}
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={values.loanPurpose}
                                        helperText={touched?.loanPurpose && errors?.loanPurpose}
                                        sx={{ fieldset: { borderColor: getErrorBorderColor('loanPurpose') } }}
                                        fullWidth
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>

                    {/* Accounting Provider */}
                    <div className="form-content">
                        <h2 className="title">Accounting Provider :</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <FormLabel required>Accounting Provider Name</FormLabel>
                                    <Input
                                        name="accountingProviderName"
                                        type="text"
                                        size="small"
                                        onChange={handleChange}
                                        value={values.accountingProviderName}
                                        formik={formik}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <FormLabel required>Accounting Provider Contact</FormLabel>
                                    <Input
                                        name="accountingProviderContact"
                                        type="text"
                                        size="small"
                                        onChange={handleChange}
                                        value={values.accountingProviderContact}
                                        formik={formik}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth size="small">
                                    <FormLabel required>Accounting Provider Type</FormLabel>
                                    <Select
                                        name="accountingProviderType"
                                        id="accountingProviderType"
                                        value={values.accountingProviderType}
                                        size="small"
                                        onChange={handleChange}
                                        sx={{
                                            fieldset: { borderColor: getErrorBorderColor('accountingProviderType', values.accountingProviderType) },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {ACCOUNTING_PROVIDER_TYPE.map((item, index) => {
                                            return (
                                                <MenuItem key={item + index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    <Error formik={formik} name="accountingProviderType" data={ACCOUNTING_PROVIDER_TYPE} />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>

                    {/* Consent and Declaration */}

                    <div className="form-content">
                        <h2 className="title">Consent and Declaration :</h2>
                        <FormControlLabel
                            control={<Checkbox checked={isAgree} onChange={(e) => setIsAgree(e.target.checked)} />}
                            label={
                                <span className="consent-text">
                                    I certify that the information provided is accurate and complete to the best of my knowledge.
                                </span>
                            }
                        />
                    </div>

                    {/* Submit button */}
                </div>
                <div className="card-footer">
                    <Button variant="contained" disabled={!isAgree} onClick={handleSubmit}>
                        Request Sheet
                    </Button>
                </div>
            </form>

            {/* Toast Message */}
            <Snackbar
                open={apiResponse.isOpen && apiResponse.type === 'error'}
                autoHideDuration={7000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {apiResponse.message}
                </Alert>
            </Snackbar>

            {/* Success Dialog */}
            <Dialog onClose={handleClose} open={apiResponse.isOpen && apiResponse.type === 'success'}>
                <div className="dialog-heading">
                    <h4 className="success-text">Success</h4>
                    <CloseIcon onClick={handleClose} />
                </div>
                <DialogTitle>
                    Based on your assets and profit you will get <span style={{ fontWeight: 700 }}>{apiResponse.message}%</span> of your loan amount.
                </DialogTitle>
                {Object.entries(customerDetails).map(([key, value]) => {
                    return (
                        <div className="customer-details">
                            <h5 className="customer-details-key">{key} : </h5> <p className="customer-details-value">{value}</p>
                        </div>
                    );
                })}
            </Dialog>

            {/* Sheet Table */}
            <SheetTable
                isSheet={isSheet}
                setIsSheet={setIsSheet}
                setApiResponse={setApiResponse}
                setCustomerDetails={setCustomerDetails}
                handleClose={handleClose}
            />
        </div>
    );
};

export default BusinessLoanForm;
