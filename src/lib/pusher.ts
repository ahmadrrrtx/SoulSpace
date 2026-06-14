import Pusher from 'pusher';
import PusherClient from 'pusher-js';

// Server-side Pusher instance (Strictly initialized on the server)
export const pusherServer = typeof window === 'undefined'
  ? new Pusher({
      appId: process.env.PUSHER_APP_ID || 'dummy-app-id',
      key: process.env.NEXT_PUBLIC_PUSHER_KEY || 'dummy-key',
      secret: process.env.PUSHER_SECRET || 'dummy-secret',
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
      useTLS: true,
    })
  : (null as unknown as Pusher);

// Client-side Pusher instance (Strictly initialized on the client/browser)
export const pusherClient = typeof window !== 'undefined'
  ? new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_KEY || 'dummy-key',
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
      }
    )
  : (null as unknown as PusherClient);
