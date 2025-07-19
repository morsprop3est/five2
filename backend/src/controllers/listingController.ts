import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const sortBy = (req.query.sortBy as string) || 'id';
    const sortOrder = (req.query.sortOrder as string) === 'desc' ? 'desc' : 'asc';

    const filter: any = {};
    const filterableFields = [
      'id', 'ad_name', 'brand_id', 'model_id', 'year', 'price', 'previous_price', 'mileage', 'power', 'type_id', 'gearbox_id', 'fuel_id', 'source_site_id', 'archived'
    ];
    filterableFields.forEach((field) => {
      if (req.query[field] !== undefined) {
        if (typeof req.query[field] === 'string' && req.query[field]?.includes(',')) {
          filter[field] = { in: (req.query[field] as string).split(',').map((v) => isNaN(Number(v)) ? v : Number(v)) };
        } else {
          filter[field] = isNaN(Number(req.query[field])) ? req.query[field] : Number(req.query[field]);
        }
      }
    });
    const rangeFields = ['year', 'price', 'mileage', 'power'];
    rangeFields.forEach((field) => {
      const min = req.query[`min_${field}`];
      const max = req.query[`max_${field}`];
      if (min !== undefined || max !== undefined) {
        filter[field] = {};
        if (min !== undefined) filter[field].gte = Number(min);
        if (max !== undefined) filter[field].lte = Number(max);
      }
    });

    const [listings, total] = await Promise.all([
        prisma.listing.findMany({
          where: filter,
          orderBy: { [sortBy]: sortOrder },
          skip,
          take,
          include: {
            brand: true,
            model: true,
            type: true,
            gearbox: true,
            fuel: true,
            source_site: true
          }
        }),
        prisma.listing.count({ where: filter })
      ]);

    res.json({
      data: listings,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    });
  } catch (e) {
    res.status(400).json({ error: 'Bad request', details: (e as Error).message });
  }
};

export const getListingById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const listing = await prisma.listing.findUnique({
    where: { id: Number(id) },
    include: {
      brand: true,
      model: true,
      type: true,
      gearbox: true,
      fuel: true,
      source_site: true
    }
  });
  
  if (!listing) return res.status(404).json({ message: 'Not found' });
  res.json(listing);
};

export const createListing = async (req: Request, res: Response) => {
  const data = req.body;
  const listing = await prisma.listing.create({ data });
  res.status(201).json(listing);
};

export const updateListing = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const listing = await prisma.listing.update({ where: { id: Number(id) }, data });
  res.json(listing);
};

export const deleteListing = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.listing.delete({ where: { id: Number(id) } });
  res.status(204).send();
}; 