import {window, workspace, commands, ExtensionContext} from 'vscode';
import { access, constants, readFile, mkdirSync, writeFile } from 'fs';
import {RequirementToCodeProvider} from './requirementToCodeProvider';

const baseFolder = '.tracetocode';
const reqFolder = 'requirements';

var absolutePath : string | undefined = undefined;
var treeDataProvider: RequirementToCodeProvider;

function createRequirement(){
	if(!workspace.workspaceFolders){
		window.showInformationMessage('A project folder has not been opened yet!');
		return;
	}

	var absolutePath = workspace.workspaceFolders[0].uri.fsPath + '/' + baseFolder + '/' + reqFolder;
	access(absolutePath, constants.F_OK, (err) => {
		if(err){
			mkdirSync(absolutePath, { recursive: true });
		}
	});

	var idPath = workspace.workspaceFolders[0].uri.fsPath + '/' + baseFolder + '/' + 'id.txt';
	var id = '1';
	var idNumber;
	readFile(idPath, 'utf8', (err, data) => {
		if(err){
			window.showInformationMessage('Cannot read: ' + idPath);
		} else {
			id = data;
			idNumber = Number(id) + 1;
			id = String(idNumber);
		}
	});

	window.showInputBox().then(value => {
		if(value){
			writeFile(absolutePath + '/' + id + '.txt', value, function(err) {
				if(err){
					window.showInformationMessage('Can not write requirement to file: ' + err);	
				}
			});

			var idNumber = Number(id);

			writeFile(idPath, idNumber, function(err){
				if(err){
					window.showInformationMessage('Can not update id: ' + err);	
				}
			});
		}
	});
	
}

export function activate(context: ExtensionContext) {
	if(workspace.workspaceFolders){
		absolutePath = workspace.workspaceFolders[0].uri.fsPath + '/' + baseFolder + '/' + reqFolder;
	}
	
	let create = commands.registerCommand('tracetocode.createRequirement', createRequirement);
	context.subscriptions.push(create);
	treeDataProvider = new RequirementToCodeProvider(absolutePath);

	window.createTreeView('reqtocodeView', {treeDataProvider});
	commands.registerCommand('tracetocode.refreshEntry', () => 
		treeDataProvider.refresh()
	);
}

export function deactivate() {}

