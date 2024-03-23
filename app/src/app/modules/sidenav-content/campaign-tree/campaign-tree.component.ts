import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TreeNode} from "./model/tree-node";
import {TREE_DATA} from "./model/tree-data";
import {TreeNodeId} from "./model/tree-node-id";

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: TreeNodeId;
  level: number;
}

@Component({
  selector: 'app-campaign-tree',
  standalone: true,
  imports: [MatTreeModule, MatIconButton, MatIcon],
  templateUrl: './campaign-tree.component.html',
  styleUrl: './campaign-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignTreeComponent {

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  nodeClicked(treeNodeId: TreeNodeId) {
    console.log('Node clicked:', treeNodeId)
  }
}
