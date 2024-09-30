// src/utils/localStorage.ts
import { User } from '../types';

export const saveUsers = (users: User[]): void => {
  localStorage.setItem('redditTrackerUsers', JSON.stringify(users));
};

export const loadUsers = (): User[] => {
  const savedUsers = localStorage.getItem('redditTrackerUsers');
  return savedUsers ? JSON.parse(savedUsers) : [];
};