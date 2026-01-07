import dotenv from 'dotenv'

dotenv.config()

export const ENV = {
    FRONTEND_URL:process.env.FRONTEND_URL,
    AI_API_KEY:process.env.GENAI
}