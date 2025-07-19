import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAllCarModels = async (req: Request, res: Response) => {
  const models = await prisma.carModel.findMany();
  res.json(models);
};

export const getCarModelById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const model = await prisma.carModel.findUnique({ where: { id: Number(id) } });
  if (!model) return res.status(404).json({ message: 'Not found' });
  res.json(model);
}; 