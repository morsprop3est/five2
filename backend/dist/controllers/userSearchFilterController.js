"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSearchFilter = exports.updateUserSearchFilter = exports.createUserSearchFilter = exports.getUserSearchFilterById = exports.getAllUserSearchFilters = void 0;
const server_1 = require("../server");
const getAllUserSearchFilters = async (req, res) => {
    const filters = await server_1.prisma.userSearchFilter.findMany();
    res.json(filters);
};
exports.getAllUserSearchFilters = getAllUserSearchFilters;
const getUserSearchFilterById = async (req, res) => {
    const { id } = req.params;
    const filter = await server_1.prisma.userSearchFilter.findUnique({ where: { id: Number(id) } });
    if (!filter)
        return res.status(404).json({ message: 'Not found' });
    res.json(filter);
};
exports.getUserSearchFilterById = getUserSearchFilterById;
const createUserSearchFilter = async (req, res) => {
    const data = req.body;
    const filter = await server_1.prisma.userSearchFilter.create({ data });
    res.status(201).json(filter);
};
exports.createUserSearchFilter = createUserSearchFilter;
const updateUserSearchFilter = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const filter = await server_1.prisma.userSearchFilter.update({ where: { id: Number(id) }, data });
    res.json(filter);
};
exports.updateUserSearchFilter = updateUserSearchFilter;
const deleteUserSearchFilter = async (req, res) => {
    const { id } = req.params;
    await server_1.prisma.userSearchFilter.delete({ where: { id: Number(id) } });
    res.status(204).send();
};
exports.deleteUserSearchFilter = deleteUserSearchFilter;
