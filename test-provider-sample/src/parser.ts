import * as vscode from 'vscode';

const testRe = /^([0-9]+)\s*([+*\\/-])\s*([0-9]+)\s*=\s*([0-9]+)/gm;
const headingRe = /^(#+)\s*(.+)$/gm;

export const parseMarkdown = (document: vscode.TextDocument, text: string, events: {
	onTest(range: vscode.Range, a: number, operator: string, b: number, expected: number): void;
	onHeading(range: vscode.Range, name: string, depth: number): void;
}) => {
	let test: RegExpExecArray | null;
	while ((test = testRe.exec(text)) !== null) {
		const [match, a, operator, b, expected] = test;
		const startOffset = testRe.lastIndex - match.length;
		const endOffset = testRe.lastIndex;
		const range = new vscode.Range(document.positionAt(startOffset), document.positionAt(endOffset));
		events.onTest(range, Number(a), operator, Number(b), Number(expected));
	}
};
