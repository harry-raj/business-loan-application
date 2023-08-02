const mongoose = require('mongoose');

const accountingProviderTypes = ['In-House Accountant', 'External Accounting Firm', 'Online Accounting Software', 'Freelance Accountant'];

const loanSchema = new mongoose.Schema({
    // Business Information
    businessName: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        enum: ['Sole Proprietorship', 'Partnership', 'LLC', 'Corporation', 'Others'],
        required: true,
    },
    businessEstablishmentYear: {
        type: Number,
        required: true,
    },
    businessAddress: {
        type: String,
        required: true,
    },
    // Contact Information
    fullName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    // Loan Details
    loanAmount: {
        type: Number,
        required: true,
    },
    loanPurpose: {
        type: String,
        required: true,
    },
    // Accounting Provider
    accountingProviderType: {
        type: String,
        enum: accountingProviderTypes,
        required: true,
    },
    accountingProviderName: {
        type: String,
        required: true,
    },
    accountingProviderContact: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
