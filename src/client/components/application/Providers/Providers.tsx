import type { FC, ReactNode } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'urql';

import { Fallback } from '../../../pages/Fallback';
import { uqrlClient } from '../../../utils/urql_client';

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => (
  <Provider value={uqrlClient}>
    <BrowserRouter>
      <ErrorBoundary fallbackRender={Fallback}>
        <Suspense fallback={null}>{children}</Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>
);
