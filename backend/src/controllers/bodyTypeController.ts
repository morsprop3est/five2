import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBodyTypes = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const where = search ? {
      name: { contains: String(search) }
    } : {};

    const bodyTypes = await (prisma as any).bodyType.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    res.json(bodyTypes);
  } catch (error) {
    console.error('Error in getAllBodyTypes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBodyTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bodyType = await (prisma as any).bodyType.findUnique({
      where: { id: Number(id) }
    });

    if (!bodyType) {
      return res.status(404).json({ error: 'Body type not found' });
    }

    res.json(bodyType);
  } catch (error) {
    console.error('Error in getBodyTypeById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBodyType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const bodyType = await (prisma as any).bodyType.create({
      data: { name }
    });

    res.status(201).json(bodyType);
  } catch (error) {
    console.error('Error in createBodyType:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBodyType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const bodyType = await (prisma as any).bodyType.update({
      where: { id: Number(id) },
      data: { name }
    });

    res.json(bodyType);
  } catch (error: any) {
    console.error('Error in updateBodyType:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Body type not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBodyType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await (prisma as any).bodyType.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error: any) {
    console.error('Error in deleteBodyType:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Body type not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBodyTypeWithListings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bodyType = await (prisma as any).bodyType.findUnique({
      where: { id: Number(id) },
      include: {
        listing: {
          include: {
            carBrand: true,
            carModel: true,
            fuelType: true,
            gearboxType: true,
            sourceSite: true
          }
        }
      }
    });

    if (!bodyType) {
      return res.status(404).json({ error: 'Body type not found' });
    }

    res.json(bodyType);
  } catch (error) {
    console.error('Error in getBodyTypeWithListings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 