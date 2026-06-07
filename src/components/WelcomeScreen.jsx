function WelcomeScreen({ onGetStarted }) {
  return (
    <div className="onboarding-screen">
      <div className="onboarding-card">
        <h1 className="onboarding-logo">CASHLOG</h1>
        <p className="tagline">Track your expenses, master your finances.</p>
        <button className="btn-primary" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default WelcomeScreen
