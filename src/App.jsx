import { useState } from 'react'

function App() {
  const [step, setStep] = useState('welcome')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [income, setIncome] = useState('')
  const [categories, setCategories] = useState(['Food', 'Transport', 'Bills', 'Shopping', 'Others'])
  const [categoryInput, setCategoryInput] = useState('')

  const [expenses, setExpenses] = useState([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [budget, setBudget] = useState('')

  const handleGetStarted = () => setStep('signup')

  const handleSignUp = () => {
    if (!email.trim() || !password.trim()) return
    setStep('profile')
  }

  const handleCompleteProfile = () => {
    if (!userName.trim() || !income) return
    setBudget(income)
    setCategory(categories[0])
    setStep('dashboard')
  }

  const addCategory = () => {
    const trimmed = categoryInput.trim()
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed])
    }
    setCategoryInput('')
  }

  const removeCategory = (cat) => {
    const updated = categories.filter((c) => c !== cat)
    setCategories(updated)
    if (category === cat && updated.length > 0) {
      setCategory(updated[0])
    }
  }

  const addExpense = () => {
    if (!name.trim() || !amount) return
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        name: name.trim(),
        amount: parseFloat(amount),
        category,
      },
    ])
    setName('')
    setAmount('')
    setCategory(categories[0])
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remaining = budget ? parseFloat(budget) - total : null

  if (step === 'welcome') {
    return (
      <div className="onboarding-screen">
        <div className="onboarding-card">
          <h1 className="onboarding-logo">CASHLOG</h1>
          <p className="tagline">Track your expenses, master your finances.</p>
          <button className="btn-primary" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    )
  }

  if (step === 'signup') {
    return (
      <div className="onboarding-screen">
        <div className="onboarding-card">
          <h2 className="onboarding-title">Create Account</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="onboarding-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="onboarding-input"
          />
          <button className="btn-primary" onClick={handleSignUp}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  if (step === 'profile') {
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
          <button className="btn-primary" onClick={handleCompleteProfile}>
            Complete Setup
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="dashboard-header">
        <h1>CASHLOG</h1>
        <p className="welcome-user">Welcome back, {userName}</p>
      </div>

      <div className="budget-section">
        <label>Monthly Budget (₦)</label>
        <input
          type="number"
          placeholder="Enter budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (₦)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="summary">
        <p>Total: ₦{total.toLocaleString()}</p>
        {remaining !== null && (
          <p className={remaining < 0 ? 'over-budget' : ''}>
            Remaining: ₦{remaining.toLocaleString()}
            {remaining < 0 && ' (Over budget!)'}
          </p>
        )}
      </div>

      <ul className="expense-list">
        {expenses.map((e) => (
          <li key={e.id}>
            <span className="expense-category">{e.category}</span>
            <span className="expense-name">{e.name}</span>
            <span className="expense-amount">₦{e.amount.toLocaleString()}</span>
            <button className="delete-btn" onClick={() => deleteExpense(e.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
