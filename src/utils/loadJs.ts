export default async function loadJs(
	src: string,
	checkHasScriptFn: () => boolean,
): Promise<any> {
	let hasScript = false
	if (typeof checkHasScriptFn === 'function') hasScript = checkHasScriptFn()
	if (hasScript) return await Promise.resolve()
	return await new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.src = src
		script.async = true
		document.body.appendChild(script)
		script.onload = resolve
		script.onerror = reject
	})
}
