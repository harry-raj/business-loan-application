const Joi = require('joi');

const loanValidationSchema = Joi.object({
    businessName: Joi.string().required(),
    businessType: Joi.string().valid('Sole Proprietorship', 'Partnership', 'LLC', 'Corporation', 'Others').required(),
    businessEstablishmentYear: Joi.number().integer().required(),
    businessAddress: Joi.string().required(),
    fullName: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    loanAmount: Joi.number().positive().required(),
    loanPurpose: Joi.string().required(),
    accountingProviderType: Joi.string().valid('In-House Accountant', 'External Accounting Firm', 'Online Accounting Software', 'Freelance Accountant').required(),
    accountingProviderName: Joi.string().required(),
    accountingProviderContact: Joi.string().required(),
});

const validateLoan = (req, res, next) => {
    const validationResult = loanValidationSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ message: 'Invalid loan application data.', error: validationResult.error.details[0].message });
    }
    req.validatedData = validationResult.value;
    next();
};

module.exports = {
    validateLoan,
};
