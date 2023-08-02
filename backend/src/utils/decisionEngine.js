const decisionEngine = async (sheet, businessName, businessEstablishmentYear, loanAmount) => {
    let preAssessment = 20;
    const profitOrLossSum = sheet.reduce((sum, entry) => sum + entry.profitOrLoss, 0);
    const assetsValueSum = sheet.reduce((sum, entry) => sum + entry.assetsValue, 0);
    const assetsValueAvg = Math.floor(assetsValueSum / sheet.length);

    if (loanAmount <= assetsValueAvg) {
        preAssessment = 100;
    }
    else if (loanAmount <= profitOrLossSum) {
        preAssessment = 60;
    }

    approvedLoanAmount = Math.floor((loanAmount * preAssessment) / 100);
    const decisionEngineResult = {
        profitOrLossSum,
        preAssessment,
        approvedLoanAmount,
        businessName,
        businessEstablishmentYear,
        loanAmount
    }
    return { ...decisionEngineResult };
}

module.exports = {
    decisionEngine
}