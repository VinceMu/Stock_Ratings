import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface CompanySnowflakeChartProps {
    value: number;
    future: number;
    past: number;
    health: number;
    dividend: number;
}

const MAX_SCORE = 10;

export const CompanySnowflakeChart = ({ value, future, past, health, dividend }: CompanySnowflakeChartProps) => {
    const snowflakeData = [
        {
            type: "value",
            score: value
        },
        {
            type: "future",
            score: future
        },
        {
            type: "past",
            score: past
        },
        {
            type: "health",
            score: health
        },
        {
            type: "dividend",
            score: dividend
        }

    ]
    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={snowflakeData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="type" />
                <PolarRadiusAxis domain={[0, MAX_SCORE]} />
                <Radar name="CompanyScores" dataKey="score" stroke="#8884d8" fill="#0E6EB8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    );

}