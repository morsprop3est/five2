"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGearboxTypeById = exports.getAllGearboxTypes = void 0;
const server_1 = require("../server");
const getAllGearboxTypes = async (req, res) => {
    const gearboxes = await server_1.prisma.gearboxType.findMany();
    res.json(gearboxes);
};
exports.getAllGearboxTypes = getAllGearboxTypes;
const getGearboxTypeById = async (req, res) => {
    const { id } = req.params;
    const gearbox = await server_1.prisma.gearboxType.findUnique({ where: { id: Number(id) } });
    if (!gearbox)
        return res.status(404).json({ message: 'Not found' });
    res.json(gearbox);
};
exports.getGearboxTypeById = getGearboxTypeById;
