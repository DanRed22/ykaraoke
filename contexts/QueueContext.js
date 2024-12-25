'use client';
import { createContext, useState, useContext } from 'react';

const QueueContext = createContext();

export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);

  return (
    <QueueContext.Provider value={{ queue, setQueue }}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  return useContext(QueueContext);
}