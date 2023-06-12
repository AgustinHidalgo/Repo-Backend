import dotenv from 'dotenv'
dotenv.config()

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    SECRET_KEY_TOKEN: process.env.SECRET_KEY_TOKEN,
    DEV_ENV: process.env.DEV_ENV,
    MAILING_PASSWORD:process.env.GMAIL_PASSWORD,
    MAILING_USER: process.env.GMAIL_USER
}