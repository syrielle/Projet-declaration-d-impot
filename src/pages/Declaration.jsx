import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Declaration.css'

function Declaration() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [confirmed, setConfirmed] = useState(false)

  const steps = ['Profil', 'Revenus', 'Pièces', 'Revue']

  const [formData, setFormData] = useState({
    // Identité (lecture seule)
    nom: 'Tremblay',
    prenom: 'Jean',
    nas: '000 000 000',
    dateNaissance: '1990-05-15',

    // Coordonnées
    adresse: '',
    telephone: '',
    citoyennete: 'canadienne',
    courriel: 'jean.tremblay@example.com',
  })

  const [revenus, setRevenus] = useState([
    { id: 1, type: 'Emploi', description: '', montant: '' }
  ])

  const [fichiers, setFichiers] = useState([])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const addRevenu = () => {
    setRevenus([...revenus, { id: revenus.length + 1, type: 'Emploi', description: '', montant: '' }])
  }

  const handleRevenuChange = (id, field, value) => {
    setRevenus(revenus.map(rev =>
      rev.id === id ? { ...rev, [field]: value } : rev
    ))
  }

  const removeRevenu = (id) => {
    setRevenus(revenus.filter(rev => rev.id !== id))
  }

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files)
    setFichiers([...fichiers, ...newFiles.map(f => ({ name: f.name, size: (f.size / 1024).toFixed(2) + ' KB' }))])
  }

  const removeFichier = (index) => {
    setFichiers(fichiers.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    navigate('/suivi')
  }

  const handleSave = () => {
    alert('Déclaration sauvegardée en brouillon')
  }

  const handleCancel = () => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler ? Toutes les modifications seront perdues.')) {
      navigate('/suivi')
    }
  }

  const handleLogout = () => {
    // Simulation de la déconnexion
    navigate('/connexion')
  }

  const totalRevenus = revenus.reduce((sum, rev) => sum + (parseFloat(rev.montant) || 0), 0)

  return (
    <div className="declaration-container">
      <header className="declaration-header">
        <h1 className="logo">Revenu Québec</h1>
        <nav className="nav">
          <button onClick={() => navigate('/suivi')}>Retour au suivi</button>
          <button className="btn-logout" onClick={handleLogout}>⏻ Se déconnecter</button>
        </nav>
      </header>

      <div className="declaration-content">
        <h2 className="page-title">Déclaration de revenus 2024</h2>

        {/* Barre d'étapes */}
        <div className="steps-bar">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-label">{step}</div>
            </div>
          ))}
        </div>

        {/* Section Profil */}
        {currentStep === 0 && (
          <div className="section">
            <h3 className="section-title">Identité</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Nom</label>
                <input type="text" value={formData.nom} disabled />
              </div>
              <div className="form-group">
                <label>Prénom</label>
                <input type="text" value={formData.prenom} disabled />
              </div>
              <div className="form-group">
                <label>NAS</label>
                <input type="text" value={formData.nas} disabled />
              </div>
              <div className="form-group">
                <label>Date de naissance</label>
                <input type="date" value={formData.dateNaissance} disabled />
              </div>
            </div>

            <h3 className="section-title">Coordonnées</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Adresse postale *</label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleInputChange}
                  placeholder="123 Rue Principale, Montréal, QC, H1A 1A1"
                />
              </div>
              <div className="form-group">
                <label>Numéro de téléphone *</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  placeholder="(514) 000-0000"
                />
              </div>
              <div className="form-group">
                <label>Citoyenneté *</label>
                <select
                  name="citoyennete"
                  value={formData.citoyennete}
                  onChange={handleInputChange}
                >
                  <option value="canadienne">Canadienne</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="form-group">
                <label>Courriel *</label>
                <input
                  type="email"
                  name="courriel"
                  value={formData.courriel}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="button-group">
              <button className="btn-next" onClick={() => setCurrentStep(1)}>
                Suivant →
              </button>
            </div>
          </div>
        )}

        {/* Section Revenus */}
        {currentStep === 1 && (
          <div className="section">
            <h3 className="section-title">Revenus de l'année 2024</h3>

            <div className="revenus-table-container">
              <table className="revenus-table">
              <thead>
                <tr>
                  <th>Type de revenu</th>
                  <th>Description</th>
                  <th>Montant ($)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {revenus.map((revenu) => (
                  <tr key={revenu.id}>
                    <td>
                      <select
                        value={revenu.type}
                        onChange={(e) => handleRevenuChange(revenu.id, 'type', e.target.value)}
                      >
                        <option value="Emploi">Emploi</option>
                        <option value="Travail autonome">Travail autonome</option>
                        <option value="Placement">Placement</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={revenu.description}
                        onChange={(e) => handleRevenuChange(revenu.id, 'description', e.target.value)}
                        placeholder="Nom de l'employeur ou source"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={revenu.montant}
                        onChange={(e) => handleRevenuChange(revenu.id, 'montant', e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </td>
                    <td>
                      <button
                        className="btn-remove"
                        onClick={() => removeRevenu(revenu.id)}
                        disabled={revenus.length === 1}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                  <td style={{ fontWeight: 'bold' }}>{totalRevenus.toFixed(2)} $</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
            </div>

            <button className="btn-add" onClick={addRevenu}>
              + Ajouter une ligne
            </button>

            <div className="button-group">
              <button className="btn-prev" onClick={() => setCurrentStep(0)}>
                ← Précédent
              </button>
              <button className="btn-next" onClick={() => setCurrentStep(2)}>
                Suivant →
              </button>
            </div>
          </div>
        )}

        {/* Section Pièces justificatives */}
        {currentStep === 2 && (
          <div className="section">
            <h3 className="section-title">Pièces justificatives</h3>

            <div className="upload-zone">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload" className="upload-label">
                <div className="upload-icon">📄</div>
                <p>Cliquez pour téléverser vos documents</p>
                <p className="upload-hint">PDF, JPG, PNG (max 5 MB par fichier)</p>
              </label>
            </div>

            {fichiers.length > 0 && (
              <div className="files-list">
                <h4>Fichiers téléversés:</h4>
                {fichiers.map((fichier, index) => (
                  <div key={index} className="file-item">
                    <span className="file-icon">📎</span>
                    <span className="file-name">{fichier.name}</span>
                    <span className="file-size">({fichier.size})</span>
                    <button className="btn-remove-file" onClick={() => removeFichier(index)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="button-group">
              <button className="btn-prev" onClick={() => setCurrentStep(1)}>
                ← Précédent
              </button>
              <button className="btn-next" onClick={() => setCurrentStep(3)}>
                Suivant →
              </button>
            </div>
          </div>
        )}

        {/* Section Revue et confirmation */}
        {currentStep === 3 && (
          <div className="section">
            <h3 className="section-title">Revue et confirmation</h3>

            <div className="review-section">
              <h4>Informations personnelles</h4>
              <p><strong>Nom complet:</strong> {formData.prenom} {formData.nom}</p>
              <p><strong>NAS:</strong> {formData.nas}</p>
              <p><strong>Adresse postale:</strong> {formData.adresse}</p>
              <p><strong>Téléphone:</strong> {formData.telephone}</p>
              <p><strong>Citoyenneté:</strong> {formData.citoyennete}</p>
              <p><strong>Courriel:</strong> {formData.courriel}</p>
            </div>

            <div className="review-section">
              <h4>Revenus déclarés</h4>
              <table className="review-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {revenus.map((revenu) => (
                    <tr key={revenu.id}>
                      <td>{revenu.type}</td>
                      <td>{revenu.description}</td>
                      <td>{revenu.montant} $</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td colSpan="2"><strong>Total des revenus:</strong></td>
                    <td><strong>{totalRevenus.toFixed(2)} $</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="review-section">
              <h4>Pièces justificatives</h4>
              <p>{fichiers.length} fichier(s) téléversé(s)</p>
            </div>

            <div className="confirmation-box">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                />
                <span>Je confirme l'exactitude des informations fournies et j'autorise Revenu Québec à traiter ma déclaration.</span>
              </label>
            </div>

            <div className="button-group">
              <button className="btn-prev" onClick={() => setCurrentStep(2)}>
                ← Précédent
              </button>
            </div>
          </div>
        )}

        {/* Boutons d'action principaux */}
        <div className="action-buttons">
          <button className="btn-cancel" onClick={handleCancel}>
            Annuler / Recommencer
          </button>
          <button className="btn-save" onClick={handleSave}>
            Sauvegarder le brouillon
          </button>
          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={currentStep !== 3 || !confirmed}
          >
            Envoyer la déclaration
          </button>
        </div>
      </div>
    </div>
  )
}

export default Declaration
