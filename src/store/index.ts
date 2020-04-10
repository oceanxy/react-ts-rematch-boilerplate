import models from '@/models';
import { init, RematchDispatch, RematchRootState, RematchStore } from '@rematch/core';

export const store = init({
  models
});

export type Store = typeof store;
export type RootModel = typeof models;
// export type Dispatch = typeof store.dispatch;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

