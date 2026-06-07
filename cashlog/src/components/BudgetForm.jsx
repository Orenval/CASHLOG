import { useState } from 'react'

function BudgetForm({ budget, onSetBudget }) {
  const [value, setValue] = useState(budget || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    const parsed = parseFloat(value)
    if (isNaN(parsed) || parsed <= 0) return
    onSetBudget(parsed)
  }

  return (
    <div className="card">
      <h2 className="card-title">Monthly Budget</h2>
      <form onSubmit={handleSubmit} className="budget-form">
        <div className="form-group">
          <label htmlFor="budget">Set your Naira budget</label>
          <input
            id="budget"
            type="number"
            placeholder="e.g. 100000"
            min="0"
            step="100"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          {budget > 0 ? 'Update Budget' : 'Set Budget'}
        </button>
      </form>
      {budget > 0 && (
        <p className="budget-current">
          Current budget: <strong>₦{budget.toLocaleString()}</strong>
        </p>
      )}
    </div>
  )
}

export default BudgetForm
