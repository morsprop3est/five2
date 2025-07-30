import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCarBrands = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const where = search ? {
      name: { contains: String(search) }
    } : {};

    const brands = await (prisma as any).carBrand.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    res.json(brands);
  } catch (error) {
    console.error('Error in getAllCarBrands:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCarBrandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await (prisma as any).carBrand.findUnique({
      where: { id: Number(id) }
    });

    if (!brand) {
      return res.status(404).json({ error: 'Car brand not found' });
    }

    res.json(brand);
  } catch (error) {
    console.error('Error in getCarBrandById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCarBrand = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const brand = await (prisma as any).carBrand.create({
      data: { name }
    });

    res.status(201).json(brand);
  } catch (error) {
    console.error('Error in createCarBrand:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCarBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const brand = await (prisma as any).carBrand.update({
      where: { id: Number(id) },
      data: { name }
    });

    res.json(brand);
  } catch (error: any) {
    console.error('Error in updateCarBrand:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Car brand not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCarBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await (prisma as any).carBrand.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error: any) {
    console.error('Error in deleteCarBrand:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Car brand not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCarBrandWithModels = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await (prisma as any).carBrand.findUnique({
      where: { id: Number(id) },
      include: {
        carModel: true
      }
    });

    if (!brand) {
      return res.status(404).json({ error: 'Car brand not found' });
    }

    res.json(brand);
  } catch (error) {
    console.error('Error in getCarBrandWithModels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCarBrandWithListings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await (prisma as any).carBrand.findUnique({
      where: { id: Number(id) },
      include: {
        listing: {
          include: {
            carModel: true,
            bodyType: true,
            fuelType: true,
            gearboxType: true,
            sourceSite: true
          }
        }
      }
    });

    if (!brand) {
      return res.status(404).json({ error: 'Car brand not found' });
    }

    res.json(brand);
  } catch (error) {
    console.error('Error in getCarBrandWithListings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 