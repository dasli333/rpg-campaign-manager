import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TreeNode} from "./model/tree-node";
import {TREE_DATA} from "./model/tree-data";
import {TreeNodeRoutes} from "./model/tree-node-routes";
import {Router, RouterLink} from "@angular/router";

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  route: TreeNodeRoutes;
  level: number;
}

@Component({
  selector: 'app-campaign-tree',
  standalone: true,
  imports: [MatTreeModule, MatIconButton, MatIcon, RouterLink],
  templateUrl: './campaign-tree.component.html',
  styleUrl: './campaign-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignTreeComponent {

  #router = inject(Router);

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      route: node.route,
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

  nodeClicked(treeNodeRoute: TreeNodeRoutes) {
    console.log('Node clicked:', treeNodeRoute);
    // this.#router.navigate([treeNodeId]);
  }
}
