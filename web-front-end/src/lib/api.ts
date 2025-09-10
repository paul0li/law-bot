const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000'

type LoginResponse = {
  token: string
  user: {
    id: number
    name: string
    email: string
    role: 'admin' | 'user'
  }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Error de autenticación')
  }
  return res.json()
}
