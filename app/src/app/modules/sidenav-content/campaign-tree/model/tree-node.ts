import {TreeNodeRoutes} from "./tree-node-routes";

export interface TreeNode {
  name: string;
  route: TreeNodeRoutes;
  children?: TreeNode[];
}
