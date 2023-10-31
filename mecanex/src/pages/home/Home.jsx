import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className='titulo-home'>MecanEx</div>
            <div className='descripcion'>¡Comienza el reto!</div>
            <div onClick={() => navigate("/game")}>Button Game</div>
        </div>
    )
}
