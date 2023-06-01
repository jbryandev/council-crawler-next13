import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

// model Agency {
//   id     String   @id @default(auto()) @map("_id") @db.ObjectId
//   name   String   @unique
//   Agenda Agenda[]
// }

// Get agency by id or all agencies
export async function GET(request) {
  try {
    // Get query params, if any
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Get a single agency if id is provided
    if (id) {
      const agency = await prisma.agency.findUnique({
        where: {
          id: id,
        },
      });

      // Make sure the agency exists
      if (!agency) {
        return NextResponse.json({ message: 'Agency not found.' });
      }

      return NextResponse.json(agency);
    } else {
      // Get all agencies
      const agencies = await prisma.agency.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      return NextResponse.json(agencies);
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}

// Create an agency
export async function POST(request) {
  try {
    // Get the request body
    const body = await request.json();
    const { name } = body;
    // Make sure all required fields are present
    if (!name) {
      return NextResponse.json({ message: 'Missing required fields.' });
    }
    // Make sure the agency doesn't already exist in the db
    const existingAgency = await prisma.agency.findUnique({
      where: { name: name },
    });
    if (existingAgency) {
      return NextResponse.json({ message: 'Agency already exists.' });
    }
    // Create the agency
    const newAgency = await prisma.agency.create({
      data: {
        name,
      },
    });
    // Make sure the agency was created
    if (!newAgency) {
      return NextResponse.json({ message: 'Error creating agency.' });
    }
    // Return the new agency
    return NextResponse.json(newAgency);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

// Update an agency
export async function PUT(request) {
  try {
    // Get the agency id from the query string
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Get the request body
    const body = await request.json();

    // Make sure all required fields are present
    if (!id || !body) {
      return NextResponse.json({ message: 'Missing required fields.' });
    }

    // Make sure the agency exists in the db
    const existingAgenda = await prisma.agency.findUnique({
      where: { id: id },
    });
    if (!existingAgenda) {
      return NextResponse.json({ message: 'Meeting does not exist.' });
    }

    // Update the agency
    const updatedAgency = await prisma.agency.update({
      where: {
        id: id,
      },
      data: {
        ...body,
      },
    });

    // Make sure the agency was updated
    if (!updatedAgency) {
      return NextResponse.json({ message: 'Error updating agency.' });
    }

    // Return the updated agency
    return NextResponse.json(updatedAgency);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

// Delete an agency
export async function DELETE(request) {
  try {
    // Get the agency id from the query string
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Make sure the agency exists in the db
    const existingAgency = await prisma.agency.findUnique({
      where: { id: id },
    });
    if (!existingAgency) {
      return NextResponse.json({ message: 'Agency does not exist.' });
    }

    // Delete the agency
    const deletedAgency = await prisma.agency.delete({
      where: {
        id: id,
      },
    });

    // Make sure the agency was deleted
    if (!deletedAgency) {
      return NextResponse.json({ message: 'Error deleting meeting.' });
    }

    // Return the deleted agency
    return NextResponse.json(deletedAgency);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
