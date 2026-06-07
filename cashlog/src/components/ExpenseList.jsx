function ExpenseList({ expenses, categories, filter, onFilterChange, onRemove }) {
  return (
    <div className="card list-card">
      <div className="list-header">
        <h2 className="card-title">Expenses</h2>
        <div className="filter-group">
          <label htmlFor="filter">Filter:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {expenses.length === 0 ? (
        <p className="empty-state">No expenses yet. Add one above!</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              <div className="expense-info">
                <span className="expense-name">{expense.name}</span>
                <span className={`expense-category tag-${expense.category.toLowerCase()}`}>
                  {expense.category}
                </span>
              </div>
              <div className="expense-actions">
                <span className="expense-amount">₦{expense.amount.toLocaleString()}</span>
                <button
                  className="btn-remove"
                  onClick={() => onRemove(expense.id)}
                  title="Remove expense"
                >
                  &times;
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpenseList
