require("dotenv").config();
const PORT = 8080;
const DATABASE = process.env.AWS_DATABASE
const DATABASEUSER = process.env.AWS_DATABASE_USER
const DATABASEPASSWORD = process.env.AWS_DATABASE_PASSWORD
const DATABASEHOST = process.env.AWS_DATABASE_HOST
const DATABASEDIALECT = process.env.AWS_DIALECT
const S3BUCKET = process.env.AWS_S3BUCKET
const S3ACL = process.env.AWS_S3ACL
const S3ACCESSKEYID = process.env.AWS_ACCESS_KEY_ID
const S3SECRETACCESSKEY = process.env.AWS_SECRET_ACCESS_KEY
const S3SESSIONTOKEN = process.env.AWS_SESSION_TOKEN
const S3REGION = process.env.AWS_REGION

module.exports = {
    PORT,
    DATABASE,
    DATABASEUSER,
    DATABASEPASSWORD,
    DATABASEHOST,
    DATABASEDIALECT,
    S3BUCKET,
    S3ACL,
    S3ACCESSKEYID,
    S3SECRETACCESSKEY,
    S3SESSIONTOKEN,
    S3REGION,
};