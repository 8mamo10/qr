/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import QRCode from "qrcode-svg";

export default {
	async fetch(request, env, ctx) {
		if (request.method == "POST") {
			return generateQRCode(request);
		}
		return new Response("Expected POST request", {
			status: 405,
		});
	},
};

async function generateQRCode(request) {
	const { text } = await request.json();
	const qr = QRCode({ context: text || "https://workers.dev" });
	return new Response(qr.svg(), { headers: { "Context-Type": "image/svg+xml" } });
}