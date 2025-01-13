'use client';

import { getAuth } from 'firebase/auth';

import { getFirebaseApp } from '/src/lib/firebase/client';

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}
