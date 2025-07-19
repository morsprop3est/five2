"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.createProfile = exports.getProfileById = exports.getAllProfiles = void 0;
const server_1 = require("../server");
const getAllProfiles = async (req, res) => {
    const profiles = await server_1.prisma.userProfile.findMany();
    res.json(profiles);
};
exports.getAllProfiles = getAllProfiles;
const getProfileById = async (req, res) => {
    const { id } = req.params;
    const profile = await server_1.prisma.userProfile.findUnique({ where: { id: Number(id) } });
    if (!profile)
        return res.status(404).json({ message: 'Not found' });
    res.json(profile);
};
exports.getProfileById = getProfileById;
const createProfile = async (req, res) => {
    const data = req.body;
    const profile = await server_1.prisma.userProfile.create({ data });
    res.status(201).json(profile);
};
exports.createProfile = createProfile;
const updateProfile = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const profile = await server_1.prisma.userProfile.update({ where: { id: Number(id) }, data });
    res.json(profile);
};
exports.updateProfile = updateProfile;
const deleteProfile = async (req, res) => {
    const { id } = req.params;
    await server_1.prisma.userProfile.delete({ where: { id: Number(id) } });
    res.status(204).send();
};
exports.deleteProfile = deleteProfile;
