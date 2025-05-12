import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { message, which } = await req.json();

  // Default to ONBOARDING if 'which' is not provided
  const assistantKey = `ASSISTANT_ID_${(which || 'ONBOARDING').toUpperCase()}`;
  const assistantId = process.env[assistantKey];

  if (!assistantId) {
    return NextResponse.json({ error: 'Assistant ID not found.' }, { status: 400 });
  }

  try {
    const thread = await openai.beta.threads.createAndRun({
      assistant_id: assistantId,
      thread: {
        messages: [{ role: 'user', content: message }],
      },
    });

    return NextResponse.json({ thread });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}