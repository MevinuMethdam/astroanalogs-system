import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SimilarityRadarChart = ({ scores }) => {
    const data = [
        { subject: 'Geology & Mineralogy', A: scores.geology, fullMark: 100 },
        { subject: 'Topography', A: scores.topography, fullMark: 100 },
        { subject: 'Environment', A: scores.environment, fullMark: 100 },
        { subject: 'Radiation Shielding', A: scores.radiation_shielding, fullMark: 100 },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#4B5563" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} />
                <Radar name="Similarity %" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default SimilarityRadarChart;