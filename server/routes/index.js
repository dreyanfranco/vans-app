module.exports = app => {
    const vansRoutes = require("./vans.routes");
    app.use("/vans", vansRoutes)
}