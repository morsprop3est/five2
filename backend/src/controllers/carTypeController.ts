import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAllCarTypes = async (req: Request, res: Response) => {
  const types = await prisma.carType.findMany();
  res.json(types);
};

export const getCarTypeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const type = await prisma.carType.findUnique({ where: { id: Number(id) } });
  if (!type) return res.status(404).json({ message: 'Not found' });
  res.json(type);
}; 