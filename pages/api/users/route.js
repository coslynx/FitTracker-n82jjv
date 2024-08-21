import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/utils/db';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching user' });
    }
  }

  if (req.method === 'PUT') {
    const { username, email } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end('Method Not Allowed');
}