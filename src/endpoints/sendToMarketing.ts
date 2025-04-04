import type { PayloadRequest } from 'payload';
import payload from 'payload';

export default async function sendToMarketing(req: PayloadRequest) {
  if (req.method !== 'POST') {
    const responseBody = { message: 'Method not allowed' };
    const response = new Response(JSON.stringify(responseBody), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  }

  const { email, question } = (await req.json!()) as { email: string; question: string };

  try {
    await req.payload.sendEmail({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: `New question from ${email}`,
      text: question,
    });
    const responseBody = { message: 'Email sent' };
    const response = new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    console.error('Error sending email', error);
    const responseBody = { message: error };
    const response = new Response(JSON.stringify(responseBody), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  }
}
