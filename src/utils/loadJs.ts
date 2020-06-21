export default function loadJs (src: string, checkHasScriptFn: ()=> boolean) {
  let hasScript = false
  if (typeof checkHasScriptFn === 'function') hasScript = checkHasScriptFn()
  if (hasScript) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)
    script.onload = resolve
    script.onerror = reject
  })
}
