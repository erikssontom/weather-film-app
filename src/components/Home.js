import { useState, useEffect } from 'react'

export default function Home() {
    const [weatherDescription, setWeatherDescription] = useState("");
    const [weatherIconUrl, setWeatherIconUrl] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const API_KEY = "fa2d431993b9692b6f8c9d5f98a48dd5"

    useEffect(() => {
        const run = async () => {
            setIsPending(true)
            const coordinates = await getCoordinates();
            const dataString = await getWeather(coordinates);
            const data = JSON.parse(dataString);
            const temp = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const weatherIcon = data.weather[0].icon;
            setWeatherDescription(weatherDescription + " / " + temp + "C°")
            setWeatherIconUrl(`http://openweathermap.org/img/wn/${weatherIcon}.png`)
            setIsPending(false)
        }

        run();
    }, [])

    const getCoordinates = async () => {
        const coordinates = await new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return { lat: coordinates.coords.latitude, lon: coordinates.coords.longitude }
    }


    const getWeather = async (coordinates) => {
        let res
        let data
        try {
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`);
            if (res.ok) {
                data = await res.text();
            } else {
                console.log("An error has occured")
            }

        } catch (err) { console.log(err) }
        return data
    }

    return (<div>
        { isPending && <div>Loading...</div>}
        { !isPending && <div>{weatherDescription}</div>}
        { !isPending && <img src={weatherIconUrl} alt={weatherDescription}></img>}
    </div>)
}
