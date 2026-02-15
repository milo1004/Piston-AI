var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, 'name', { value, configurable: true });

// src/index.ts
var corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};
function withCors(response) {
	const headers = new Headers(response.headers);
	for (const [k, v] of Object.entries(corsHeaders)) {
		headers.set(k, v);
	}
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}
__name(withCors, 'withCors');
var index_default = {
	async fetch(request, env) {
		if (request.method === 'OPTIONS') {
			return withCors(new Response(null, { status: 204 }));
		}
		try {
			if (request.method !== 'POST') {
				return withCors(new Response('Method Not Allowed', { status: 405 }));
			}
			const formData = await request.formData();
			const audio = formData.get('audio');
			if (!audio || !(audio instanceof File)) {
				return withCors(Response.json({ error: 'Missing audio file' }, { status: 400 }));
			}
			const buffer = await audio.arrayBuffer();
			const result = await env.AI.run('@cf/openai/whisper', {
				audio: [...new Uint8Array(buffer)],
				task: 'transcribe',
				language: 'en',
				initial_prompt: 'You are an STT engine of a voiced assistant. They might talk more casually.',
			});
			return withCors(Response.json({ text: result.text }));
		} catch (err) {
			console.error('Worker error:', err);
			return withCors(Response.json({ error: 'Internal error', detail: String(err) }, { status: 500 }));
		}
	},
};
export { index_default as default };
//# sourceMappingURL=index.js.map
