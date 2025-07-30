import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCarModels = async (req: Request, res: Response) => {
  try {
    const { brandId, search } = req.query;

    const where: any = {};
    
    if (brandId) {
      where.brandId = Number(brandId);
    }
    
    if (search) {
      where.name = { contains: String(search) };
    }

    const models = await (prisma as any).carModel.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        carBrand: true
      }
    });

    res.json(models);
  } catch (error) {
    console.error('Error in getAllCarModels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCarModelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const model = await (prisma as any).carModel.findUnique({
      where: { id: Number(id) },
      include: {
        carBrand: true
      }
    });

    if (!model) {
      return res.status(404).json({ error: 'Car model not found' });
    }

    res.json(model);
  } catch (error) {
    console.error('Error in getCarModelById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCarModel = async (req: Request, res: Response) => {
  try {
    const { name, brandId } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const model = await (prisma as any).carModel.create({
      data: { 
        name,
        brandId: brandId ? Number(brandId) : null
      }
    });

    res.status(201).json(model);
  } catch (error) {
    console.error('Error in createCarModel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCarModel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, brandId } = req.body;

    const model = await (prisma as any).carModel.update({
      where: { id: Number(id) },
      data: { 
        name,
        brandId: brandId ? Number(brandId) : null
      }
    });

    res.json(model);
  } catch (error: any) {
    console.error('Error in updateCarModel:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Car model not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCarModel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await (prisma as any).carModel.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error: any) {
    console.error('Error in deleteCarModel:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Car model not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCarModelWithListings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const model = await (prisma as any).carModel.findUnique({
      where: { id: Number(id) },
      include: {
        carBrand: true,
        listing: {
          include: {
            bodyType: true,
            fuelType: true,
            gearboxType: true,
            sourceSite: true
          }
        }
      }
    });

    if (!model) {
      return res.status(404).json({ error: 'Car model not found' });
    }

    res.json(model);
  } catch (error) {
    console.error('Error in getCarModelWithListings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

 