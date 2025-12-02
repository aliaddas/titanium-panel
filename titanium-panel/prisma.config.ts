import path from 'node:path'
import { defineConfig } from 'prisma/config'
import { loadEnvFile } from 'node:process'

// Load .env file
loadEnvFile(path.join(__dirname, '.env'))

export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, 'prisma', 'schema'),
})
