"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListing = exports.updateListing = exports.createListing = exports.getListingById = exports.getAllListings = void 0;
const server_1 = require("../server");
const getAllListings = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const sortBy = req.query.sortBy || 'id';
        const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';
        const filter = {};
        const filterableFields = [
            'id', 'ad_name', 'brand_id', 'model_id', 'year', 'price', 'previous_price', 'mileage', 'power', 'type_id', 'gearbox_id', 'fuel_id', 'source_site_id', 'archived'
        ];
        filterableFields.forEach((field) => {
            if (req.query[field] !== undefined) {
                if (typeof req.query[field] === 'string' && req.query[field]?.includes(',')) {
                    filter[field] = { in: req.query[field].split(',').map((v) => isNaN(Number(v)) ? v : Number(v)) };
                }
                else {
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
                if (min !== undefined)
                    filter[field].gte = Number(min);
                if (max !== undefined)
                    filter[field].lte = Number(max);
            }
        });
        const [listings, total] = await Promise.all([
            server_1.prisma.listing.findMany({
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
            server_1.prisma.listing.count({ where: filter })
        ]);
        res.json({
            data: listings,
            page,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize)
        });
    }
    catch (e) {
        res.status(400).json({ error: 'Bad request', details: e.message });
    }
};
exports.getAllListings = getAllListings;
const getListingById = async (req, res) => {
    const { id } = req.params;
    const listing = await server_1.prisma.listing.findUnique({
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
    if (!listing)
        return res.status(404).json({ message: 'Not found' });
    res.json(listing);
};
exports.getListingById = getListingById;
const createListing = async (req, res) => {
    const data = req.body;
    const listing = await server_1.prisma.listing.create({ data });
    res.status(201).json(listing);
};
exports.createListing = createListing;
const updateListing = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const listing = await server_1.prisma.listing.update({ where: { id: Number(id) }, data });
    res.json(listing);
};
exports.updateListing = updateListing;
const deleteListing = async (req, res) => {
    const { id } = req.params;
    await server_1.prisma.listing.delete({ where: { id: Number(id) } });
    res.status(204).send();
};
exports.deleteListing = deleteListing;
