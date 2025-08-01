import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllFuelTypes = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const where = search ? {
      name: { contains: String(search) }
    } : {};

    const fuelTypes = await (prisma as any).fuelType.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    res.json(fuelTypes);
  } catch (error) {
    console.error('Error in getAllFuelTypes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFuelTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const fuelType = await (prisma as any).fuelType.findUnique({
      where: { id: Number(id) }
    });

    if (!fuelType) {
      return res.status(404).json({ error: 'Fuel type not found' });
    }

    res.json(fuelType);
  } catch (error) {
    console.error('Error in getFuelTypeById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createFuelType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const fuelType = await (prisma as any).fuelType.create({
      data: { name }
    });

    res.status(201).json(fuelType);
  } catch (error) {
    console.error('Error in createFuelType:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateFuelType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const fuelType = await (prisma as any).fuelType.update({
      where: { id: Number(id) },
      data: { name }
    });

    res.json(fuelType);
  } catch (error: any) {
    console.error('Error in updateFuelType:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Fuel type not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteFuelType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await (prisma as any).fuelType.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error: any) {
    console.error('Error in deleteFuelType:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Fuel type not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFuelTypeWithListings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const fuelType = await (prisma as any).fuelType.findUnique({
      where: { id: Number(id) },
      include: {
        listing: {
          include: {
            carBrand: true,
            carModel: true,
            bodyType: true,
            gearboxType: true,
            sourceSite: true
          }
        }
      }
    });

    if (!fuelType) {
      return res.status(404).json({ error: 'Fuel type not found' });
    }

    res.json(fuelType);
  } catch (error) {
    console.error('Error in getFuelTypeWithListings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 