import { useState } from 'react'

function ExpenseForm({ categories, onAdd }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !amount) return
    const parsed = parseFloat(amount)
    if (isNaN(parsed) || parsed <= 0) return
    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      amount: parsed,
      category,
    })
    setName('')
    setAmount('')
    setCategory('Food')
  }

  return (
    <div className="card">
      <h2 className="card-title">Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="name">Expense Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Jollof Rice"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount (₦)</label>
          <input
            id="amount"
            type="number"
            placeholder="0"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  )
}

export default ExpenseForm
