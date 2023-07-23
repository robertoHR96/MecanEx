import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div>home
            <div onClick={() => navigate("/game")}>Button Game</div>
        </div>
    )
}
