import prisma from './prisma';

// Get all agencies
export async function getAllAgencies() {
  return await prisma.agency.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

// Get an agency by id
export async function getAgencyById(id) {
  return await prisma.agency.findUnique({
    where: { id },
  });
}

// Get an agency by name
export async function getAgencyByName(name) {
  return await prisma.agency.findUnique({
    where: { name },
  });
}

// Create an agency
export async function createAgency(data) {
  return await prisma.agency.create({
    data,
  });
}

// Update an agency
export async function updateAgency(id, data) {
  return await prisma.agency.update({
    where: { id },
    data,
  });
}

// Delete an agency
export async function deleteAgency(id) {
  return await prisma.agency.delete({
    where: { id },
  });
}
