import { NextResponse } from 'next/server';
import { convert } from 'html-to-text';
import prisma from '@/utils/prisma';

// External API endpoints from OKC agenda management system
const mainUrl = 'https://okc.primegov.com/';
// const committeesUrl = `${mainUrl}api/committee/GetCommitteeesListByShowInPublicPortal`;
const meetingsUrl = `${mainUrl}api/v2/PublicPortal/ListUpcomingMeetings?_=1664477923943`;
const agendaUrl = `${mainUrl}Portal/Meeting?meetingTemplateId=`;

export async function GET() {
  // Get list of upcoming meetings
  const meetings = await fetch(meetingsUrl).then((res) => res.json());

  // Search for a meeting matching the given committee Id
  const meeting = meetings.find((meeting) => {
    return meeting.committeeId === 2; // OCWUT
  });
  if (!meeting) {
    return NextResponse.json({ message: 'No upcoming meetings found.' });
  }

  // Locate the HTML agenda for the upcoming meeting
  const agenda = meeting.documentList.find((document) => {
    return document.templateName.toLowerCase().includes('html agenda');
  });
  if (!agenda) {
    return NextResponse.json({ message: 'No HTML agenda could be found.' });
  }
  const agendaPath = `${agendaUrl}${agenda.templateId}`;

  // Make sure the agenda doesn't already exist in the db
  const existingAgenda = await prisma.agenda.findUnique({
    where: { url: agendaPath },
  });
  if (existingAgenda) {
    return NextResponse.json({ message: 'Meeting already exists.' });
  }

  // Fetch the agenda HTML
  const agendaHtml = await fetch(agendaPath).then((res) => res.text());
  const agendaText = convert(agendaHtml, {
    wordwrap: 130,
    selectors: [
      {
        selector: 'a',
        options: {
          ignoreHref: true,
        },
      },
    ],
  });

  // Add the agenda to the db
  const newAgenda = await prisma.agenda.create({
    data: {
      date: new Date(meeting.date).toISOString(),
      title: meeting.title,
      url: agendaPath,
      content: agendaText,
      agency: {
        connect: {
          id: '63326daba3e76095e0426add', // OCWUT
        },
      },
    },
  });

  return NextResponse.json({ newAgenda });
}
