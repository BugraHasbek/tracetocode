import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let create = vscode.commands.registerCommand('tracetocode.createRequirement', createRequirement);
	context.subscriptions.push(create);
	initialize();
}

export function deactivate() {}

function initialize(){
	vscode.window.showInformationMessage('Initializing .tracetocode folder');	
}

function createRequirement(){
	vscode.window.showInformationMessage('Creating a new software requirement');
}