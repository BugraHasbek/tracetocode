import * as vscode from 'vscode';
import * as path from 'path';

export class Requirement extends vscode.TreeItem {
    constructor(
      public readonly label: string,
      public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
      super(label, collapsibleState);
    }
  
    iconPath = {
      light: path.join(__filename, '..', '..', 'resources', 'light', 'req.png'),
      dark: path.join(__filename, '..', '..', 'resources', 'dark', 'req.png')
    };
  }