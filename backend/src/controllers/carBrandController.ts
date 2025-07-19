import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAllCarBrands = async (req: Request, res: Response) => {
  const brands = await prisma.carBrand.findMany();
  res.json(brands);
};

export const getCarBrandById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const brand = await prisma.carBrand.findUnique({ where: { id: Number(id) } });
  if (!brand) return res.status(404).json({ message: 'Not found' });
  res.json(brand);
}; 