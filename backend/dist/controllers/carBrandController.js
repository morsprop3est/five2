"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarBrandById = exports.getAllCarBrands = void 0;
const server_1 = require("../server");
const getAllCarBrands = async (req, res) => {
    const brands = await server_1.prisma.carBrand.findMany();
    res.json(brands);
};
exports.getAllCarBrands = getAllCarBrands;
const getCarBrandById = async (req, res) => {
    const { id } = req.params;
    const brand = await server_1.prisma.carBrand.findUnique({ where: { id: Number(id) } });
    if (!brand)
        return res.status(404).json({ message: 'Not found' });
    res.json(brand);
};
exports.getCarBrandById = getCarBrandById;
