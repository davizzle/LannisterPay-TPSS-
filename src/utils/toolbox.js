
function reorderData (arr) {
    let flats = arr.filter(data => {
        return data.SplitType === 'FLAT'
    })
    
    let percentages = arr.filter(data => {
        return data.SplitType === 'PERCENTAGE'
    })
    
    let ratios = arr.filter(data => {
        return data.SplitType === 'RATIO'
    })
 return [...flats, ...percentages, ...ratios]
}

function calculatePercentage (percentage, value) {
    return percentage / 100 * value 
}

function getTotalRatio (arr) {
    let sum = 0
    for (const data of arr) {
        sum += data.SplitValue
    }
    return sum
}

function calculateRatio (totalRatio, ratio, value) {
    return ratio / totalRatio * value
}

function getTotalSum (arr) {
    let sum = 0
    for (const data of arr) {
        sum += Number(data.SplitValue)
    }

    return sum
}

module.exports = {
    reorderData,
    getTotalRatio,
    calculatePercentage,
    calculateRatio,
    getTotalSum
}