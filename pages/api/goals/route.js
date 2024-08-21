import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/utils/db';
import Goal from '@/models/Goal';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const goals = await Goal.find({ userId });
      return res.status(200).json(goals);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching goals' });
    }
  }

  if (req.method === 'POST') {
    const { title, description } = req.body;
    try {
      const goal = await Goal.create({
        title,
        description,
        userId
      });
      return res.status(201).json(goal);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating goal' });
    }
  }

  if (req.method === 'PUT') {
    const { id, title, description } = req.body;
    try {
      const updatedGoal = await Goal.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
      return res.status(200).json(updatedGoal);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating goal' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      await Goal.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting goal' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  return res.status(405).end('Method Not Allowed');
}