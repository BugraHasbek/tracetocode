import * as vscode from 'vscode';
import { access, constants, mkdirSync, existsSync } from 'fs';
const foldername = '.tracetocode';

function initialize(){
	vscode.window.showInformationMessage('tracetocode active!');	
}

function createRequirement(){
	if(!vscode.workspace.workspaceFolders){
		vscode.window.showInformationMessage('A project folder has not been opened yet!');
		return;
	}

	var absolutePath = vscode.workspace.workspaceFolders[0].uri.fsPath + '/' + foldername;
	access(absolutePath, constants.F_OK, (err) => {
		if(err){
			mkdirSync(absolutePath);
		}
	});
}

export function activate(context: vscode.ExtensionContext) {
	let create = vscode.commands.registerCommand('tracetocode.createRequirement', createRequirement);
	context.subscriptions.push(create);
	initialize();
}

export function deactivate() {}

