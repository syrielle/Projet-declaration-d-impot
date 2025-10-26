import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Inscription.css'

function Inscription() {
  const navigate = useNavigate()

  const [signupForm, setSignupForm] = useState({
    email: '',
    nas: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    motDePasse: '',
    confirmMotDePasse: ''
  })

  const handleChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulation de l'inscription
    navigate('/suivi')
  }

  return (
    <div className="inscription-container">
      <div className="inscription-header">
        <div className="logo-container">
          <h1 className="logo-text">Revenu Québec</h1>
          <p className="logo-subtitle">Déclaration de revenus en ligne</p>
        </div>
      </div>

      <div className="inscription-card">
        <h2 className="card-title">Créer un compte</h2>
        <p className="card-subtitle">Remplissez le formulaire pour créer votre compte</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Courriel *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={signupForm.email}
              onChange={handleChange}
              required
              placeholder="exemple@courriel.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nas">Numéro d'assurance sociale (NAS) *</label>
            <input
              type="text"
              id="nas"
              name="nas"
              value={signupForm.nas}
              onChange={handleChange}
              required
              placeholder="000 000 000"
              maxLength="11"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">Nom *</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={signupForm.nom}
                onChange={handleChange}
                required
                autoComplete="family-name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prenom">Prénom *</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={signupForm.prenom}
                onChange={handleChange}
                required
                autoComplete="given-name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dateNaissance">Date de naissance *</label>
            <input
              type="date"
              id="dateNaissance"
              name="dateNaissance"
              value={signupForm.dateNaissance}
              onChange={handleChange}
              required
              autoComplete="bday"
            />
          </div>

          <div className="form-group">
            <label htmlFor="motDePasse">Mot de passe *</label>
            <input
              type="password"
              id="motDePasse"
              name="motDePasse"
              value={signupForm.motDePasse}
              onChange={handleChange}
              required
              placeholder="Minimum 8 caractères"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmMotDePasse">Confirmer le mot de passe *</label>
            <input
              type="password"
              id="confirmMotDePasse"
              name="confirmMotDePasse"
              value={signupForm.confirmMotDePasse}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          {/* <div className="info-message">
            <span className="info-icon">ℹ️</span>
            <p>Vos informations servent uniquement à sécuriser l'accès à votre compte et à identifier votre dossier fiscal.</p>
          </div> */}

          <button type="submit" className="submit-button">
            Créer mon compte
          </button>
        </form>

        <div className="divider">
          <span>ou</span>
        </div>

        <div className="login-link">
          <p>Vous avez déjà un compte ?</p>
          <Link to="/connexion" className="link-primary">
            Se connecter
          </Link>
        </div>
      </div>

      <footer className="inscription-footer">
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

export default Inscription
