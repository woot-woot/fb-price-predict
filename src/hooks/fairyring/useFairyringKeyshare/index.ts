import { useQuery } from '@tanstack/react-query';

import { useClient } from '../useClient';

export default function useFairyringKeyshare() {
  const client = useClient();
  const QueryParams = (options: any) => {
    const key = { type: 'QueryParams' };
    return useQuery({
      queryKey: [key],
      queryFn: () => {
        return client.FairyringKeyshare.query
          .queryParams()
          .then((res) => res.data);
      },
      ...options,
    });
  };

  const QueryPubKey = (options: any) => {
    const key = { type: 'QueryPubKey' };
    return useQuery({
      queryKey: [key],
      queryFn: () => {
        return client.FairyringKeyshare.query
          .queryPubKey()
          .then((res) => res.data);
      },
      ...options,
    });
  };

  return {
    QueryParams,
    QueryPubKey,
  };
}
