import * as vscode from 'vscode';
import {Requirement} from './requirement';

export class RequirementToCodeProvider implements vscode.TreeDataProvider<Requirement> {
    constructor(private workspaceRoot: string | undefined) {}

    getTreeItem(element: Requirement): vscode.TreeItem {
        return element;
    }

    getChildren(element?: Requirement): Thenable<Requirement[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No requirement in empty workspace');
            return Promise.resolve([]);
          }

        return Promise.resolve(
            this.getRequirements()
        );
    }

    private getRequirements(): Requirement[] {
        vscode.window.showInformationMessage('Creating requirements in view');
        let requirements: Requirement[] = [new Requirement("test", vscode.TreeItemCollapsibleState.None)];
        return requirements;
    }
}