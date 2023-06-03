import { createAgenda, getAgendaByUrl, getAllAgendas } from '@/utils/agenda';
import { NextResponse } from 'next/server';

// Get all agendas
export async function GET() {
  try {
    const agendas = await getAllAgendas();
    return NextResponse.json(agendas);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

// Create an agenda
export async function POST(request) {
  try {
    const { agencyId, date, title, url, content } = await request.json();

    // Make sure all required fields are present
    if (!agencyId || !date || !title || !url || !content) {
      return NextResponse.json({ message: 'Missing required fields.' });
    }

    // Make sure the agenda doesn't already exist in the db
    const existingAgenda = await getAgendaByUrl(url);
    if (existingAgenda) {
      return NextResponse.json({ message: 'Agenda already exists.' });
    }

    // Create the agenda
    const newAgenda = await createAgenda({
      agencyId,
      date,
      title,
      url,
      content,
    });

    // Make sure the agenda was created
    if (!newAgenda) {
      return NextResponse.json({ message: 'Error creating agenda.' });
    }

    // Return the new agenda
    return NextResponse.json({ message: 'Agenda created.', newAgenda });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
