import { Router } from 'express'
import { supabaseAdmin } from '../supabase.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

// Pegar perfil do usuário logado
router.get('/', requireAuth, async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', req.user.id)
    .single()
  if (error) return res.status(500).json({ error: error.message })
  return res.json(data)
})

// Criar ou atualizar perfil
router.post('/', requireAuth, async (req, res) => {
  const { name } = req.body
  const payload = { id: req.user.id, name }
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .upsert(payload)
    .select('*')
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

export default router
