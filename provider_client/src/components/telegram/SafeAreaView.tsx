import { useSignal, viewport } from '@telegram-apps/sdk-react';
import { PropsWithChildren } from 'react';

export const SafeAreaView = ({ children }: PropsWithChildren) => {
  const safeInsets = useSignal(viewport.safeAreaInsets);
  const contentInsets = useSignal(viewport.contentSafeAreaInsets);

  return (
    <div
      style={{
        paddingTop: `${safeInsets.top + contentInsets.top}px`,
        paddingBottom: `${safeInsets.bottom + contentInsets.bottom}px`,
      }}
    >
      {children}
    </div>
  );
};
