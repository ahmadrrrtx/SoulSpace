'use client';

import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import Link from 'next/link';

const events = [
  {
    id: 1,
    title: "Sunday Anxiety Circle",
    day: "Sunday",
    time: "8:00 PM PKT",
    desc: "A calm space to talk about anxiety with others who understand.",
    spots: "12 / 15",
  },
  {
    id: 2,
    title: "Grief Night",
    day: "Wednesday",
    time: "7:30 PM PKT",
    desc: "A gentle evening for anyone processing loss or grief.",
    spots: "8 / 12",
  },
  {
    id: 3,
    title: "Study Stress Support",
    day: "Thursday",
    time: "9:00 PM PKT",
    desc: "For students feeling overwhelmed with exams and pressure.",
    spots: "15 / 20",
  },
  {
    id: 4,
    title: "Sleep Wind-Down",
    day: "Friday",
    time: "10:00 PM PKT",
    desc: "A quiet space to talk about insomnia and racing thoughts at night.",
    spots: "10 / 15",
  },
  {
    id: 5,
    title: "LGBTQ+ Support Circle",
    day: "Saturday",
    time: "6:00 PM PKT",
    desc: "A safe and affirming space for LGBTQ+ experiences.",
    spots: "9 / 12",
  },
];

export default function RoomEvents() {
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);

  const toggleJoin = (id: number) => {
    if (joinedEvents.includes(id)) {
      setJoinedEvents(joinedEvents.filter(e => e !== id));
    } else {
      setJoinedEvents([...joinedEvents, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#064e3b]">
      <div className="border-b border-[#dcfce7]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#047857] hover:text-[#059669]">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="font-semibold text-xl flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#4ade80]" /> Room Events
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold tracking-tight mb-3">Scheduled Support Spaces</h1>
          <p className="text-xl text-[#047857]">Join others in themed group sessions.</p>
        </div>

        <div className="space-y-4">
          {events.map((event) => {
            const isJoined = joinedEvents.includes(event.id);
            return (
              <div key={event.id} className="card p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="font-semibold text-2xl mb-1">{event.title}</div>
                  <div className="flex items-center gap-4 text-sm text-[#047857] mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {event.day}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {event.time}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> {event.spots}
                    </div>
                  </div>
                  <p className="text-[#e2e8f0]">{event.desc}</p>
                </div>

                <button
                  onClick={() => toggleJoin(event.id)}
                  className={`btn px-8 whitespace-nowrap ${isJoined ? 'btn-secondary' : 'btn-primary'}`}
                >
                  {isJoined ? "Leave Event" : "Join Event"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-sm text-[#475569]">
          These are community-led spaces. A moderator will be present in each session.
        </div>
      </div>
    </div>
  );
}
