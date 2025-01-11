import * as React from 'react';

import { AuthStrategy } from '/src/lib/auth/strategy';
import { StrategyGuard } from '/src/components/auth/strategy-guard';

export default function Layout({ children }) {
  return <StrategyGuard expected={AuthStrategy.SUPABASE}>{children}</StrategyGuard>;
}
