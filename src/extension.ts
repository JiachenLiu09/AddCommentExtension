  
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.addComment', () => {
		vscode.window.showInputBox().then(result => getText(result));
	});

	context.subscriptions.push(disposable);
}

function getText(uri : any) {
    if (uri) {
        let u = vscode.Uri.file(uri);
        vscode.workspace.openTextDocument(u).then((document) => {
            let text = document.getText();
            if(text) {
                let editor = vscode.window.activeTextEditor;
                if (editor) {
                    let l = editor.selection.active.line;
                    let c = editor.selection.active.character;
                    editor.edit(editBuilder => {
                        editBuilder.replace(new vscode.Range(new vscode.Position(l, c), new vscode.Position(l, c++)), "/* " + text + " */");
                    });
                }
            }
        });
    }
}


export function deactivate() {}
