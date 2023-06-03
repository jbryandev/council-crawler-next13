import { getAllAgencies, getAgencyByName, createAgency } from '@/utils/agency';
import { NextResponse } from 'next/server';

// Get all agencies
export async function GET() {
  try {
    const agencies = await getAllAgencies();
    return NextResponse.json(agencies);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

// Create an agency
export async function POST(request) {
  try {
    const { name } = await request.json();

    // Make sure all required fields are present
    if (!name) {
      return NextResponse.json({ message: 'Missing required name field.' });
    }

    // Make sure the agency doesn't already exist in the db
    const existingAgency = await getAgencyByName(name);
    if (existingAgency) {
      return NextResponse.json({ message: 'Agency already exists.' });
    }

    // Create the agency
    const newAgency = await createAgency({
      name,
    });

    // Make sure the agency was created
    if (!newAgency) {
      return NextResponse.json({ message: 'Error creating agency.' });
    }

    // Return the new agency
    return NextResponse.json({ message: 'Agency created.', newAgency });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
