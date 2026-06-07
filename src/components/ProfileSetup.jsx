import { useState } from 'react'

function ProfileSetup({ onComplete }) {
  const [userName, setUserName] = useState('')
  const [income, setIncome] = useState('')
  const [categories, setCategories] = useState(['Food', 'Transport', 'Bills', 'Shopping', 'Others'])
  const [categoryInput, setCategoryInput] = useState('')

  const addCategory = () => {
    const trimmed = categoryInput.trim()
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed])
    }
    setCategoryInput('')
  }

  const removeCategory = (cat) => {
    setCategories(categories.filter((c) => c !== cat))
  }

  const handleSubmit = () => {
    if (!userName.trim() || !income) return
    onComplete(userName, income, categories)
  }

  return (
    <div className="onboarding-screen">
      <div className="onboarding-card">
        <h2 className="onboarding-title">Set Up Profile</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="onboarding-input"
        />
        <input
          type="number"
          placeholder="Monthly Income (₦)"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="onboarding-input"
        />
        <div className="categories-section">
          <label>Expense Categories</label>
          <div className="categories-input-row">
            <input
              type="text"
              placeholder="Add category"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addCategory()
                }
              }}
              className="onboarding-input"
            />
            <button className="btn-small" onClick={addCategory}>
              Add
            </button>
          </div>
          <div className="categories-list">
            {categories.map((cat) => (
              <span key={cat} className="category-tag">
                {cat}
                <button
                  className="category-remove"
                  onClick={() => removeCategory(cat)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
        <button className="btn-primary" onClick={handleSubmit}>
          Complete Setup
        </button>
      </div>
    </div>
  )
}

export default ProfileSetup
