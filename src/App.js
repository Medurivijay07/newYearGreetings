import {Component} from 'react'
import './App.css'

class App extends Component {
  quotes = [
    'Wishing you a year filled with love, joy, and endless possibilities!',
    'May this year bring you happiness, health, and success in all that you do.',
    'Cheers to a fresh start and new beginnings. Happy New Year!',
    'May this new year bring you closer to your dreams and aspirations!',
    'Here’s to a year of growth, positivity, and abundant opportunities. Happy New Year!',
  ]

  constructor(props) {
    super(props)
    this.state = {
      // TODO: Initialize state variables for step, username, selectedYear, randomYears, quote, and showGreeting.
      step: 0,
      username: '',
      selectedYear: '',
      randomYears: [],
      quote: '',
      showGreeting: false,

      // - step: current step in the process (initial value 0).
      // - username: the name entered by the user.
      // - selectedYear: the year selected by the user.
      // - randomYears: array of randomly generated years for selection.
      // - quote: a random quote for the greeting.
      // - showGreeting: a flag to show or hide the greeting message.
    }
  }

  componentDidMount() {
    // Initially, we'll generate random years after username is entered
  }

  generateRandomYears = () => {
    const currentYear = new Date().getFullYear()
    const correctYear = currentYear + 1
    const years = new Set()

    years.add(correctYear)

    while (years.size < 6) {
      const randomYear = currentYear + Math.floor(Math.random() * 10)
      if (randomYear !== correctYear) {
        years.add(randomYear)
      }
    }

    this.setState({
      randomYears: Array.from(years).sort(() => Math.random() - 0.5),
    })
  }

  // TODO: Implement handleYearClick to handle the selection of a year.
  // - Check if the year selected is the next year.
  // - If correct, move to the next step and show the greeting.
  // - If wrong, show an alert to try again.
  handleYearClick = year => {
    const nextYear = new Date().getFullYear() + 1
    if (year === nextYear) {
      this.setState({
        showGreeting: true,
        selectedYear: year,
        step: 1,
      })
      this.setRandomQuote()
    } else {
      alert('Try again!')
    }

    // Implementation goes here
  }

  // TODO: Implement handleUsernameChange to update the username in state.
  // - This should update the state with the value entered in the username input.
  handleUsernameChange = event => {
    this.setState({username: event.target.value})
    // Implementation goes here
  }

  handleNextStep = () => {
    const {step, username} = this.state
    if (step === 0) {
      if (username.trim() === '') {
        alert('Please enter your name.')
        return
      }
      this.setState({step: 1}, this.generateRandomYears)
    }
  }

  setRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * this.quotes.length)
    this.setState({quote: this.quotes[randomIndex]})
  }

  renderStepContent = () => {
    const {
      step,
      randomYears,
      showGreeting,
      selectedYear,
      username,
      quote,
    } = this.state

    if (showGreeting) {
      return (
        <div className="greeting-card" ref={this.greetingRef}>
          <h1>🎉 Happy New Year {selectedYear}! 🎉</h1>
          <p>Wishing you a year full of joy, success, and happiness!</p>
          <div className="quote-section">
            <img
              src="https://res.cloudinary.com/daa0trmzd/image/upload/v1735541433/Happy_New_Year_2025_pictures_Images_Download_Free_rxirfh.jpg"
              alt="New Year"
              className="greeting-image"
            />
            <p className="quote">"{quote}"</p>
            <p className="username">- {username}</p>
          </div>
        </div>
      )
    }

    switch (step) {
      case 0:
        return (
          <div>
            <h2>Welcome! Please enter your name</h2>
            <input
              type="text"
              value={username}
              onChange={this.handleUsernameChange}
              placeholder="Your Name"
              className="input-box"
            />
            <button
              type="button"
              onClick={this.handleNextStep}
              className="next-button"
              disabled={!username.trim()}
            >
              Next
            </button>
          </div>
        )
      case 1:
        return (
          <div>
            <h2>Step 1: Click on the next year</h2>
            <div className="years-container">
              {randomYears.map(year => (
                <button
                  type="button"
                  key={year}
                  onClick={() => this.handleYearClick(year)}
                  className="year-button"
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return <div className="app-container">{this.renderStepContent()}</div>
  }
}

export default App
