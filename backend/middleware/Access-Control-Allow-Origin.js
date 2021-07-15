module.exports = () => {
    return (_, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        )
        next()
    }
}