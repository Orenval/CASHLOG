import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'
import BudgetForm from './components/BudgetForm'
import './App.css'

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Shopping', 'Others']

function App() {
  const [expenses, setExpenses] = useState([])
  const [budget, setBudget] = useState(0)
  const [filter, setFilter] = useState('All')

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

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">CASHLOG</h1>
        <p className="tagline">Track your daily spending in Naira</p>
      </header>

      <main className="main">
        <div className="left-col">
          <ExpenseForm categories={CATEGORIES} onAdd={addExpense} />
          <BudgetForm budget={budget} onSetBudget={setBudget} />
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
    </div>
  )
}

export default App
