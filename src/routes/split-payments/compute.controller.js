const {
    reorderData,
    getTotalRatio,
    calculatePercentage,
    calculateRatio,
    getTotalSum
} = require('../../utils/toolbox')
function httpComputeData(req, res) {
    try {
        const data = req.body
        if (!data.SplitInfo.length || data.SplitInfo.length > 20) {
            return res.status(400).json({error: 'invalid split info'})
        }
        let balance = Number(data.Amount)
        let totalSum = getTotalSum(data.SplitInfo)
        if (totalSum > balance) {
            return res.status(400).json({error: 'total sum of split value is greater than initial balance'})
        }
        let SplitBreakdown = []
        let reorderedData = reorderData(data.SplitInfo)  
        let balanceForRatio
        let ratioTypes = reorderedData.filter(data => {
         return data.SplitType === 'RATIO'
        })
        for (const info of reorderedData) {
            if (Number(info.SplitValue) > balance) {
                return res.status(400).json({error: 'split value cannot be greater than balance'})
            }
            if (Number(info.SplitValue) < 0) {
                return res.status(400).json({error: 'split value cannot be negative'})
            }
            if (info.SplitType === 'FLAT') {
            balance -= Number(info.SplitValue)
            }
            if (info.SplitType === 'PERCENTAGE') {
                const result = calculatePercentage(info.SplitValue, balance)
                balance -= Number(result)
                balanceForRatio = balance
            }
            if (info.SplitType === 'RATIO') {
                const totalRatio = getTotalRatio(ratioTypes)
                const result = calculateRatio(totalRatio, info.SplitValue, balanceForRatio)
                balance -= Number(result)
            }
            SplitBreakdown.push(
                {
                    "SplitEntityId": info.SplitEntityId,
                    "Amount": info.SplitValue
                })
        }
        if (balance < 0) {
            return  res.status(400).json({error: 'Final balance cannot be negative'})
        }
        const response = {
            ID: data.ID,
            Balance: balance,
            SplitBreakdown
        }
        return res.status(200).json({data: response})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    httpComputeData
}