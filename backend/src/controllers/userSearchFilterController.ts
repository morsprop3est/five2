import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAllUserSearchFilters = async (req: Request, res: Response) => {
  const filters = await prisma.userSearchFilter.findMany();
  res.json(filters);
};

export const getUserSearchFilterById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const filter = await prisma.userSearchFilter.findUnique({ where: { id: Number(id) } });
  if (!filter) return res.status(404).json({ message: 'Not found' });
  res.json(filter);
};

export const createUserSearchFilter = async (req: Request, res: Response) => {
  const data = req.body;
  const filter = await prisma.userSearchFilter.create({ data });
  res.status(201).json(filter);
};

export const updateUserSearchFilter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const filter = await prisma.userSearchFilter.update({ where: { id: Number(id) }, data });
  res.json(filter);
};

export const deleteUserSearchFilter = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.userSearchFilter.delete({ where: { id: Number(id) } });
  res.status(204).send();
}; 