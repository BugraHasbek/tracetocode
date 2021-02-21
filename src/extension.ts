import {window, workspace, commands, ExtensionContext, QuickInputButtons} from 'vscode';
import { access, constants, mkdirSync, existsSync } from 'fs';
const foldername = '.tracetocode';

function initialize(){
	window.showInformationMessage('tracetocode active!');	
}

function createRequirement(){
	if(!workspace.workspaceFolders){
		window.showInformationMessage('A project folder has not been opened yet!');
		return;
	}

	var absolutePath = workspace.workspaceFolders[0].uri.fsPath + '/' + foldername;
	access(absolutePath, constants.F_OK, (err) => {
		if(err){
			mkdirSync(absolutePath);
		}
	});

	window.showInputBox().then(value => {
		if(value)
			window.showInformationMessage('Requirement is :' + value);	

		/// keep a persistent id and create requirements based on this id. 
		/// 1 file per requirement
		/// 1 map file for tracing requirements to code
	});
	
}

export function activate(context: ExtensionContext) {
	let create = commands.registerCommand('tracetocode.createRequirement', createRequirement);
	context.subscriptions.push(create);
	initialize();
}

export function deactivate() {}

