import { Payload, Plugin } from "./index";

interface Logger
  extends Partial<Pick<Console, "groupCollapsed" | "group" | "groupEnd">> {
  log(message: string, color: string, payload: any): void;
  log(message: string): void;
}

export interface LoggerOption<State> {
  collapsed?: boolean;
  filter?: <P extends Payload>(
    mutation: P,
    stateBefore: State,
    stateAfter: State
  ) => boolean;
  transformer?: (state: State) => any;
  mutationTransformer?: <PayloadType extends Payload>(
    mutation: PayloadType
  ) => any;
  actionFilter?: <PayloadType extends Payload>(
    action: PayloadType,
    state: State
  ) => boolean;
  actionTransformer?: <PayloadType extends Payload>(action: PayloadType) => any;
  logMutations?: boolean;
  logActions?: boolean;
  logger?: Logger;
}

export function createLogger<State>(
  option?: LoggerOption<State>
): Plugin<State>;
