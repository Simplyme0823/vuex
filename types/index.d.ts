import { App, InjectionKey, WatchOptions } from "vue";
import {
  createNamespacedHelpers,
  mapActions,
  mapGetters,
  mapMutations,
  mapState,
} from "./helpers";
import { createLogger } from "./logger";
// augment typings of Vue.js
import "./vue";

export * from "./helpers";
export * from "./logger";

export declare class Store<RootState> {
  constructor(options: StoreOptions<RootState>);

  readonly state: RootState;
  readonly getters: any;

  install(app: App, injectKey?: InjectionKey<Store<any>> | string): void;

  replaceState(state: RootState): void;

  dispatch: Dispatch;
  commit: Commit;

  subscribe<Payload extends MutationPayload>(
    fn: (mutation: Payload, state: RootState) => any,
    options?: SubscribeOptions
  ): () => void;
  subscribeAction<P extends ActionPayload>(
    fn: SubscribeActionOptions<P, RootState>,
    options?: SubscribeOptions
  ): () => void;
  watch<T>(
    getter: (state: RootState, getters: any) => T,
    cb: (value: T, oldValue: T) => void,
    options?: WatchOptions
  ): () => void;

  registerModule<State>(
    path: string,
    module: Module<State, RootState>,
    options?: ModuleOptions
  ): void;
  registerModule<State>(
    path: string[],
    module: Module<State, RootState>,
    options?: ModuleOptions
  ): void;

  unregisterModule(path: string): void;
  unregisterModule(path: string[]): void;

  hasModule(path: string): boolean;
  hasModule(path: string[]): boolean;

  hotUpdate(options: {
    actions?: ActionTree<RootState, RootState>;
    mutations?: MutationTree<RootState>;
    getters?: GetterTree<RootState, RootState>;
    modules?: ModuleTree<RootState>;
  }): void;
}

export const storeKey: string;

export function createStore<RootState>(
  options: StoreOptions<RootState>
): Store<RootState>;

export function useStore<RootState = any>(
  injectKey?: InjectionKey<Store<RootState>> | string
): Store<RootState>;

export interface Dispatch {
  (type: string, payload?: any, options?: DispatchOptions): Promise<any>;
  <PayloadType extends Payload>(
    payloadWithType: PayloadType,
    options?: DispatchOptions
  ): Promise<any>;
}

export interface Commit {
  (type: string, payload?: any, options?: CommitOptions): void;
  <PayloadType extends Payload>(
    payloadWithType: PayloadType,
    options?: CommitOptions
  ): void;
}

export interface ActionContext<State, RootState> {
  dispatch: Dispatch;
  commit: Commit;
  state: State;
  getters: any;
  rootState: RootState;
  rootGetters: any;
}

export interface Payload {
  type: string;
}

export interface MutationPayload extends Payload {
  payload: any;
}

export interface ActionPayload extends Payload {
  payload: any;
}

export interface SubscribeOptions {
  prepend?: boolean;
}

export type ActionSubscriber<Action, State> = (
  action: Action,
  state: State
) => any;
export type ActionErrorSubscriber<Action, State> = (
  action: Action,
  state: State,
  error: Error
) => any;

export interface ActionSubscribersObject<Action, State> {
  before?: ActionSubscriber<Action, State>;
  after?: ActionSubscriber<Action, State>;
  error?: ActionErrorSubscriber<Action, State>;
}

export type SubscribeActionOptions<Action, State> =
  | ActionSubscriber<Action, State>
  | ActionSubscribersObject<Action, State>;

export interface DispatchOptions {
  root?: boolean;
}

export interface CommitOptions {
  silent?: boolean;
  root?: boolean;
}

export interface StoreOptions<RootState> {
  state?: RootState | (() => RootState);
  getters?: GetterTree<RootState, RootState>;
  actions?: ActionTree<RootState, RootState>;
  mutations?: MutationTree<RootState>;
  modules?: ModuleTree<RootState>;
  plugins?: Plugin<RootState>[];
  strict?: boolean;
  devtools?: boolean;
}

export type ActionHandler<State, RootState> = (
  this: Store<RootState>,
  injectee: ActionContext<State, RootState>,
  payload?: any
) => any;
export interface ActionObject<State, RootState> {
  root?: boolean;
  handler: ActionHandler<State, RootState>;
}

export type Getter<State, RootState> = (
  state: State,
  getters: any,
  rootState: RootState,
  rootGetters: any
) => any;
export type Action<State, RootState> =
  | ActionHandler<State, RootState>
  | ActionObject<State, RootState>;
export type Mutation<State> = (state: State, payload?: any) => any;
export type Plugin<State> = (store: Store<State>) => any;

export interface Module<State, RootState> {
  namespaced?: boolean;
  state?: State | (() => State);
  getters?: GetterTree<State, RootState>;
  actions?: ActionTree<State, RootState>;
  mutations?: MutationTree<State>;
  modules?: ModuleTree<RootState>;
}

export interface ModuleOptions {
  preserveState?: boolean;
}

export interface GetterTree<State, RootState> {
  [key: string]: Getter<State, RootState>;
}

export interface ActionTree<State, RootState> {
  [key: string]: Action<State, RootState>;
}

export interface MutationTree<State> {
  [key: string]: Mutation<State>;
}

export interface ModuleTree<RootState> {
  [key: string]: Module<any, RootState>;
}

declare const _default: {
  Store: typeof Store;
  mapState: typeof mapState;
  mapMutations: typeof mapMutations;
  mapGetters: typeof mapGetters;
  mapActions: typeof mapActions;
  createNamespacedHelpers: typeof createNamespacedHelpers;
  createLogger: typeof createLogger;
};
export default _default;
