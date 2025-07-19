"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const server_1 = require("../server");
const getAllUsers = async (req, res) => {
    const users = await server_1.prisma.user.findMany();
    res.json(users);
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await server_1.prisma.user.findUnique({ where: { id } });
    if (!user)
        return res.status(404).json({ message: 'Not found' });
    res.json(user);
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    const data = req.body;
    const user = await server_1.prisma.user.create({ data });
    res.status(201).json(user);
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const user = await server_1.prisma.user.update({ where: { id }, data });
    res.json(user);
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    await server_1.prisma.user.delete({ where: { id } });
    res.status(204).send();
};
exports.deleteUser = deleteUser;
