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

export interface Payload<Type extends string = string> {
  type: Type;
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

// Stricter Types

export function createStore<Options extends StoreOptions<any>>(
  options: Options,
  stricterTypes: true
): StricterStore<
  Options extends StoreOptions<infer State> ? State : never,
  NonNullable<Options["getters"]>,
  NonNullable<Options["actions"]>,
  NonNullable<Options["mutations"]>,
  NonNullable<Options["modules"]>
>;

export interface StricterStore<
  RootState,
  Getters extends GetterTree<RootState, RootState>,
  Actions extends ActionTree<RootState, RootState>,
  Mutations extends MutationTree<RootState>,
  Modules extends ModuleTree<RootState>
> extends Omit<Store<RootState>, "state" | "getters" | "dispatch" | "commit"> {
  readonly state: StoreState<RootState, RootState, Modules>;
  readonly getters: StoreGetters<RootState, RootState, Getters, Modules>;

  dispatch: StricterDispatch<RootState, RootState, Actions, Modules>;
  commit: StricterCommit<RootState, Mutations, Modules>;
}
export type StoreState<
  State,
  RootState,
  Modules extends ModuleTree<RootState>
> = State &
  {
    [Name in keyof Modules]: Modules[Name]["state"] &
      (Modules[Name]["modules"] extends ModuleTree<RootState>
        ? StoreState<
            Modules[Name]["state"],
            RootState,
            Modules[Name]["modules"]
          >
        : {});
  };

export type StoreGetters<
  State,
  RootState,
  Getters extends GetterTree<State, RootState>,
  Modules extends ModuleTree<RootState>
> = {
  [Name in keyof Getters]: ReturnType<Getters[Name]>;
} &
  {
    [Path in ExtractNamespacedPaths<
      RootState,
      Modules,
      "getters"
    >]: ResolveNamespacedPath<
      Path,
      "getters",
      RootState,
      Modules
    > extends infer Getter
      ? Getter extends () => infer ReturnType
        ? ReturnType
        : never
      : never;
  };

export interface StricterDispatch<
  State = any,
  RootState = any,
  Actions extends ActionTree<State, RootState> = any,
  Modules extends ModuleTree<RootState> = any
> {
  <Type extends DispatchType<State, RootState, Actions, Modules>>(
    type: Type,
    payload?: ExtractPayloadType<
      DispatchAction<State, RootState, Actions, Modules, Type>
    >,
    options?: DispatchOptions
  ): ReturnType<DispatchAction<State, RootState, Actions, Modules, Type>>;

  <Type extends DispatchType<State, RootState, Actions, Modules>>(
    payloadWithType: Payload<Type> &
      ExtractPayloadType<
        DispatchAction<State, RootState, Actions, Modules, Type>
      >,
    options?: DispatchOptions
  ): Promise<any>;
}
export type DispatchType<
  State,
  RootState,
  Actions extends ActionTree<State, RootState>,
  Modules extends ModuleTree<RootState>
> =
  | (string & keyof Actions)
  | ExtractNamespacedPaths<RootState, Modules, "actions">;
export type DispatchAction<
  State,
  RootState,
  Actions extends ActionTree<State, RootState>,
  Modules extends ModuleTree<RootState>,
  Type extends DispatchType<State, RootState, Actions, Modules>
> = Type extends string & keyof Actions
  ? EnsureActionHandler<State, RootState, Actions[Type]>
  : Type extends ExtractNamespacedPaths<RootState, Modules, "actions">
  ? ResolveNamespacedPath<
      Type,
      "actions",
      RootState,
      Modules
    > extends infer ActionType
    ? ActionType extends Action<State, RootState>
      ? EnsureActionHandler<State, RootState, ActionType>
      : never
    : never
  : never;
export type EnsureActionHandler<
  State,
  RootState,
  ActionType extends Action<State, RootState>
> = ActionType extends ActionObject<State, RootState>
  ? ActionType["handler"]
  : ActionType;

export interface StricterCommit<
  RootState = any,
  Mutations extends MutationTree<RootState> = any,
  Modules extends ModuleTree<RootState> = any
> {
  <Type extends CommitType<RootState, Mutations, Modules>>(
    type: Type,
    payload?: ExtractPayloadType<
      CommitMutation<RootState, Mutations, Modules, Type>
    >,
    options?: CommitOptions
  ): void;

  <Type extends CommitType<RootState, Mutations, Modules>>(
    payloadWithType: Payload<Type> &
      ExtractPayloadType<CommitMutation<RootState, Mutations, Modules, Type>>,
    options?: CommitOptions
  ): void;
}
export type CommitType<
  RootState,
  Mutations extends MutationTree<RootState>,
  Modules extends ModuleTree<RootState>
> =
  | (string & keyof Mutations)
  | ExtractNamespacedPaths<RootState, Modules, "mutations">;
export type CommitMutation<
  RootState,
  Mutations extends MutationTree<RootState>,
  Modules extends ModuleTree<RootState>,
  Type extends CommitType<RootState, Mutations, Modules>
> = Type extends string & keyof Mutations
  ? Mutations[Type]
  : Type extends ExtractNamespacedPaths<RootState, Modules, "mutations">
  ? ResolveNamespacedPath<
      Type,
      "mutations",
      RootState,
      Modules
    > extends infer MutationType
    ? MutationType extends Mutation<any>
      ? MutationType
      : never
    : never
  : never;

export type ExtractPayloadType<
  T extends (_: any, payload: any, ...args: any[]) => any
> = Parameters<T>[1];

export type ExtractNamespacedPaths<
  RootState,
  Modules extends ModuleTree<RootState>,
  KeysFrom extends keyof Module<unknown, unknown>
> = {
  [Name in string & keyof Modules]: Modules[Name]["namespaced"] extends true
    ?
        | `${Name}/${string & keyof Modules[Name][KeysFrom]}`
        | `${Name}/${Modules[Name]["modules"] extends ModuleTree<RootState>
            ? ExtractNamespacedPaths<
                RootState,
                Modules[Name]["modules"],
                KeysFrom
              >
            : never}`
    : never;
} extends infer T
  ? T[keyof T]
  : never;
export type ResolveNamespacedPath<
  Path extends string,
  KeysFrom extends keyof Module<unknown, unknown>,
  RootState,
  Modules extends ModuleTree<RootState>
> = Path extends `${infer ModuleName}/${infer RestPathOrKey}`
  ? RestPathOrKey extends keyof Modules[ModuleName][KeysFrom]
    ? Modules[ModuleName][KeysFrom][RestPathOrKey]
    : ResolveNamespacedPath<
        RestPathOrKey,
        KeysFrom,
        RootState,
        NonNullable<Modules[ModuleName]["modules"]>
      >
  : never;
