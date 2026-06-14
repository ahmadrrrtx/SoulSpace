import { NextRequest, NextResponse } from 'next/server';
import { pusherServer } from '../../../../lib/pusher';

export async function POST(req: NextRequest) {
  try {
    const { socket_id, channel_name } = await req.json();

    const authResponse = pusherServer.authorizeChannel(socket_id, channel_name);

    return NextResponse.json(authResponse);
  } catch (error) {
    console.error('Pusher auth error:', error);
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}
