import { deleteAgency, getAgencyById, updateAgency } from '@/utils/agency';
import { NextResponse } from 'next/server';

// Get agency based on provided id
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const agency = await getAgencyById(id);

    if (!agency) {
      return NextResponse.json({ message: 'Agency not found.' });
    }

    return NextResponse.json(agency);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

// Update agency
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Make sure all required fields are present
    if (!id || !body) {
      return NextResponse.json({ message: 'Missing required fields.' });
    }

    // Make sure the agency exists in the db
    const existingAgency = await getAgencyById(id);
    if (!existingAgency) {
      return NextResponse.json({ message: 'Agency does not exist.' });
    }

    // Update the agency
    const updatedAgency = await updateAgency(id, body);

    // Make sure the agency was updated
    if (!updatedAgency) {
      return NextResponse.json({ message: 'Error updating agency.' });
    }

    // Return the updated agency
    return NextResponse.json({
      message: 'Agency updated.',
      updatedAgency,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

// Delete an agency
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Make sure the agency exists in the db
    const existingAgency = await getAgencyById(id);
    if (!existingAgency) {
      return NextResponse.json({ message: 'Agency does not exist.' });
    }

    // Delete the agency
    const deletedAgency = await deleteAgency(id);

    // Make sure the agency was deleted
    if (!deletedAgency) {
      return NextResponse.json({ message: 'Error deleting agency.' });
    }

    // Return the deleted agency
    return NextResponse.json({
      message: 'Agency deleted.',
      deletedAgency,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
