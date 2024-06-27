import { mock } from "bun:test";

export const getMockedFetch = (response: Partial<Response>) => {
  return mock(() =>
    Promise.resolve({
      ...response,
    }),
  );
};
