import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Missing token' })

  try {
    const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET)
    req.user = { id: payload.sub } // sub = uuid do usuário
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
