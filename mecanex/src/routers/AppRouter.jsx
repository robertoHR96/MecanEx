import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/home/Home'
import { Game } from '../pages/game/Game'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <Home />
                } />
                <Route path='/home' element={
                    <Home />
                } />
                <Route path='/game' element={
                    <Game />
                } />
            </Routes>
        </BrowserRouter>
    )
}
