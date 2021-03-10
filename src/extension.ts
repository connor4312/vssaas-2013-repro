import { createServer } from 'net';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "proposed-api-sample" is now active!');

	/**
	 * You can use proposed API here. `vscode.` should start auto complete
	 * Proposed API as defined in vscode.proposed.d.ts.
	 */

	const disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
		const port = 13337;
		try {
			await vscode.workspace.openTunnel({
				remoteAddress: { port, host: 'localhost' },
				localAddressPort: port,
			});
		} catch {
			// throws if already forwarded by user or by us previously
		}

		const server = createServer(conn => {
			console.log('got connection');
			conn.on('data', data => console.log('got data:', data.toString('hex')));
			conn.on('close', () => console.log('closed'));
		});

		server.listen(port);

		vscode.window.showInformationMessage(`Forwarded port ${port}, run test.js and check console for data`);
	});

	context.subscriptions.push(disposable);
}
