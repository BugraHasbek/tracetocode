import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let createRequirement = vscode.commands.registerCommand('tracetocode.createRequirement', () => {
		vscode.window.showInformationMessage('Creating a new software requirement');
	});

	context.subscriptions.push(createRequirement);

	vscode.window.showInformationMessage('Initializing .tracetocode folder');	
}

export function deactivate() {}
