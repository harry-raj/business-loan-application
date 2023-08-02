const Loan = require('../db/models/index.model');
const { accountingProvider } = require('../utils/accountingProvider')
const { decisionEngine } = require('../utils/decisionEngine')

const submitLoanApplication = async (req, res) => {
    try {
        const UsersFormInput = {
            businessName,
            businessType,
            businessEstablishmentYear,
            businessAddress,
            fullName,
            emailAddress,
            phoneNumber,
            loanAmount,
            loanPurpose,
            accountingProviderType,
            accountingProviderName,
            accountingProviderContact,
        } = req.validatedData;

        // This will save record in database
        // await Loan.create({ ...UsersFormInput });

        const { sheet } = await accountingProvider();
        const decisionEngineData = await decisionEngine(sheet, businessName, businessEstablishmentYear, loanAmount);

        res.status(201).json({ message: 'Loan application submitted successfully!', data: { sheet, decisionEngineData } });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit loan application.', error });
    }
};

module.exports = {
    submitLoanApplication
};
