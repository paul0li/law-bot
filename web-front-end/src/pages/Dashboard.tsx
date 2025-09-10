import React from 'react'
import { useAuth } from '../auth/AuthContext'

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <div className="header">
        <div className="header-inner">
          <div className="brand">Law-bot Mini</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="muted">{user?.name} ({user?.role})</span>
            <button className="button secondary" onClick={logout}>Cerrar sesión</button>
          </div>
        </div>
      </div>
      <main className="container">
        <article className="card">
          <div className="card-inner stack-lg">
            <header>
              <h1>Panel</h1>
              <p className="muted">Bienvenido al área privada. Próximamente secciones de Documentos, Chats y Auditoría.</p>
            </header>
            <section className="stack">
              <h3>Qué podrás hacer</h3>
              <ul>
                <li>Como usuario: ver y chatear con tus documentos asignados; revisar y borrar tus chats.</li>
                <li>Como admin: gestionar usuarios, documentos y asignaciones; ver auditoría básica.</li>
              </ul>
            </section>
          </div>
        </article>
      </main>
    </div>
  )
}

export default Dashboard
