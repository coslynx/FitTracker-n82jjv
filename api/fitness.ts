import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/utils/db';
import FitnessData from '@/models/FitnessData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const fitnessData = await FitnessData.find({ userId });
      return res.status(200).json(fitnessData);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching fitness data' });
    }
  }

  if (req.method === 'POST') {
    const { date, weight, steps, caloriesBurned } = req.body;
    try {
      const fitnessEntry = await FitnessData.create({
        date,
        weight,
        steps,
        caloriesBurned,
        userId,
      });
      return res.status(201).json(fitnessEntry);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating fitness data' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end('Method Not Allowed');
}