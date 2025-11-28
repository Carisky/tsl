import { getPayload } from 'payload'
import config from './payload.config'

process.env.DATABASE_URI = 'mongodb://localhost:27017/payload-local'
process.env.PAYLOAD_SECRET = '3719c6339f586462c92830fa'
// опционально отключить email на локалке
process.env.EMAIL_DISABLED = 'true'

async function main() {
  const payload = await getPayload({ config })

  const email = 'admin@example.com'
  const password = 'Admin123!'

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.totalDocs) {
    console.log('User already exists:', email)
    return
  }

  await payload.create({
    collection: 'users',
    data: { email, password },
  })

  console.log('Admin user created:', email)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
