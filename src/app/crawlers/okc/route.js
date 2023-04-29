import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import * as cheerio from 'cheerio';

// Main URL for OKC agenda system
const mainUrl = 'https://okc.primegov.com/';

// URL path to committees list
const committeesUrl = `${mainUrl}api/committee/GetCommitteeesListByShowInPublicPortal`;

// URL path to upcoming meetings list
const meetingsUrl = `${mainUrl}api/v2/PublicPortal/ListUpcomingMeetings?_=1664477923943`;

// URL path to HTML agenda page
const agendaUrl = `${mainUrl}Portal/Meeting?meetingTemplateId=`;

// API ROUTE
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const agencyId = searchParams.get('agency');
    const agency = await prisma.agency.findUnique({
      where: { id: agencyId },
    });
    if (!agency) {
      throw 'Could not find an agency for the given Id.';
    }

    // Get list of committees
    const committees = await getCommitteesList();

    // Get Id of committee matching the given agency name
    const committeeId = committees.find(
      (committee) => committee.name.toLowerCase() === agency.name.toLowerCase()
    ).id;

    // Get list of upcoming meetings
    const meetings = await getUpcomingMeetings();

    // Search for a meeting matching the given committee Id
    const meeting = await findMeetingByCommitteeId(meetings, committeeId);

    // Locate the HTML document for the upcoming meeting
    const htmlDocument = meeting.documentList.find((document) => {
      return document.templateName.toLowerCase().includes('html agenda');
    });
    if (!htmlDocument) {
      return NextResponse.json({ message: 'No HTML agenda could be found.' });
    }
    const agendaPath = `${agendaUrl}${htmlDocument.templateId}`;

    // Make sure the agenda doesn't already exist in the db
    const existingAgenda = await prisma.agenda.findUnique({
      where: { url: agendaPath },
    });
    if (existingAgenda) {
      return NextResponse.json({ message: 'Meeting already exists.' });
    }

    // Fetch the agenda HTML
    const agendaHtml = await fetch(agendaPath).then((res) => res.text());

    // Extract agenda content and save as array of agenda items
    const $ = cheerio.load(agendaHtml);
    const agendaItems = [];
    const agendaSections = $('div[data-sectionid]');
    $(agendaSections).map((i, section) => {
      const sectionInfo = { sectionNumber: '', sectionTitle: '' };
      sectionInfo.sectionNumber = $(section)
        .find('td.number-cell-section')
        .text()
        .trim();
      sectionInfo.sectionTitle = $(section)
        .find('td.section-heading')
        .text()
        .trim();

      const meetingItems = [];
      if ($(section).find('div.meeting-item').length > 0) {
        $(section)
          .find('div.meeting-item')
          .map((i, item) => {
            const itemNumber = $(item).find('td.number-cell').text().trim();
            const itemContents = $(item).find('div.agenda-item').text().trim();
            meetingItems.push({
              key: i,
              itemNumber: itemNumber,
              itemContents: itemContents,
            });
          });
      }
      agendaItems.push({ section: sectionInfo, items: meetingItems });
    });

    // Add the agenda to the db
    const agenda = await prisma.agenda.create({
      data: {
        date: new Date(meeting.date).toISOString(),
        title: meeting.title,
        url: agendaPath,
        content: agendaItems,
        agency: {
          connect: {
            id: '63326daba3e76095e0426add',
          },
        },
      },
    });
    if (!agenda) {
      return NextResponse.json({
        message: 'Prisma was not able to add the agenda to the database.',
      });
    }

    return NextResponse.json({ success: 'Agenda added.' });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

async function getCommitteesList() {
  return await fetch(committeesUrl).then((res) => res.json());
}

async function findCommitteeIdByName(committees, name) {}

async function getUpcomingMeetings() {
  const meetings = await fetch(meetingsUrl).then((res) => res.json());
  if (!meetings) {
    throw 'Could not get list of upcoming meetings.';
  } else {
    return meetings;
  }
}

async function findMeetingByCommitteeId(meetings, committeeId) {
  const meeting = meetings.find((meeting) => {
    return meeting.committeeId === committeeId;
  });
  if (!meeting) {
    throw 'No upcoming meetings found.';
  } else {
    return meeting;
  }
}
