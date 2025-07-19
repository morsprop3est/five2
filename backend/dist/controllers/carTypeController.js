"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarTypeById = exports.getAllCarTypes = void 0;
const server_1 = require("../server");
const getAllCarTypes = async (req, res) => {
    const types = await server_1.prisma.carType.findMany();
    res.json(types);
};
exports.getAllCarTypes = getAllCarTypes;
const getCarTypeById = async (req, res) => {
    const { id } = req.params;
    const type = await server_1.prisma.carType.findUnique({ where: { id: Number(id) } });
    if (!type)
        return res.status(404).json({ message: 'Not found' });
    res.json(type);
};
exports.getCarTypeById = getCarTypeById;
