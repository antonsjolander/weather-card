import { useEffect, useState } from 'react'
import Card from './card'
import './App.scss';

function App() {
  const [ cityArr, setCityArr ] = useState([])
  const [ value, setValue ] = useState('')
  const [ error, setError ] = useState(false)
  const date = new Date();

  const getWeather = async (city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    const response  = await fetch(url)
    const data = await response.json()

    return data
  }

  const handleSubmit = (e) => {
    const existInArr = cityArr.some(({name}) => {
      return name.toLowerCase() === value.toLowerCase()
    });
    e.preventDefault();
    if (!existInArr) {
      getWeather(value).then(data => {
        const { name, sys, weather, main } = data
        console.log(data)
        if (data.cod !== '404') {
          const obj = {
            time: date.toLocaleTimeString('default', {hour: '2-digit', minute: '2-digit'}),
            date: date.toLocaleString('default', {day: 'numeric', month: 'short' }),
            name: name,
            country: sys.country,
            temp: `${Math.round(main.temp)}\xB0`,
            ...weather[0]
          }
          setCityArr(arr => [...arr, obj])
          setError(false)
          setValue('')
        } else {
          setError(`${data.message}, try another :(`)
        }
      });
    } else {
      setError('Already exist, try another :(')
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="app">
      <div className="app__inner">
        <div className="card__container">
          {cityArr.map(city => <Card key={city.name} {...city} />)}
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter city name" 
            onChange={handleChange} value={value}
          />
          <button> + </button>
          <div className="form__error">
          {error && error}
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default App;
