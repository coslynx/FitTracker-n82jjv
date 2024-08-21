import { API_URL } from './constants';

export const fetchGoals = async (userId: string) => {
  const res = await fetch(`${API_URL}/goals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch goals');
  }

  return res.json();
};

export const createGoal = async (userId: string, goal: Goal) => {
  const res = await fetch(`${API_URL}/goals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...goal, userId }),
  });

  if (!res.ok) {
    throw new Error('Failed to create goal');
  }

  return res.json();
};

export const updateGoal = async (goal: Goal) => {
  const res = await fetch(`${API_URL}/goals`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(goal),
  });

  if (!res.ok) {
    throw new Error('Failed to update goal');
  }

  return res.json();
};

export const deleteGoal = async (goalId: string) => {
  const res = await fetch(`${API_URL}/goals`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: goalId }),
  });

  if (!res.ok) {
    throw new Error('Failed to delete goal');
  }
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

export const fetchFitnessData = async (userId: string) => {
  const res = await fetch(`${API_URL}/fitness`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch fitness data');
  }

  return res.json();
};

export const createFitnessData = async (userId: string, fitnessData: FitnessData) => {
  const res = await fetch(`${API_URL}/fitness`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...fitnessData, userId }),
  });

  if (!res.ok) {
    throw new Error('Failed to create fitness data');
  }

  return res.json();
};

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