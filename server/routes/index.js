module.exports = app => {
    const vansRoutes = require("./vans.routes");
    app.use("/vans", vansRoutes)

    const authRoutes = require("./auth.routes");
    app.use("/auth", authRoutes)


}