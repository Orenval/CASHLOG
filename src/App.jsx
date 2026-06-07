import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import SignUpScreen from './components/SignUpScreen'
import ProfileSetup from './components/ProfileSetup'
import Dashboard from './components/Dashboard'

function App() {
  const [step, setStep] = useState('welcome')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [income, setIncome] = useState(0)
  const [categories, setCategories] = useState(['Food', 'Transport', 'Bills', 'Shopping', 'Others'])
  const [expenses, setExpenses] = useState([])

  const handleSignUp = (emailVal, passwordVal) => {
    setEmail(emailVal)
    setPassword(passwordVal)
    setStep('profile')
  }

  const handleCompleteProfile = (name, incomeVal, cats) => {
    setUserName(name)
    setIncome(parseFloat(incomeVal))
    setCategories(cats)
    setStep('dashboard')
  }

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense])
  }

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  if (step === 'welcome') {
    return <WelcomeScreen onGetStarted={() => setStep('signup')} />
  }

  if (step === 'signup') {
    return <SignUpScreen onContinue={handleSignUp} />
  }

  if (step === 'profile') {
    return <ProfileSetup onComplete={handleCompleteProfile} />
  }

  return (
    <Dashboard
      userName={userName}
      income={income}
      categories={categories}
      expenses={expenses}
      onAddExpense={handleAddExpense}
      onDeleteExpense={handleDeleteExpense}
    />
  )
}

export default App
