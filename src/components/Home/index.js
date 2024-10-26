import {Component} from 'react'
import './index.css'

class Home extends Component {
  state = {weatherData: [], latitude: 7.367, longitude: 45.133}

  componentDidMount() {
    this.getWeatherData()
    this.getFiveDaysWeather()
  }

  getWeatherData = async () => {
    const {latitude, longitude} = this.state
    const APIkey = '0527729f7c0f16a5a2400ba62fed3b08'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({weatherData: data})
    }
  }

  getFiveDaysWeather = async () => {
    const APIKey = '93f917d9d93e17a5256659eba079f4cc'

    const apiUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=44.34&lon=10.99&appid=${APIKey}`
    const response = await fetch(apiUrl)
    console.log(response)
  }

  onChangeLatitude = event => {
    this.setState({latitude: event.target.value})
  }

  onChangeLongitude = event => {
    this.setState({longitude: event.target.value})
  }

  renderHeader = () => {
    const {latitude, longitude} = this.state
    return (
      <div className="header-main-container">
        <input
          type="text"
          placeholder="latiude"
          value={latitude}
          className="latitude-input"
          onChange={this.onChangeLatitude}
        />
        <input
          type="tect"
          placeholder="longitude"
          value={longitude}
          className="latitude-input"
          onChange={this.onChangeLongitude}
        />
      </div>
    )
  }

  renderBottomSection = () => {
    const {weatherData = []} = this.state
    const {coord} = weatherData
    const {lat} = coord
    return (
      <div>
        <h1>{lat}</h1>
      </div>
    )
  }

  render() {
    const {weatherData} = this.state
    console.log(weatherData)
    return <>{this.renderHeader()}</>
  }
}

export default Home
