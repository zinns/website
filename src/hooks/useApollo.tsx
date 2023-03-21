import { initializeApollo } from 'config/apollo';
import { useMemo } from 'react';
import { APOLLO_STATE_PROP_NAME } from 'utils/apollo';

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
