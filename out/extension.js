"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.addComment', () => {
        vscode.window.showInputBox().then(result => getText(result));
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function getText(uri) {
    if (uri) {
        let u = vscode.Uri.file(uri);
        vscode.workspace.openTextDocument(u).then((document) => {
            let text = document.getText();
            if (text) {
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
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map