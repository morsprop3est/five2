import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllGearboxTypes = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const where = search ? {
      name: { contains: String(search) }
    } : {};

    const gearboxTypes = await (prisma as any).gearboxType.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    res.json(gearboxTypes);
  } catch (error) {
    console.error('Error in getAllGearboxTypes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGearboxTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gearboxType = await (prisma as any).gearboxType.findUnique({
      where: { id: Number(id) }
    });

    if (!gearboxType) {
      return res.status(404).json({ error: 'Gearbox type not found' });
    }

    res.json(gearboxType);
  } catch (error) {
    console.error('Error in getGearboxTypeById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createGearboxType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const gearboxType = await (prisma as any).gearboxType.create({
      data: { name }
    });

    res.status(201).json(gearboxType);
  } catch (error) {
    console.error('Error in createGearboxType:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateGearboxType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const gearboxType = await (prisma as any).gearboxType.update({
      where: { id: Number(id) },
      data: { name }
    });

    res.json(gearboxType);
  } catch (error: any) {
    console.error('Error in updateGearboxType:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Gearbox type not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteGearboxType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await (prisma as any).gearboxType.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error: any) {
    console.error('Error in deleteGearboxType:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Gearbox type not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGearboxTypeWithListings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gearboxType = await (prisma as any).gearboxType.findUnique({
      where: { id: Number(id) },
      include: {
        listing: {
          include: {
            carBrand: true,
            carModel: true,
            bodyType: true,
            fuelType: true,
            sourceSite: true
          }
        }
      }
    });

    if (!gearboxType) {
      return res.status(404).json({ error: 'Gearbox type not found' });
    }

    res.json(gearboxType);
  } catch (error) {
    console.error('Error in getGearboxTypeWithListings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 