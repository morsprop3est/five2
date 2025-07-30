import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCombinedData = async (req: Request, res: Response) => {
  try {
    const bodyTypes = await (prisma as any).bodyType.findMany({
      select: { id: true, name: true }
    });

    const carBrands = await (prisma as any).carBrand.findMany({
      select: { 
        id: true, 
        name: true,
        _count: {
          select: { carModel: true }
        }
      }
    });

    const fuelTypes = await (prisma as any).fuelType.findMany({
      select: { id: true, name: true }
    });

    const gearboxTypes = await (prisma as any).gearboxType.findMany({
      select: { id: true, name: true }
    });

    const recentListings = await (prisma as any).listing.findMany({
      take: 10,
      orderBy: { parsedAt: 'desc' },
      include: {
        carBrand: true,
        carModel: true,
        bodyType: true,
        fuelType: true,
        gearboxType: true
      }
    });

    const listingsByBrand = recentListings.reduce((acc: any, listing: any) => {
      const brandName = listing.carBrand?.name || 'Unknown';
      if (!acc[brandName]) {
        acc[brandName] = [];
      }
      acc[brandName].push(listing);
      return acc;
    }, {});

    const stats = await Promise.all([
      (prisma as any).listing.count(),
      (prisma as any).carBrand.count(),
      (prisma as any).carModel.count(),
      (prisma as any).user.count()
    ]);

    res.status(200).json({
      bodyTypes,
      carBrands,
      fuelTypes,
      gearboxTypes,
      recentListings,
      listingsByBrand,
      stats: {
        totalListings: stats[0],
        totalBrands: stats[1],
        totalModels: stats[2],
        totalUsers: stats[3]
      }
    });
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
};

export const getReferenceData = async (req: Request, res: Response) => {
  try {
    const [bodyTypes, carBrands, fuelTypes, gearboxTypes, sourceSites] = await Promise.all([
      (prisma as any).bodyType.findMany({ orderBy: { name: 'asc' } }),
      (prisma as any).carBrand.findMany({ orderBy: { name: 'asc' } }),
      (prisma as any).fuelType.findMany({ orderBy: { name: 'asc' } }),
      (prisma as any).gearboxType.findMany({ orderBy: { name: 'asc' } }),
      (prisma as any).sourceSite.findMany({ orderBy: { name: 'asc' } })
    ]);

    res.json({
      bodyTypes,
      carBrands,
      fuelTypes,
      gearboxTypes,
      sourceSites
    });
  } catch (error) {
    console.error('Error fetching reference data:', error);
    res.status(500).json({ error: 'Failed to fetch reference data' });
  }
};

export const searchListings = async (req: Request, res: Response) => {
  try {
    const { 
      search,
      brandId,
      modelId,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      bodyTypeId,
      fuelTypeId,
      gearboxTypeId,
      page = 1,
      limit = 20
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: String(search) } },
        { carBrand: { name: { contains: String(search) } } },
        { carModel: { name: { contains: String(search) } } }
      ];
    }

    if (brandId) where.brandId = Number(brandId);
    if (modelId) where.modelId = Number(modelId);
    if (bodyTypeId) where.bodyTypeId = Number(bodyTypeId);
    if (fuelTypeId) where.fuelTypeId = Number(fuelTypeId);
    if (gearboxTypeId) where.gearboxTypeId = Number(gearboxTypeId);
    
    if (minPrice) where.price = { ...where.price, gte: Number(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: Number(maxPrice) };
    if (minYear) where.year = { ...where.year, gte: Number(minYear) };
    if (maxYear) where.year = { ...where.year, lte: Number(maxYear) };

    const [listings, total] = await Promise.all([
      (prisma as any).listing.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { parsedAt: 'desc' },
        include: {
          carBrand: true,
          carModel: true,
          bodyType: true,
          fuelType: true,
          gearboxType: true,
          sourceSite: true
        }
      }),
      (prisma as any).listing.count({ where })
    ]);

    res.json({
      data: listings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error searching listings:', error);
    res.status(500).json({ error: 'Failed to search listings' });
  }
}; 