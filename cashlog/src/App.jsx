import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'
import BudgetForm from './components/BudgetForm'
import Dashboard from './components/Dashboard'
import './App.css'

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Shopping', 'Others']

function App() {
  const [expenses, setExpenses] = useState([])
  const [budget, setBudget] = useState(0)
  const [filter, setFilter] = useState('All')
  const [income, setIncome] = useState(0)
  const [categoryBudgets, setCategoryBudgets] = useState({})
  const [savingsGoal, setSavingsGoal] = useState(0)
  const [savingsCurrent, setSavingsCurrent] = useState(0)
  const [view, setView] = useState('dashboard')

  const [incomeInput, setIncomeInput] = useState('')
  const [catBudgetInputs, setCatBudgetInputs] = useState({})
  const [savingsGoalInput, setSavingsGoalInput] = useState('')
  const [savingsCurrentInput, setSavingsCurrentInput] = useState('')

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses])
  }

  const removeExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const filteredExpenses =
    filter === 'All' ? expenses : expenses.filter((e) => e.category === filter)

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remaining = budget - totalSpent
  const balance = income - totalSpent

  const spentByCategory = {}
  CATEGORIES.forEach((cat) => {
    spentByCategory[cat] = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0)
  })

  const recentExpenses = expenses.slice(0, 5)

  const handleSetIncome = (e) => {
    e.preventDefault()
    const val = parseFloat(incomeInput)
    if (!isNaN(val) && val > 0) {
      setIncome(val)
    }
  }

  const handleSetCatBudget = (cat) => (e) => {
    e.preventDefault()
    const val = parseFloat(catBudgetInputs[cat])
    if (!isNaN(val) && val > 0) {
      setCategoryBudgets((prev) => ({ ...prev, [cat]: val }))
    }
  }

  const handleSetSavings = (e) => {
    e.preventDefault()
    const goal = parseFloat(savingsGoalInput)
    const current = parseFloat(savingsCurrentInput)
    if (!isNaN(goal) && goal > 0) setSavingsGoal(goal)
    if (!isNaN(current) && current >= 0) setSavingsCurrent(current)
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">CASHLOG</h1>
        <p className="tagline">Track your daily spending in Naira</p>
        <nav className="tabs">
          <button
            className={`tab ${view === 'dashboard' ? 'tab-active' : ''}`}
            onClick={() => setView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`tab ${view === 'expenses' ? 'tab-active' : ''}`}
            onClick={() => setView('expenses')}
          >
            Expenses
          </button>
        </nav>
      </header>

      {view === 'dashboard' ? (
        <Dashboard
          income={income}
          totalSpent={totalSpent}
          balance={balance}
          recentExpenses={recentExpenses}
          categoryBudgets={categoryBudgets}
          spentByCategory={spentByCategory}
          savingsGoal={savingsGoal}
          savingsCurrent={savingsCurrent}
        />
      ) : (
        <main className="main">
          <div className="left-col">
            <div className="card">
              <h2 className="card-title">Monthly Income</h2>
              <form onSubmit={handleSetIncome}>
                <div className="form-group">
                  <label htmlFor="income">Your monthly income (₦)</label>
                  <input
                    id="income"
                    type="number"
                    placeholder="e.g. 300000"
                    min="0"
                    value={incomeInput}
                    onChange={(e) => setIncomeInput(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-secondary">
                  {income > 0 ? 'Update Income' : 'Set Income'}
                </button>
              </form>
              {income > 0 && (
                <p className="budget-current">
                  Current income: <strong>₦{income.toLocaleString()}</strong>
                </p>
              )}
            </div>

            <ExpenseForm categories={CATEGORIES} onAdd={addExpense} />
            <BudgetForm budget={budget} onSetBudget={setBudget} />

            <div className="card">
              <h2 className="card-title">Category Budgets</h2>
              {CATEGORIES.map((cat) => (
                <form
                  key={cat}
                  onSubmit={handleSetCatBudget(cat)}
                  className="cat-budget-form"
                >
                  <div className="form-group cat-budget-input">
                    <label htmlFor={`cat-${cat}`}>{cat}</label>
                    <div className="cat-budget-row-form">
                      <input
                        id={`cat-${cat}`}
                        type="number"
                        placeholder="0"
                        min="0"
                        value={catBudgetInputs[cat] || ''}
                        onChange={(e) =>
                          setCatBudgetInputs((prev) => ({
                            ...prev,
                            [cat]: e.target.value,
                          }))
                        }
                      />
                      <button type="submit" className="btn btn-secondary btn-small">
                        Set
                      </button>
                    </div>
                  </div>
                </form>
              ))}
            </div>

            <div className="card">
              <h2 className="card-title">Savings Goal</h2>
              <form onSubmit={handleSetSavings}>
                <div className="form-group">
                  <label htmlFor="savings-goal">Goal Amount (₦)</label>
                  <input
                    id="savings-goal"
                    type="number"
                    placeholder="e.g. 100000"
                    min="0"
                    value={savingsGoalInput}
                    onChange={(e) => setSavingsGoalInput(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="savings-current">Currently Saved (₦)</label>
                  <input
                    id="savings-current"
                    type="number"
                    placeholder="e.g. 50000"
                    min="0"
                    value={savingsCurrentInput}
                    onChange={(e) => setSavingsCurrentInput(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-secondary">
                  {savingsGoal > 0 ? 'Update Savings' : 'Set Savings'}
                </button>
              </form>
              {savingsGoal > 0 && (
                <p className="budget-current">
                  Goal: <strong>₦{savingsGoal.toLocaleString()}</strong> | Saved:{' '}
                  <strong>₦{savingsCurrent.toLocaleString()}</strong>
                </p>
              )}
            </div>

            <ExpenseSummary
              totalSpent={totalSpent}
              budget={budget}
              remaining={remaining}
            />
          </div>

          <div className="right-col">
            <ExpenseList
              expenses={filteredExpenses}
              categories={CATEGORIES}
              filter={filter}
              onFilterChange={setFilter}
              onRemove={removeExpense}
            />
          </div>
        </main>
      )}
    </div>
  )
}

export default App
