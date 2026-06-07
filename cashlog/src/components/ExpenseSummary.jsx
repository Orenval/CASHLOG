function ExpenseSummary({ totalSpent, budget, remaining }) {
  const percentUsed = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0

  return (
    <div className="card summary-card">
      <h2 className="card-title">Summary</h2>
      <div className="summary-grid">
        <div className="summary-item">
          <span className="summary-label">Total Spent</span>
          <span className="summary-value">₦{totalSpent.toLocaleString()}</span>
        </div>
        {budget > 0 && (
          <>
            <div className="summary-item">
              <span className="summary-label">Budget</span>
              <span className="summary-value">₦{budget.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Remaining</span>
              <span
                className={`summary-value ${remaining < 0 ? 'text-danger' : 'text-success'}`}
              >
                {remaining < 0 ? '-' : ''}₦{Math.abs(remaining).toLocaleString()}
              </span>
            </div>
          </>
        )}
      </div>
      {budget > 0 && (
        <div className="progress-bar">
          <div
            className={`progress-fill ${percentUsed > 100 ? 'over-budget' : percentUsed > 75 ? 'warning' : ''}`}
            style={{ width: `${Math.min(percentUsed, 100)}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default ExpenseSummary
