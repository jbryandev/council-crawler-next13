import prisma from './prisma';

// Get all agendas
export async function getAllAgendas() {
  return await prisma.agenda.findMany({
    orderBy: {
      date: 'desc',
    },
  });
}

// Get agenda by id
export async function getAgendaById(id) {
  return await prisma.agenda.findUnique({
    where: {
      id,
    },
  });
}

// Get agenda by url
export async function getAgendaByUrl(url) {
  return await prisma.agenda.findUnique({
    where: {
      url,
    },
  });
}

// Create an agenda
export async function createAgenda(data) {
  return await prisma.agenda.create({
    data,
  });
}

// Update an agenda
export async function updateAgenda(id, data) {
  return await prisma.agenda.update({
    where: {
      id,
    },
    data,
  });
}

// Delete an agenda
export async function deleteAgenda(id) {
  return await prisma.agenda.delete({
    where: {
      id,
    },
  });
}
