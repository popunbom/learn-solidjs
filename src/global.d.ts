import { Cell } from "./lib/board";

export { };

declare module "solid-js" {
  namespace JSX {
    interface ExplicitAttributes {
      "cell-state": Cell["state"];
      fixed: boolean;
    }
  }
}
