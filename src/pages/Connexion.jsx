import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Connexion.css'

function Connexion() {
  const navigate = useNavigate()

  const [loginForm, setLoginForm] = useState({
    email: '',
    motDePasse: ''
  })

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulation de la connexion
    navigate('/suivi')
  }

  return (
    <div className="connexion-container">
      <div className="connexion-header">
        <div className="logo-container">
          <h1 className="logo-text">Revenu Québec</h1>
          <p className="logo-subtitle">Déclaration de revenus en ligne</p>
        </div>
      </div>

      <div className="connexion-card">
        <h2 className="card-title">Se connecter</h2>
        <p className="card-subtitle">Accédez à votre espace personnel</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Courriel *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
              required
              placeholder="exemple@courriel.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="motDePasse">Mot de passe *</label>
            <input
              type="password"
              id="motDePasse"
              name="motDePasse"
              value={loginForm.motDePasse}
              onChange={handleChange}
              required
              placeholder="Entrez votre mot de passe"
              autoComplete="current-password"
            />
          </div>

          <div className="form-footer">
            <a href="#" className="link">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="submit-button">
            Se connecter
          </button>
        </form>

        <div className="divider">
          <span>ou</span>
        </div>

        <div className="signup-link">
          <p>Vous n'avez pas de compte ?</p>
          <Link to="/inscription" className="link-primary">
            Créer un compte
          </Link>
        </div>

        <div className="info-message">
          <span className="info-icon">ℹ️</span>
          <p>
            Ce service est réservé aux contribuables ayant des revenus annuels
            inférieurs à 30 000 $. La déclaration en ligne est gratuite et sécurisée.
          </p>
        </div>
      </div>

      <footer className="connexion-footer">
        <p>© Gouvernement du Québec - Revenu Québec</p>
        <div className="footer-links">
          <a href="#">Aide</a>
          <a href="#">Politique de confidentialité</a>
          <a href="#">Accessibilité</a>
        </div>
      </footer>
    </div>
  )
}

export default Connexion
