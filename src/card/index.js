import React, { useEffect, useState } from 'react'

const Card = ({name, description, icon, time, country, date, temp}) => {
    const [ animate, setAnimate ] = useState(false)
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    useEffect(() => {
        setTimeout(() => {
            setAnimate(true)
        }, 100)
    }, [])
    return (
        <div className={`card ${animate ? 'animate' : ''}`}>
            <div className="card__header">
                <div className="card__time">{time}</div>
                <div className="card__date">{date}</div>
            </div>
            <img 
                className="card__icon"
                src={iconUrl}
            />
            <div className="card__temp">
                {temp}
            </div>
            <div className="card__desc">
                {description}
            </div>
            <div className="card__footer">
                <div className="card__name">{name}</div>
                <div className="card__name">{country}</div>
            </div>
        </div>
    )
}

export default Card