import * as vscode from 'vscode';
import { TextDecoder } from 'util';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.addComment', () => {
		vscode.window.showInputBox().then(result => addComment(getText('file://' + result)));
	});

	context.subscriptions.push(disposable);
}

function getText(uri : any) {
	if(uri) {
		let u = vscode.Uri.parse(uri, true);
		console.log(u);
		let text;
		vscode.workspace.openTextDocument(u).then((document) => {
			console.log(document);
			text = document.getText();
		});
		console.log(text);
		return text;
	}
}

function addComment(contain : any) {
	if(contain) {
		let editor = vscode.window.activeTextEditor; 
		if(editor) {
			let l = editor.selection.active.line;
			let c = editor.selection.active.character;
			editor.edit(editBuilder => {
				editBuilder.replace(new vscode.Range(new vscode.Position(l, c), new vscode.Position(l, c++)), "// " + contain);
			});
		}
	}
}


export function deactivate() {}
