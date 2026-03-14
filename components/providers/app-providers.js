'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { makeStore } from '@/store';
import { createQueryClient } from '@/services/query-client';

export default function AppProviders({ children }) {
  const [store] = useState(() => makeStore());
  const [queryClient] = useState(() => createQueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
