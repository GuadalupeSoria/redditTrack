// src/contexts/UserContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, PostRecord } from '../types';
import { saveUsers, loadUsers } from '../utils/localStorage';

interface UserContextType {
  users: User[];
  addUser: (name: string) => void;
  removeUser: (id: string) => void;
  updateUserRecord: (userId: string, date: string, postRecord: PostRecord) => void;
  addUserDate: (userId: string, date: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(loadUsers());

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  const addUser = (name: string) => {
    setUsers([...users, { id: Date.now().toString(), name, dailyRecords: {} }]);
  };

  const removeUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const updateUserRecord = (userId: string, date: string, postRecord: PostRecord) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const updatedDailyRecords = { ...user.dailyRecords };
        if (!updatedDailyRecords[date]) {
          updatedDailyRecords[date] = { date, posts: [] };
        }
        const postIndex = updatedDailyRecords[date].posts.findIndex(
          record => record.title === postRecord.title && record.subreddit === postRecord.subreddit
        );
        if (postIndex >= 0) {
          updatedDailyRecords[date].posts[postIndex] = postRecord;
        } else {
          updatedDailyRecords[date].posts.push(postRecord);
        }
        return { ...user, dailyRecords: updatedDailyRecords };
      }
      return user;
    }));
  };

  const addUserDate = (userId: string, date: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const updatedDailyRecords = { ...user.dailyRecords };
        if (!updatedDailyRecords[date]) {
          updatedDailyRecords[date] = { date, posts: [] }; // Inicializa la fecha con un arreglo vacío
        }
        return { ...user, dailyRecords: updatedDailyRecords };
      }
      return user;
    }));
  };

  return (
    <UserContext.Provider value={{ users, addUser, removeUser, updateUserRecord, addUserDate }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
