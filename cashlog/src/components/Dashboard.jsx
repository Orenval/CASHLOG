function Dashboard({
  income,
  totalSpent,
  balance,
  recentExpenses,
  categoryBudgets,
  spentByCategory,
  savingsGoal,
  savingsCurrent,
}) {
  const savingsPercent =
    savingsGoal > 0 ? Math.min((savingsCurrent / savingsGoal) * 100, 100) : 0

  const spentPercent = income > 0 ? Math.min((totalSpent / income) * 100, 100) : 0

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="card overview-card">
          <h2 className="card-title">Overview</h2>
          {income > 0 ? (
            <>
              <div className="overview-grid">
                <div className="overview-item">
                  <span className="overview-label">Income</span>
                  <span className="overview-value income">
                    ₦{income.toLocaleString()}
                  </span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Spent</span>
                  <span className="overview-value spent">
                    ₦{totalSpent.toLocaleString()}
                  </span>
                </div>
                <div className="overview-divider" />
                <div className="overview-item">
                  <span className="overview-label">Balance</span>
                  <span
                    className={`overview-value balance ${
                      balance >= 0 ? 'text-success' : 'text-danger'
                    }`}
                  >
                    ₦{balance.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="progress-bar overview-bar">
                <div
                  className={`progress-fill ${
                    spentPercent >= 100
                      ? 'over-budget'
                      : spentPercent > 75
                        ? 'warning'
                        : ''
                  }`}
                  style={{ width: `${spentPercent}%` }}
                />
              </div>
              <div className="overview-footnote">
                {spentPercent.toFixed(0)}% of income spent
              </div>
            </>
          ) : (
            <p className="empty-state">
              Set your monthly income in the Expenses tab
            </p>
          )}
        </div>

        <div className="card savings-card">
          <h2 className="card-title">Savings</h2>
          {savingsGoal > 0 ? (
            <>
              <div className="savings-numbers">
                <div className="savings-current">
                  ₦{savingsCurrent.toLocaleString()}
                </div>
                <div className="savings-target">
                  of ₦{savingsGoal.toLocaleString()}
                </div>
              </div>
              <div className="progress-bar savings-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${savingsPercent}%` }}
                />
              </div>
              <div className="savings-percent">
                {Math.round(savingsPercent)}% saved
              </div>
            </>
          ) : (
            <p className="empty-state">
              Set a savings goal in the Expenses tab
            </p>
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Category Budgets</h2>
        <div className="cat-budgets">
          {Object.keys(categoryBudgets).length > 0 ? (
            Object.entries(categoryBudgets).map(([cat, budgetAmt]) => {
              const spent = spentByCategory[cat] || 0
              const pct =
                budgetAmt > 0 ? Math.min((spent / budgetAmt) * 100, 100) : 0
              return (
                <div key={cat} className="cat-budget-row">
                  <div className="cat-budget-header">
                    <span
                      className={`expense-category tag-${cat.toLowerCase()}`}
                    >
                      {cat}
                    </span>
                    <span className="cat-budget-amount">
                      ₦{spent.toLocaleString()} / ₦{budgetAmt.toLocaleString()}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${
                        pct >= 100
                          ? 'over-budget'
                          : pct > 75
                            ? 'warning'
                            : ''
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })
          ) : (
            <p className="empty-state">
              Set category budgets in the Expenses tab
            </p>
          )}
        </div>
      </div>

      <div className="card">
        <div className="list-header">
          <h2 className="card-title">Recent Transactions</h2>
        </div>
        {recentExpenses.length > 0 ? (
          <ul className="expense-list">
            {recentExpenses.map((expense) => (
              <li key={expense.id} className="expense-item">
                <div className="expense-info">
                  <span className="expense-name">{expense.name}</span>
                  <span
                    className={`expense-category tag-${expense.category.toLowerCase()}`}
                  >
                    {expense.category}
                  </span>
                </div>
                <span className="expense-amount">
                  ₦{expense.amount.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No expenses yet. Add one in the Expenses tab.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
