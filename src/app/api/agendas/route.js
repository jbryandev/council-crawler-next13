import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

// model Agenda {
//   id       String   @id @default(auto()) @map("_id") @db.ObjectId
//   date     DateTime @db.Date
//   title    String
//   url      String   @unique
//   content  String
//   agencyId String   @db.ObjectId
//   agency   Agency   @relation(fields: [agencyId], references: [id])
// }

// Get agenda by id or all agendas
export async function GET(request) {
  try {
    // Get query params, if any
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Get a single agenda if id is provided
    if (id) {
      const agenda = await prisma.agenda.findUnique({
        where: {
          id: id,
        },
      });

      // Make sure the agenda exists
      if (!agenda) {
        return NextResponse.json({ message: 'Agenda not found.' });
      }

      return NextResponse.json(agenda);
    } else {
      // Get all agendas
      const agendas = await prisma.agenda.findMany({
        orderBy: {
          date: 'desc',
        },
      });
      return NextResponse.json(agendas);
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}

// Create an agenda
export async function POST(request) {
  try {
    // Get the request body
    const body = await request.json();
    const { agencyId, date, title, url, content } = body;
    // Make sure all required fields are present
    if (!agencyId || !date || !title || !url || !content) {
      return NextResponse.json({ message: 'Missing required fields.' });
    }
    // Make sure the agenda doesn't already exist in the db
    const existingAgenda = await prisma.agenda.findUnique({
      where: { url: url },
    });
    if (existingAgenda) {
      return NextResponse.json({ message: 'Meeting already exists.' });
    }
    // Create the agenda
    const newAgenda = await prisma.agenda.create({
      data: {
        agency: {
          connect: {
            id: agencyId,
          },
        },
        date,
        title,
        url,
        content,
      },
    });
    // Make sure the agenda was created
    if (!newAgenda) {
      return NextResponse.json({ message: 'Error creating meeting.' });
    }
    // Return the new agenda
    return NextResponse.json(newAgenda);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

// Update an agenda
export async function PUT(request) {
  try {
    // Get the agenda id from the query string
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Get the request body
    const body = await request.json();

    // Make sure all required fields are present
    if (!id || !body) {
      return NextResponse.json({ message: 'Missing required fields.' });
    }

    // Make sure the agenda exists in the db
    const existingAgenda = await prisma.agenda.findUnique({
      where: { id: id },
    });
    if (!existingAgenda) {
      return NextResponse.json({ message: 'Meeting does not exist.' });
    }

    // Update the agenda
    const updatedAgenda = await prisma.agenda.update({
      where: {
        id: id,
      },
      data: {
        ...body,
      },
    });

    // Make sure the agenda was updated
    if (!updatedAgenda) {
      return NextResponse.json({ message: 'Error updating meeting.' });
    }

    // Return the updated agenda
    return NextResponse.json(updatedAgenda);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

// Delete an agenda
export async function DELETE(request) {
  try {
    // Get the agenda id from the query string
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Make sure the agenda exists in the db
    const existingAgenda = await prisma.agenda.findUnique({
      where: { id: id },
    });
    if (!existingAgenda) {
      return NextResponse.json({ message: 'Meeting does not exist.' });
    }

    // Delete the agenda
    const deletedAgenda = await prisma.agenda.delete({
      where: {
        id: id,
      },
    });

    // Make sure the agenda was deleted
    if (!deletedAgenda) {
      return NextResponse.json({ message: 'Error deleting meeting.' });
    }

    // Return the deleted agenda
    return NextResponse.json(deletedAgenda);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
