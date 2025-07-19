import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAllProfiles = async (req: Request, res: Response) => {
  const profiles = await prisma.userProfile.findMany();
  res.json(profiles);
};

export const getProfileById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const profile = await prisma.userProfile.findUnique({ where: { id: Number(id) } });
  if (!profile) return res.status(404).json({ message: 'Not found' });
  res.json(profile);
};

export const createProfile = async (req: Request, res: Response) => {
  const data = req.body;
  const profile = await prisma.userProfile.create({ data });
  res.status(201).json(profile);
};

export const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const profile = await prisma.userProfile.update({ where: { id: Number(id) }, data });
  res.json(profile);
};

export const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.userProfile.delete({ where: { id: Number(id) } });
  res.status(204).send();
}; 