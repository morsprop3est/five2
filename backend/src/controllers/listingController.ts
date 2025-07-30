import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search,
      brandId,
      modelId,
      bodyTypeId,
      fuelTypeId,
      gearboxTypeId,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      minMileage,
      maxMileage,
      minPower,
      maxPower,
      sourceId,
      sortBy = 'newest',
      sortOrder = 'desc'
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
    if (sourceId) where.sourceId = Number(sourceId);
    
    if (minPrice) where.price = { ...where.price, gte: Number(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: Number(maxPrice) };
    if (minYear) where.year = { ...where.year, gte: Number(minYear) };
    if (maxYear) where.year = { ...where.year, lte: Number(maxYear) };
    if (minMileage) where.mileage = { ...where.mileage, gte: Number(minMileage) };
    if (maxMileage) where.mileage = { ...where.mileage, lte: Number(maxMileage) };
    if (minPower) where.power = { ...where.power, gte: Number(minPower) };
    if (maxPower) where.power = { ...where.power, lte: Number(maxPower) };

    let orderBy: any = {};
    
    switch (sortBy) {
      case 'newest':
        orderBy = { parsedAt: sortOrder };
        break;
      case 'price':
        orderBy = { price: sortOrder };
        break;
      case 'year':
        orderBy = { year: sortOrder };
        break;
      case 'mileage':
        orderBy = { mileage: sortOrder };
        break;
      case 'power':
        orderBy = { power: sortOrder };
        break;
      default:
        orderBy = { parsedAt: 'desc' };
    }

    const [listings, total] = await Promise.all([
      (prisma as any).listing.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy,
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
      },
      filters: {
        brandId,
        modelId,
        bodyTypeId,
        fuelTypeId,
        gearboxTypeId,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        minMileage,
        maxMileage,
        minPower,
        maxPower,
        search
      },
      sorting: {
        sortBy,
        sortOrder
      }
    });
  } catch (error) {
    console.error('Error in getAllListings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getListingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listing = await (prisma as any).listing.findUnique({
      where: { id: Number(id) },
      include: {
        carBrand: true,
        carModel: true,
        bodyType: true,
        fuelType: true,
        gearboxType: true,
        sourceSite: true
      }
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(listing);
  } catch (error) {
    console.error('Error in getListingById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createListing = async (req: Request, res: Response) => {
  try {
    const {
      externalId,
      title,
      brandId,
      modelId,
      year,
      price,
      mileage,
      photoUrl,
      bodyTypeId,
      gearboxTypeId,
      fuelTypeId,
      power,
      sourceId,
      externalUrl
    } = req.body;

    const listing = await (prisma as any).listing.create({
      data: {
        externalId,
        title,
        brandId: brandId ? Number(brandId) : null,
        modelId: modelId ? Number(modelId) : null,
        year: year ? Number(year) : null,
        price: price ? Number(price) : null,
        mileage: mileage ? Number(mileage) : null,
        photoUrl,
        bodyTypeId: bodyTypeId ? Number(bodyTypeId) : null,
        gearboxTypeId: gearboxTypeId ? Number(gearboxTypeId) : null,
        fuelTypeId: fuelTypeId ? Number(fuelTypeId) : null,
        power: power ? Number(power) : null,
        sourceId: sourceId ? Number(sourceId) : null,
        externalUrl,
        parsedAt: new Date()
      }
    });

    res.status(201).json(listing);
  } catch (error) {
    console.error('Error in createListing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      externalId,
      title,
      brandId,
      modelId,
      year,
      price,
      mileage,
      photoUrl,
      bodyTypeId,
      gearboxTypeId,
      fuelTypeId,
      power,
      sourceId,
      externalUrl
    } = req.body;

    const listing = await (prisma as any).listing.update({
      where: { id: Number(id) },
      data: {
        externalId,
        title,
        brandId: brandId ? Number(brandId) : null,
        modelId: modelId ? Number(modelId) : null,
        year: year ? Number(year) : null,
        price: price ? Number(price) : null,
        mileage: mileage ? Number(mileage) : null,
        photoUrl,
        bodyTypeId: bodyTypeId ? Number(bodyTypeId) : null,
        gearboxTypeId: gearboxTypeId ? Number(gearboxTypeId) : null,
        fuelTypeId: fuelTypeId ? Number(fuelTypeId) : null,
        power: power ? Number(power) : null,
        sourceId: sourceId ? Number(sourceId) : null,
        externalUrl
      }
    });

    res.json(listing);
  } catch (error: any) {
    console.error('Error in updateListing:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await (prisma as any).listing.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error: any) {
    console.error('Error in deleteListing:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getListingByExternalId = async (req: Request, res: Response) => {
  try {
    const { externalId } = req.params;
    const listing = await (prisma as any).listing.findUnique({
      where: { externalId },
      include: {
        carBrand: true,
        carModel: true,
        bodyType: true,
        fuelType: true,
        gearboxType: true,
        sourceSite: true
      }
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(listing);
  } catch (error) {
    console.error('Error in getListingByExternalId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecentListings = async (req: Request, res: Response) => {
  try {
    const { limit = 10 } = req.query;
    
    const listings = await (prisma as any).listing.findMany({
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
    });

    res.json(listings);
  } catch (error) {
    console.error('Error in getRecentListings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getListingsStats = async (req: Request, res: Response) => {
  try {
    const { 
      brandId,
      modelId,
      bodyTypeId,
      fuelTypeId,
      gearboxTypeId,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      minMileage,
      maxMileage,
      minPower,
      maxPower
    } = req.query;

    const where: any = {};
    
    if (brandId) where.brandId = Number(brandId);
    if (modelId) where.modelId = Number(modelId);
    if (bodyTypeId) where.bodyTypeId = Number(bodyTypeId);
    if (fuelTypeId) where.fuelTypeId = Number(fuelTypeId);
    if (gearboxTypeId) where.gearboxTypeId = Number(gearboxTypeId);
    
    if (minPrice) where.price = { ...where.price, gte: Number(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: Number(maxPrice) };
    if (minYear) where.year = { ...where.year, gte: Number(minYear) };
    if (maxYear) where.year = { ...where.year, lte: Number(maxYear) };
    if (minMileage) where.mileage = { ...where.mileage, gte: Number(minMileage) };
    if (maxMileage) where.mileage = { ...where.mileage, lte: Number(maxMileage) };
    if (minPower) where.power = { ...where.power, gte: Number(minPower) };
    if (maxPower) where.power = { ...where.power, lte: Number(maxPower) };

    const [
      totalCount,
      priceStats,
      yearStats,
      mileageStats,
      powerStats
    ] = await Promise.all([
      (prisma as any).listing.count({ where }),
      (prisma as any).listing.aggregate({
        where,
        _min: { price: true },
        _max: { price: true },
        _avg: { price: true }
      }),
      (prisma as any).listing.aggregate({
        where,
        _min: { year: true },
        _max: { year: true },
        _avg: { year: true }
      }),
      (prisma as any).listing.aggregate({
        where,
        _min: { mileage: true },
        _max: { mileage: true },
        _avg: { mileage: true }
      }),
      (prisma as any).listing.aggregate({
        where,
        _min: { power: true },
        _max: { power: true },
        _avg: { power: true }
      })
    ]);

    res.json({
      totalCount,
      priceStats: {
        min: priceStats._min.price,
        max: priceStats._max.price,
        avg: priceStats._avg.price
      },
      yearStats: {
        min: yearStats._min.year,
        max: yearStats._max.year,
        avg: yearStats._avg.year
      },
      mileageStats: {
        min: mileageStats._min.mileage,
        max: mileageStats._max.mileage,
        avg: mileageStats._avg.mileage
      },
      powerStats: {
        min: powerStats._min.power,
        max: powerStats._max.power,
        avg: powerStats._avg.power
      }
    });
  } catch (error) {
    console.error('Error in getListingsStats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 