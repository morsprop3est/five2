"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFuelTypeById = exports.getAllFuelTypes = void 0;
const server_1 = require("../server");
const getAllFuelTypes = async (req, res) => {
    const fuels = await server_1.prisma.fuelType.findMany();
    res.json(fuels);
};
exports.getAllFuelTypes = getAllFuelTypes;
const getFuelTypeById = async (req, res) => {
    const { id } = req.params;
    const fuel = await server_1.prisma.fuelType.findUnique({ where: { id: Number(id) } });
    if (!fuel)
        return res.status(404).json({ message: 'Not found' });
    res.json(fuel);
};
exports.getFuelTypeById = getFuelTypeById;
