const accountingProvider = async () => {
    const sheet = [];
    const maxLoss = parseInt(process.env.MAX_LOSS);
    const maxProfit = parseInt(process.env.MAX_PROFIT);
    const minAssetsValue = parseInt(process.env.MIN_ASSETS_VALUE);
    const maxAssetsValue = parseInt(process.env.MAX_ASSETS_VALUE);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    for (let i = 0; i < 12; i++) {
        let loopMonth = currentMonth - i;
        let loopYear = currentYear;

        if (loopMonth <= 0) {
            loopMonth += 12;
            loopYear--;
        }

        const adjustedMonth = loopMonth;
        const loopDate = new Date(loopYear, adjustedMonth - 1, 1);

        const profitOrLoss = Math.floor(Math.random() * (maxProfit - maxLoss + 1)) + maxLoss;
        const assetsValue = Math.floor(Math.random() * (maxAssetsValue - minAssetsValue + 1)) + minAssetsValue;

        sheet.push({
            year: loopDate.getFullYear(),
            month: loopDate.getMonth() + 1,
            profitOrLoss,
            assetsValue,
        });
    }

    return { sheet };
}

module.exports = {
    accountingProvider
};