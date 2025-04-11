import type { PayloadRequest } from 'payload';

export default async function sendToMarketing(req: PayloadRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 })
  }

  const formData = await req.formData!()
  const email = formData.get('email') as string
  const question = formData.get('question') as string

  const attachments = []
  const files = formData.getAll('images') as File[]

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    attachments.push({
      filename: file.name,
      content: buffer,
    })
  }

  try {
    await req.payload.sendEmail({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: `New question from ${email}`,
      text: question,
      attachments,
    })

    return new Response(JSON.stringify({ message: 'Email sent' }), { status: 200 })
  } catch (error) {
    console.error('Error sending email', error)
    return new Response(JSON.stringify({ message: error }), { status: 500 })
  }
}

