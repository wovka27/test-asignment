import { type UIMatch, useMatches } from 'react-router-dom';

export function useCurrentRoute<
  Params extends Record<string, string | undefined> | object = Record<string, string>,
  Data = unknown,
>(): UIMatch<Params, Data> | undefined {
  const matches = useMatches() as UIMatch<Params, Data>[];
  return matches.at(-1);
}
