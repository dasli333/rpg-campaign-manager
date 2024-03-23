import {TreeNodeId} from "./tree-node-id";

export interface TreeNode {
  name: string;
  id: TreeNodeId;
  children?: TreeNode[];
}
