import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from 'react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const id = 'react-query-error';
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast({ id, title, status: 'error', variant: 'subtle', isClosable: true });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
});

// 위와 같은 onError 핸들러를 사용하는 것에 대한 대안: React Error Boundary
// 리액트의 useErrorBoundary훅을 이용하여 각각의 useQuery, useMutation의 option에
// 해당 핸들러를 적용할 수 있다. (물론 위와 같이 queryClient의 defaultOptions에도 적용이 가능)
// 이렇게 하면 react-query에서 에러 핸들링을 하는 것이 아닌,
// react error boundary를 이용하여 에러 핸들링을 할 수 있게 된다.
