require('dotenv').config({
    path: (process.env.NODE_ENV === "production") ? "../.env.production": "../.env.development"
})


module.exports.default = {
    env: process.env.NODE_ENV || "development",
    db: {
        mongo_url: process.env.MONGO_URL,
    },
    port: process.env.PORT
}