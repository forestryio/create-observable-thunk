export function ensureArray(callbacks: Array<Function> | Function) {
  if (Array.isArray(callbacks)) {
    return callbacks
  }

  if (callbacks) {
    return [callbacks]
  }

  return []
}
