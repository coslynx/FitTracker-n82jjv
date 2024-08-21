import { API_URL, AUTH_URL } from './constants';
import { User } from './types';

export const createUser = async (user: User) => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error('Failed to create user');
  }

  return res.json();
};

export const fetchUser = async (userId: string) => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  return res.json();
};

export const updateUser = async (user: User) => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error('Failed to update user');
  }

  return res.json();
};