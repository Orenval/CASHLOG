import { useState } from 'react'

function SignUpScreen({ onContinue }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) return
    onContinue(email, password)
  }

  return (
    <div className="onboarding-screen">
      <div className="onboarding-card">
        <h2 className="onboarding-title">Create Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="onboarding-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="onboarding-input"
        />
        <button className="btn-primary" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </div>
  )
}

export default SignUpScreen
