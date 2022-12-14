const { Sequelize } = require("sequelize");
const {
    DATABASE,
    DATABASEUSER,
    DATABASEPASSWORD,
    DATABASEHOST,
    DATABASEDIALECT,
} = require("./enviroment");
const sequelize = new Sequelize(DATABASE, DATABASEUSER, DATABASEPASSWORD, {
    host: DATABASEHOST,
    dialect: DATABASEDIALECT,
});

try {
    sequelize.authenticate()
        .then(() => {
            console.log("Connection has been established successfully.")
        })
        .catch(err => { console.error("Unable to connect to the database:", err) });
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

module.exports = { sequelize };