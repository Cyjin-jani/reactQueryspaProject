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
  // toast({ id, title, status: 'error', variant: 'subtle', isClosable: true });
  // 기존에 id를 넣어주는 경우, 값이 중복되어 토스트 메세지가 나타나지 않아 id를 제거함
  // id는 기본적으로 unique한 아이디를 만들어주므로 따로 지정하지 않아도 되는것으로 보인다.
  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      retry: false,
      // 리패칭을 자주 할 필요 없는 데이터가 대부분이라서 아래와 같이 설정함
      staleTime: 600000, // 10min
      cacheTime: 900000, // 15min (staleTime이 cacheTime을 넘을 수 없도록 설정)
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// 위와 같은 onError 핸들러를 사용하는 것에 대한 대안: React Error Boundary
// 리액트의 useErrorBoundary훅을 이용하여 각각의 useQuery, useMutation의 option에
// 해당 핸들러를 적용할 수 있다. (물론 위와 같이 queryClient의 defaultOptions에도 적용이 가능)
// 이렇게 하면 react-query에서 에러 핸들링을 하는 것이 아닌,
// react error boundary를 이용하여 에러 핸들링을 할 수 있게 된다.

/** Options for pre-populating data
 *                 where to use ?      data from ?     added to cache ?
 * prefetchQuery   queryClient(method) server          yes
 * setQueryData    queryClient(method) client          yes
 * placeholderData useQuery(option)    client          no
 * initialData     useQuery(option)    client          yes
 */
