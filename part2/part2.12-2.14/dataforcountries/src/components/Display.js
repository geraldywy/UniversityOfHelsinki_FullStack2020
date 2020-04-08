import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({countries, newFilter, setNewFilter}) =>{
    const countriesToShow = countries.filter((country)=>country.name.toLowerCase().includes(newFilter.toLowerCase()))
    const [ weatherData, setWeatherData ] = useState([])

    const api_key = process.env.REACT_APP_WEATHER_API_KEY

    useEffect(()=>{
        if (countriesToShow.length === 1)
            axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countriesToShow[0].name}`)
            .then(response=>{
                setWeatherData(response.data.current)
            })
      }, [countriesToShow.length]) // only get data from api when the number of countries in list changes
    
    const handleClick = (countryName) =>{
        setNewFilter(countryName)
    }
    
    if (countriesToShow.length === 1){
        const country = countriesToShow[0]
        return (
            <div>
                <h2>{country.name}</h2>
                <p>
                    captial {country.capital}
                </p>
                <p>
                    population {country.population}
                </p>
                <h3>languages</h3>
                <ul>
                    {country.languages.map((lang, i)=><li key={i}>{lang.name}</li>)}
                </ul>
                <img src={country.flag} alt="image not found" width="250" height="250"/>
                <h3>Weather in {country.name}</h3>
                <p>temperature: {weatherData.temperature} Celcius</p>
                <img src={weatherData.weather_icons} alt="icon error"/>
                <p>wind: {weatherData.wind_speed}  mph direction {weatherData.wind_dir}</p>
            </div>
        )
    }
    else if (countriesToShow.length>10)
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    else // 1<length<=10
        return(
            <div>
                {countriesToShow.map((country, i)=>
                    <p key={i}> 
                        {country.name} 
                        <button onClick={()=> handleClick(country.name)}>
                            show more
                        </button>
                    </p>
                    )
                }
               
            </div>
        )
}

export default Display