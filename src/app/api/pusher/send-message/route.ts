import { NextRequest, NextResponse } from 'next/server';
import { pusherServer } from '../../../../lib/pusher';

export async function POST(req: NextRequest) {
  try {
    const { channel, text, audio, type } = await req.json();

    await pusherServer.trigger(channel, 'new-message', {
      text,
      audio,
      type,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Pusher error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
