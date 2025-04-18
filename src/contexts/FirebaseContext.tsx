
import React, { createContext, useContext, ReactNode } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, collection, doc } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { Analytics } from 'firebase/analytics';
import { FirebaseStorage, ref as storageRef } from 'firebase/storage';
import { Database, ref as databaseRef } from 'firebase/database';
import { app, db, auth, analytics, storage, rtdb } from '../config/firebase';

interface FirebaseContextType {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
  analytics: Analytics;
  storage: FirebaseStorage;
  rtdb: Database;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ app, db, auth, analytics, storage, rtdb }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

// Utility function to get collection reference
export const getCollectionRef = (collectionName: string) => {
  return collection(db, collectionName);
};

// Utility function to get document reference
export const getDocumentRef = (collectionName: string, documentId: string) => {
  return doc(db, collectionName, documentId);
};

// Utility function to get real-time database reference
export const getRTDBRef = (path: string) => {
  return databaseRef(rtdb, path);
};

// Utility function to get storage reference
export const getStorageRef = (path: string) => {
  return storageRef(storage, path);
};
