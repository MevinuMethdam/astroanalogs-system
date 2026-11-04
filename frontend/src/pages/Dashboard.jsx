import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import io from 'socket.io-client';
import axios from 'axios';
import { Activity, Map, ShieldAlert, Rocket } from 'lucide-react';
import SimilarityRadarChart from '../components/Charts/SimilarityRadarChart';

const socket = io('http://localhost:5000');

const Dashboard = () => {
    const [analogData, setAnalogData] = useState(null);
    const [liveUpdate, setLiveUpdate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/analogs/match')
            .then(res => setAnalogData(res.data.data[0]))
            .catch(err => console.error(err));

        socket.on('live_environment_update', (data) => {
            setLiveUpdate(`Live: Radiation diff changing - ${data.current_radiation_diff}`);
        });

        return () => socket.disconnect();
    }, []);

    if (!analogData) return <div className="text-white p-10 text-center text-2xl font-bold">Initializing AstroAnalogs AI Core...</div>;

    const globeData = [{
        lat: analogData.coordinates.lat,
        lng: analogData.coordinates.lng,
        size: 20,
        color: 'red',
        label: analogData.earth_location
    }];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">

            <header className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-blue-400">AstroAnalogs System</h1>
                    <p className="text-gray-400">Planetary Analog Matchmaker AI</p>
                </div>
                <div className="flex items-center space-x-2 text-green-400 font-mono text-sm bg-gray-800 px-4 py-2 rounded-full">
                    <Activity size={16} className="animate-pulse" />
                    <span>{liveUpdate || 'Establishing secure link to NASA GIBS...'}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="bg-gray-800 rounded-xl p-4 shadow-lg flex flex-col items-center justify-center relative overflow-hidden h-[500px]">
                    <h2 className="text-lg font-bold mb-2 w-full text-left flex items-center"> Terrestrial Locator</h2>
                    <div className="w-full h-full cursor-grab">
                        <Globe
                            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                            pointsData={globeData}
                            pointAltitude={0.1}
                            pointColor="color"
                            pointLabel="label"
                            width={400}
                            height={400}
                            backgroundColor="rgba(0,0,0,0)"
                        />
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-blue-300 border-b border-gray-700 pb-2 mb-4">
                            Match: {analogData.earth_location} <br/><span className="text-sm text-gray-400">vs {analogData.space_target}</span>
                        </h2>
                        <div className="flex space-x-2 h-40">
                            <div className="w-1/2 bg-gray-700 rounded flex items-center justify-center text-gray-500 border border-gray-600 shadow-inner">
                                [Earth Image Container]
                            </div>
                            <div className="w-1/2 bg-gray-700 rounded flex items-center justify-center text-gray-500 border border-gray-600 shadow-inner">
                                [Space Image Container]
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-gray-900 rounded-lg p-2">
                        <h3 className="text-sm font-semibold text-gray-400 text-center mb-2">Quantitative Similarity Metric</h3>
                        <SimilarityRadarChart scores={analogData.similarity_scores} />
                    </div>
                </div>

                <div className="flex flex-col space-y-6">

                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-red-500">
                        <h2 className="text-lg font-bold mb-4 flex items-center text-red-400"><ShieldAlert className="mr-2" size={20}/> Analogy Breakdown</h2>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><span className="font-bold text-white">Gravity:</span> {analogData.breakdown_analysis.gravity}</li>
                            <li><span className="font-bold text-white">Atmosphere:</span> {analogData.breakdown_analysis.atmosphere}</li>
                            <li><span className="font-bold text-white">Radiation:</span> {analogData.breakdown_analysis.radiation}</li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl p-6 shadow-lg border-l-4 border-blue-400 flex-1">
                        <h2 className="text-lg font-bold mb-3 flex items-center text-blue-200"><Rocket className="mr-2" size={20}/> The "So What?" Factor</h2>
                        <p className="text-sm text-blue-100 leading-relaxed italic">
                            "{analogData.so_what_factor}"
                        </p>
                        <div className="mt-4 inline-block bg-blue-800 text-xs px-3 py-1 rounded-full text-blue-200 font-semibold uppercase tracking-wider">
                            {analogData.niche_category}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;