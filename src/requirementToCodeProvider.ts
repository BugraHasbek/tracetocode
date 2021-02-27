import * as vscode from 'vscode';
import {Requirement} from './requirement';
import {readdirSync } from 'fs';

export class RequirementToCodeProvider implements vscode.TreeDataProvider<Requirement> {
    constructor(private requirementFolder: string | undefined) {}

    getTreeItem(element: Requirement): vscode.TreeItem {
        return element;
    }

    getChildren(element?: Requirement): Thenable<Requirement[]> {
        if (!this.requirementFolder) {
            vscode.window.showInformationMessage('No requirement in empty workspace');
            return Promise.resolve([]);
          }

        return Promise.resolve(
            this.getRequirements()
        );
    }

    private getRequirements(): Requirement[] {
        let requirements: Requirement[] = [];

        if(!this.requirementFolder){
            vscode.window.showInformationMessage('Requirement folder is not provided');
            return requirements;
        }

        var files = readdirSync(this.requirementFolder);
        files.forEach(file => {
            requirements.push(new Requirement(file, vscode.TreeItemCollapsibleState.None));
        });
        
        return requirements;
    }
}