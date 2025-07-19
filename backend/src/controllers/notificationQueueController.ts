import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAllNotificationQueues = async (req: Request, res: Response) => {
  const notifications = await prisma.notificationQueue.findMany();
  res.json(notifications);
};

export const getNotificationQueueById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = await prisma.notificationQueue.findUnique({ where: { id: Number(id) } });
  if (!notification) return res.status(404).json({ message: 'Not found' });
  res.json(notification);
};

export const createNotificationQueue = async (req: Request, res: Response) => {
  const data = req.body;
  const notification = await prisma.notificationQueue.create({ data });
  res.status(201).json(notification);
};

export const updateNotificationQueue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const notification = await prisma.notificationQueue.update({ where: { id: Number(id) }, data });
  res.json(notification);
};

export const deleteNotificationQueue = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.notificationQueue.delete({ where: { id: Number(id) } });
  res.status(204).send();
}; 