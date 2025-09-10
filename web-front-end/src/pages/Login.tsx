import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const Login: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as any
  const [email, setEmail] = useState('admin@lawbot.local')
  const [password, setPassword] = useState('admin')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      const dest = location.state?.from?.pathname || '/dashboard'
      navigate(dest, { replace: true })
    } catch (err: any) {
      setError(err?.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <div className="card-inner">
          <h1 className="auth-title">Law-bot Mini</h1>
          <p className="auth-subtitle">Inicia sesión para continuar</p>
          <form onSubmit={onSubmit} className="stack">
            <div>
              <label>Email</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Contraseña</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
            <div>
              <button className="button" type="submit" disabled={loading}>
                {loading ? 'Ingresando…' : 'Ingresar'}
              </button>
            </div>
          </form>
          <div className="muted" style={{ marginTop: 12 }}>
            <small>Usuario seed: admin@lawbot.local / admin</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
