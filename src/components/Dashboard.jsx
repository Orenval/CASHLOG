import { useState } from 'react'

function Dashboard({ userName, income, categories, expenses, onAddExpense, onDeleteExpense }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remaining = income - totalSpent
  const savingsTarget = income * 0.2
  const saved = Math.max(0, remaining)
  const savingsPct = savingsTarget > 0 ? Math.min((saved / savingsTarget) * 100, 100) : 0

  const spentByCategory = {}
  categories.forEach((c) => { spentByCategory[c] = 0 })
  expenses.forEach((e) => {
    if (spentByCategory[e.category] !== undefined) {
      spentByCategory[e.category] += e.amount
    }
  })

  const recentExpenses = [...expenses].reverse().slice(0, 5)

  const handleAdd = () => {
    if (!name.trim() || !amount) return
    onAddExpense({
      id: Date.now(),
      name: name.trim(),
      amount: parseFloat(amount),
      category,
    })
    setName('')
    setAmount('')
    setCategory(categories[0])
  }

  return (
    <div className="app">
      <div className="dashboard-header">
        <h1>CASHLOG</h1>
        <p className="welcome-user">Welcome back, {userName}</p>
      </div>

      <div className="glance-grid">
        <div className="glance-card">
          <span className="glance-label">Total Income</span>
          <span className="glance-value">₦{Number(income).toLocaleString()}</span>
        </div>
        <div className="glance-card">
          <span className="glance-label">Total Spent</span>
          <span className="glance-value">₦{totalSpent.toLocaleString()}</span>
        </div>
        <div className="glance-card">
          <span className="glance-label">Balance</span>
          <span className={`glance-value ${remaining < 0 ? 'text-danger' : ''}`}>
            ₦{remaining.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="section">
        <h3>Category Budgets</h3>
        {categories.map((cat) => {
          const spent = spentByCategory[cat] || 0
          const budget = income / categories.length
          const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
          const over = spent > budget
          return (
            <div key={cat} className="category-progress">
              <div className="category-progress-header">
                <span className="category-progress-name">{cat}</span>
                <span className={`category-progress-numbers ${over ? 'text-danger' : ''}`}>
                  ₦{spent.toLocaleString()} of ₦{Math.round(budget).toLocaleString()} used
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill${over ? ' over' : ''}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="section">
        <h3>Recent Transactions</h3>
        {recentExpenses.length === 0 ? (
          <p className="empty-state">No expenses yet. Add your first one below.</p>
        ) : (
          <ul className="recent-list">
            {recentExpenses.map((e) => (
              <li key={e.id}>
                <span className="expense-category">{e.category}</span>
                <span className="expense-name">{e.name}</span>
                <span className="expense-amount">₦{e.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="section">
        <h3>Savings Goal</h3>
        <div className="savings-info">
          <span>Saved: ₦{saved.toLocaleString()}</span>
          <span>Target: ₦{savingsTarget.toLocaleString()}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill savings"
            style={{ width: `${savingsPct}%` }}
          />
        </div>
        {remaining >= savingsTarget && (
          <p className="savings-achieved">Savings goal reached!</p>
        )}
        {remaining < 0 && (
          <p className="text-danger" style={{ marginTop: 6, fontSize: 13, fontWeight: 500 }}>
            You&apos;ve overspent this month!
          </p>
        )}
      </div>

      <div className="section">
        <h3>Add Expense</h3>
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
          <button onClick={handleAdd}>Add Expense</button>
        </div>
      </div>

      <div className="section">
        <h3>All Expenses ({expenses.length})</h3>
        {expenses.length === 0 ? (
          <p className="empty-state">No expenses yet.</p>
        ) : (
          <ul className="expense-list">
            {expenses.map((e) => (
              <li key={e.id}>
                <span className="expense-category">{e.category}</span>
                <span className="expense-name">{e.name}</span>
                <span className="expense-amount">₦{e.amount.toLocaleString()}</span>
                <button className="delete-btn" onClick={() => onDeleteExpense(e.id)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard
