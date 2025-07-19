import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAllFuelTypes = async (req: Request, res: Response) => {
  const fuels = await prisma.fuelType.findMany();
  res.json(fuels);
};

export const getFuelTypeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fuel = await prisma.fuelType.findUnique({ where: { id: Number(id) } });
  if (!fuel) return res.status(404).json({ message: 'Not found' });
  res.json(fuel);
}; 