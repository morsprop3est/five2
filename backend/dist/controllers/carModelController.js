"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarModelById = exports.getAllCarModels = void 0;
const server_1 = require("../server");
const getAllCarModels = async (req, res) => {
    const models = await server_1.prisma.carModel.findMany();
    res.json(models);
};
exports.getAllCarModels = getAllCarModels;
const getCarModelById = async (req, res) => {
    const { id } = req.params;
    const model = await server_1.prisma.carModel.findUnique({ where: { id: Number(id) } });
    if (!model)
        return res.status(404).json({ message: 'Not found' });
    res.json(model);
};
exports.getCarModelById = getCarModelById;
