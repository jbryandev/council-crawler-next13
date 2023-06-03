import { deleteAgenda, getAgendaById, updateAgenda } from '@/utils/agenda';
import { NextResponse } from 'next/server';

// Get agenda based on provided id
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const agenda = await getAgendaById(id);

    if (!agenda) {
      return NextResponse.json({ message: 'Agenda not found.' });
    }

    return NextResponse.json(agenda);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

// Update an agenda
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Make sure all required fields are present
    if (!id || !body) {
      return NextResponse.json({ message: 'Missing required fields.' });
    }

    // Make sure the agenda exists in the db
    const existingAgenda = await getAgendaById(id);
    if (!existingAgenda) {
      return NextResponse.json({ message: 'Meeting does not exist.' });
    }

    // Update the agenda
    const updatedAgenda = await updateAgenda(id, body);

    // Make sure the agenda was updated
    if (!updatedAgenda) {
      return NextResponse.json({ message: 'Error updating meeting.' });
    }

    // Return the updated agenda
    return NextResponse.json({ message: 'Agenda updated.', updatedAgenda });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

// Delete an agenda
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Make sure the agenda exists in the db
    const existingAgenda = await getAgendaById(id);
    if (!existingAgenda) {
      return NextResponse.json({ message: 'Agenda does not exist.' });
    }

    // Delete the agenda
    const deletedAgenda = await deleteAgenda(id);

    // Make sure the agenda was deleted
    if (!deletedAgenda) {
      return NextResponse.json({ message: 'Error deleting agenda.' });
    }

    // Return the deleted agenda
    return NextResponse.json({ message: 'Agenda deleted.', deletedAgenda });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
