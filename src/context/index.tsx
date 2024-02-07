import { ReactElement } from 'react';
import { UIProvider } from './ui';

const buildProvidersTree = (providers: React.FunctionComponent<{ children: ReactElement }>[]) => {
  const initialComponent = ({ children }: { children: ReactElement }) => <>{children}</>;

  return providers.reduce((AccumulatedComponents, Provider) => {
    return function Providers({ children }) {
      return (
        <AccumulatedComponents>
          <Provider>
            <>{children}</>
          </Provider>
        </AccumulatedComponents>
      );
    };
  }, initialComponent);
};

const ProvidersTree = buildProvidersTree([UIProvider] as unknown as React.FunctionComponent[]);

export default ProvidersTree;
