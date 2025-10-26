import { useNavigate } from 'react-router-dom'
import './Suivi.css'

function Suivi() {
  const navigate = useNavigate()

  const declarationsEnCours = [
    {
      id: 1,
      annee: 2024,
      dateCreation: '2024-03-15',
      statut: 'Brouillon',
      badge: 'draft'
    },
    {
      id: 2,
      annee: 2023,
      dateCreation: '2024-03-10',
      dateModification: '2024-03-12',
      statut: 'Soumise',
      badge: 'submitted'
    },
    {
      id: 3,
      annee: 2022,
      dateCreation: '2024-02-20',
      dateModification: '2024-03-01',
      statut: 'En validation',
      badge: 'validating'
    }
  ]

  const historique = [
    {
      id: 4,
      annee: 2021,
      dateDepot: '2022-04-15',
      dateAvis: '2022-05-20',
      statut: 'Avis émis',
      typeAvis: 'automatique',
      montant: '+180.00'
    },
    {
      id: 5,
      annee: 2020,
      dateDepot: '2021-03-28',
      dateAvis: '2021-06-10',
      statut: 'Avis émis',
      typeAvis: 'personnalise',
      montant: '-125.50'
    },
    {
      id: 6,
      annee: 2019,
      dateDepot: '2020-04-10',
      dateAvis: '2020-05-15',
      statut: 'Avis émis',
      typeAvis: 'automatique',
      montant: '+220.00'
    }
  ]

  const getStatusBadgeClass = (badge) => {
    const classes = {
      draft: 'status-draft',
      submitted: 'status-submitted',
      validating: 'status-validating',
      reviewing: 'status-reviewing',
      issued: 'status-issued'
    }
    return classes[badge] || 'status-default'
  }

  const handleViewAvis = (typeAvis) => {
    if (typeAvis === 'automatique') {
      navigate('/avis-auto')
    } else {
      navigate('/avis-personnalise')
    }
  }

  const handleLogout = () => {
    // Simulation de la déconnexion
    navigate('/connexion')
  }

  return (
    <div className="suivi-container">
      <header className="suivi-header">
        <div className="header-content">
          <h1 className="logo">Revenu Québec</h1>
          <nav className="nav-menu">
            <button className="nav-button active">Suivi</button>
            <button className="nav-button" onClick={() => navigate('/declaration')}>
              Nouvelle déclaration
            </button>
            <button className="nav-button">Profil</button>
          </nav>
          <button className="btn-logout" onClick={handleLogout}>
            ⏻ Se déconnecter
          </button>
        </div>
      </header>

      <div className="suivi-content">
        <h2 className="page-title">Tableau de bord</h2>

        {/* Déclarations en cours */}
        <section className="dashboard-section">
          <h3 className="section-title">Déclarations en cours</h3>

          <div className="table-container">
            <table className="declarations-table">
              <thead>
                <tr>
                  <th>Année fiscale</th>
                  <th>Date de création</th>
                  <th>Dernière modification</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {declarationsEnCours.map((declaration) => (
                  <tr key={declaration.id}>
                    <td><strong>{declaration.annee}</strong></td>
                    <td>{new Date(declaration.dateCreation).toLocaleDateString('fr-CA')}</td>
                    <td>{declaration.dateModification ? new Date(declaration.dateModification).toLocaleDateString('fr-CA') : '-'}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(declaration.badge)}`}>
                        {declaration.statut}
                      </span>
                    </td>
                    <td>
                      {declaration.statut === 'Brouillon' && (
                        <button
                          className="btn-action btn-edit"
                          onClick={() => navigate('/declaration')}
                        >
                          Continuer
                        </button>
                      )}
                      {declaration.statut !== 'Brouillon' && (
                        <button className="btn-action btn-view">
                          Voir détails
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Timeline de traitement */}
          <div className="timeline-container">
            <h4>Étapes du traitement</h4>
            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h5>Déclaration soumise</h5>
                  <p>Votre déclaration a été reçue avec succès</p>
                </div>
              </div>
              <div className="timeline-item completed">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h5>Validation automatique</h5>
                  <p>Vérification de la cohérence des données</p>
                </div>
              </div>
              <div className="timeline-item active">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h5>En traitement</h5>
                  <p>Analyse en cours par nos systèmes</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h5>Avis de cotisation</h5>
                  <p>Génération et envoi de votre avis</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Historique des déclarations */}
        <section className="dashboard-section">
          <h3 className="section-title">Historique des déclarations passées</h3>

          <div className="table-container">
            <table className="declarations-table">
              <thead>
                <tr>
                  <th>Année fiscale</th>
                  <th>Date de dépôt</th>
                  <th>Date de l'avis</th>
                  <th>Type d'avis</th>
                  <th>Résultat</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {historique.map((declaration) => (
                  <tr key={declaration.id}>
                    <td><strong>{declaration.annee}</strong></td>
                    <td>{new Date(declaration.dateDepot).toLocaleDateString('fr-CA')}</td>
                    <td>{new Date(declaration.dateAvis).toLocaleDateString('fr-CA')}</td>
                    <td>
                      <span className={`type-badge ${declaration.typeAvis === 'automatique' ? 'type-auto' : 'type-manual'}`}>
                        {declaration.typeAvis === 'automatique' ? 'Automatisé' : 'Personnalisé'}
                      </span>
                    </td>
                    <td>
                      <span className={`montant ${declaration.montant.startsWith('+') ? 'montant-positif' : 'montant-negatif'}`}>
                        {declaration.montant} $
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-action btn-download"
                        onClick={() => handleViewAvis(declaration.typeAvis)}
                      >
                        Voir l'avis
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bouton nouvelle déclaration */}
        <div className="action-center">
          <button
            className="btn-new-declaration"
            onClick={() => navigate('/declaration')}
          >
            + Commencer une nouvelle déclaration
          </button>
        </div>
      </div>

      <footer className="suivi-footer">
        <p>© Gouvernement du Québec - Revenu Québec</p>
        <div className="footer-links">
          <a href="#">Aide</a>
          <a href="#">Contact</a>
          <a href="#">Confidentialité</a>
        </div>
      </footer>
    </div>
  )
}

export default Suivi
