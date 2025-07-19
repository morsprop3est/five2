"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotificationQueue = exports.updateNotificationQueue = exports.createNotificationQueue = exports.getNotificationQueueById = exports.getAllNotificationQueues = void 0;
const server_1 = require("../server");
const getAllNotificationQueues = async (req, res) => {
    const notifications = await server_1.prisma.notificationQueue.findMany();
    res.json(notifications);
};
exports.getAllNotificationQueues = getAllNotificationQueues;
const getNotificationQueueById = async (req, res) => {
    const { id } = req.params;
    const notification = await server_1.prisma.notificationQueue.findUnique({ where: { id: Number(id) } });
    if (!notification)
        return res.status(404).json({ message: 'Not found' });
    res.json(notification);
};
exports.getNotificationQueueById = getNotificationQueueById;
const createNotificationQueue = async (req, res) => {
    const data = req.body;
    const notification = await server_1.prisma.notificationQueue.create({ data });
    res.status(201).json(notification);
};
exports.createNotificationQueue = createNotificationQueue;
const updateNotificationQueue = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const notification = await server_1.prisma.notificationQueue.update({ where: { id: Number(id) }, data });
    res.json(notification);
};
exports.updateNotificationQueue = updateNotificationQueue;
const deleteNotificationQueue = async (req, res) => {
    const { id } = req.params;
    await server_1.prisma.notificationQueue.delete({ where: { id: Number(id) } });
    res.status(204).send();
};
exports.deleteNotificationQueue = deleteNotificationQueue;
