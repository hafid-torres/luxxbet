import { Router } from 'express'
import { supabaseAdmin } from '../supabase.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

// Lista transações do usuário
router.get('/', requireAuth, async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('transactions')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

export default router
