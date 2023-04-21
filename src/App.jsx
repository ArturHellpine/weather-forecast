import "./App.css";
import {CircularProgress, Slide, TextField} from "@mui/material";
import {useEffect, useState} from "react";

function App() {
    const [cityName, setCityName] = useState('Kyiv')
    const [inputValue, setInputValue] = useState('')
    const [data, setData] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchWeather()
    }, [cityName, error])

    const fetchWeather = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=09cb9eca527b6517bbe47c3b81d9568c&units=metric`)
            .then((res) => {
                if(res.status === 200) {
                    error && setError(false)
                    return res.json()
                } else {
                    throw new Error('Something went wrong')
                }
            })
            .then((data) => {
                setData(data)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    const handleSearch = (e) => {
        if(e.key === 'Enter') {
            setCityName(e.target.value)
            setInputValue('')
        }
    }

  return (
      <div className='bg_img'>
          {
              !loading ?
                  <>
                      <TextField
                          value={inputValue}
                          onChange={event => setInputValue(event.target.value)}
                          error={error}
                          variant='filled'
                          label='Search Location'
                          className='input'
                          onKeyDown={handleSearch}
                      />
                      <h1 className='city'>{data.name}</h1>
                      <div className='group'>
                          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt=""/>
                          <h1>{data.weather[0].main}</h1>
                      </div>
                      <h1 className='temp'>{data.main.temp.toFixed()} °C</h1>
                      <Slide direction='right' timeout={800} in={!loading}>
                      <div className='box_container'>
                          <div className="box">
                              <p>Humidity</p>
                              <h1>{data.main.humidity.toFixed()}%</h1>
                          </div>

                          <div className="box">
                              <p>Wind</p>
                              <h1>{data.wind.speed.toFixed()} km/h</h1>
                          </div>

                          <div className="box">
                              <p>Feels like</p>
                              <h1>{data.main.feels_like.toFixed()} °C</h1>
                          </div>
                      </div>
                      </Slide>
                  </>
                  :
                    <>
                        <CircularProgress />
                    </>
          }
      </div>
  )
}

export default App;
