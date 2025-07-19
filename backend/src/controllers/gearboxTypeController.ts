import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAllGearboxTypes = async (req: Request, res: Response) => {
  const gearboxes = await prisma.gearboxType.findMany();
  res.json(gearboxes);
};

export const getGearboxTypeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const gearbox = await prisma.gearboxType.findUnique({ where: { id: Number(id) } });
  if (!gearbox) return res.status(404).json({ message: 'Not found' });
  res.json(gearbox);
}; 