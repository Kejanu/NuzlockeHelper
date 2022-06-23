import React from 'react';
import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import RunDetailsPage from "./pages/runDetailsPage";
import DevPage from "./pages/dev";
import RunsPage from "./pages/runs";

function App() {

    const navigate = useNavigate();

    const navItemClass = 'tw-h-12 tw-border-b tw-border-white tw-text-center ' +
        'tw-grid tw-content-center  hover:tw-bg-cyan-600';



    return (
        <div className={'tw-grid tw-grid-cols-10 tw-h-screen tw-gap-2'}>
            <div className={'tw-col-span-1'}>
                <nav className={'tw-cols-1 tw-grid tw-content-start tw-bg-cyan-800 tw-h-full'}>
                    <button className={navItemClass} onClick={() => navigate("/runs")}>
                        Runs
                    </button>
                    <button className={navItemClass}>
                        Pokemon
                    </button>
                    <button className={navItemClass} onClick={() => navigate("/dev")}>
                        Dev
                    </button>
                </nav>
            </div>
            <div className={'tw-col-span-9'}>
                <Routes>
                    <Route path="/runs/" element={
                        <RunsPage/>
                    }/>
                    <Route path="/runs/:runName" element={
                        <RunDetailsPage/>
                    }/>
                    <Route path="/dev" element={
                        <DevPage/>
                    }/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
