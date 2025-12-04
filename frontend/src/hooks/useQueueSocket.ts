// apps/web/src/hooks/useQueueSocket.ts
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { getQueueState } from '../services/api';

const SOCKET_URL = 'http://localhost:3000'; // Backend URL

export interface QueueState {
  waiting: any[]; // Replace 'any' with your actual BookingQueue type later
  washing: any[]; // Replace 'any' with your actual BookingQueue type later
}

export const useQueueSocket = (branchId: string) => {
  const [queueState, setQueueState] = useState<QueueState>({ waiting: [], washing: [] });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!branchId) return;

    // Fetch initial state
    getQueueState(branchId)
        .then(setQueueState)
        .catch(err => console.error("Failed to fetch initial queue state:", err));

    const socket: Socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Socket connected!');
      setIsConnected(true);
      // Future improvement: join a room for the specific branch
      // socket.emit('join_branch_room', branchId);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected!');
      setIsConnected(false);
    });

    socket.on('queue_updated', (newQueueState: QueueState) => {
      console.log('Queue state updated:', newQueueState);
      setQueueState(newQueueState);
    });

    return () => {
      socket.disconnect();
    };
  }, [branchId]); // Reconnect if branchId changes

  return { queueState, isConnected };
};
