import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='centrador root-index'>
            <div className='titulo-home logo centrador'>MecanEx</div>
            <div className='descripcion centrador'>¡Comienza el reto!</div>
            <div className='centrador'>
                <div
                    className='button button-init'
                    onClick={() => navigate("/game")}><b>Empezar</b></div>
            </div>
        </div>
    )
}
