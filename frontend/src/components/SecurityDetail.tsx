import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

HighchartsAccessibility(Highcharts);

interface DailySeries {
    date: string;
    close: number;
    volume: number;
}

interface Security {
    ticker: string;
    securityName: string;
    sector: string;
    country: string;
    trend: number;
    dailySeries: DailySeries[];
}

const SecurityDetail: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>();
    const [security, setSecurity] = useState<Security | null>(null);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    useEffect(() => {
        getSecurity()
    }, [symbol]);

    async function getSecurity() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/securities/${symbol}`)
            setSecurity(response.data);
        }
        catch (error) {
            console.error('error', error);
            const axiosError = error as AxiosError;
            if (axiosError.response?.status) {
                setErrorStatus(axiosError.response.status);
            }
        }
    }

    if (errorStatus === 404) {
        return <div>Not Found</div>;
    }

    if (!security) {
        return <div>Loading...</div>;
    }

    const chartOptions = {
        title: {
            text: `${security.securityName} (${security.ticker})`,
        },
        xAxis: {
            categories: security.dailySeries.map((series) => series.date),
        },
        yAxis: [
            {
                title: {
                    text: 'Volume',
                },
                opposite: true,
            },
            {
                title: {
                    text: 'Close Price',
                },
            },
        ],
        series: [
            {
                name: 'Volume',
                data: security.dailySeries.map((series) => Number(series.volume)),
                type: 'line',
                yAxis: 0,
            },
            {
                name: 'Close Price',
                data: security.dailySeries.map((series) => series.close),
                type: 'line',
                yAxis: 1,
            },
        ],
    };

    return (
        <div>
            <h2>{security.securityName} ({security.ticker})</h2>
            <p>Country: {security.country}</p>
            <p>Sector: {security.sector}</p>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default SecurityDetail;