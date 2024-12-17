export const parseRange = param => {
  if (!param) return null

  const parts = param.split(',').map(p => p.trim())

  if (parts.length === 1) {
    return [parseInt(parts[0], 10)]
  }
  return parts.map(p => parseInt(p, 10))
}
