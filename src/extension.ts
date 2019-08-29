import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.addComment', () => {
		vscode.window.showInputBox().then(result => addComment(result));
	});

	context.subscriptions.push(disposable);
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
