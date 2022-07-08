
function httpGetSamples(req, res) {
    try {
        res.send('this test template is working')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    httpGetSamples
}