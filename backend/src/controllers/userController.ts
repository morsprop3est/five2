import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const where = search ? {
      OR: [
        { username: { contains: String(search) } },
        { email: { contains: String(search) } },
        { telegramUsername: { contains: String(search) } }
      ]
    } : {};

    const users = await (prisma as any).user.findMany({
      where,
      orderBy: { registrationDate: 'desc' },
      include: {
        _count: {
          select: { 
            favoriteListings: true,
            userSearchFilter: true 
          }
        }
      }
    });

    res.json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await (prisma as any).user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      id,
      username,
      email,
      phone,
      telegramUsername,
      avatarUrl
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await (prisma as any).user.create({
      data: {
        id,
        username,
        email,
        phone,
        telegramUsername,
        avatarUrl,
        registrationDate: new Date(),
        lastActivity: new Date()
      }
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error in createUser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      username,
      email,
      phone,
      telegramUsername,
      avatarUrl
    } = req.body;

    const user = await (prisma as any).user.update({
      where: { id },
      data: {
        username,
        email,
        phone,
        telegramUsername,
        avatarUrl,
        lastActivity: new Date()
      }
    });

    res.json(user);
  } catch (error: any) {
    console.error('Error in updateUser:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await (prisma as any).user.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error: any) {
    console.error('Error in deleteUser:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserWithFavorites = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await (prisma as any).user.findUnique({
      where: { id },
      include: {
        favoriteListings: {
          include: {
            listing: {
              include: {
                carBrand: true,
                carModel: true,
                bodyType: true,
                fuelType: true,
                gearboxType: true,
                sourceSite: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in getUserWithFavorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserWithSearchFilters = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await (prisma as any).user.findUnique({
      where: { id },
      include: {
        userSearchFilter: {
          include: {
            carBrand: true,
            carModel: true,
            bodyType: true,
            fuelType: true,
            gearboxType: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in getUserWithSearchFilters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUserActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await (prisma as any).user.update({
      where: { id },
      data: {
        lastActivity: new Date()
      }
    });

    res.json(user);
  } catch (error: any) {
    console.error('Error in updateUserActivity:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}; 