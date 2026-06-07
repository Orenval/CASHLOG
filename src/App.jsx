import { useState } from 'react'

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Shopping', 'Others']

function App() {
  const [expenses, setExpenses] = useState([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [budget, setBudget] = useState('')

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
    setCategory('Food')
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remaining = budget ? parseFloat(budget) - total : null

  return (
    <div className="app">
      <h1>CASHLOG</h1>

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
          {CATEGORIES.map((c) => (
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
