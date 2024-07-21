import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { useTheme } from '@mui/material/styles';
import HighchartsReact from 'highcharts-react-official';

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

    const theme = useTheme();

    useEffect(() => {
        getSecurity()
    }, [symbol, theme]);

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

    const chartOptions: Highcharts.Options = {
        chart: {
            backgroundColor: 'transparent',
        },
        title: {
            text: `${security.securityName} (${security.ticker})`,
            style: {
                color: theme.palette.text.primary
            }
        },
        xAxis: {
            categories: security.dailySeries.map((series) => series.date),
            labels: {
                style: {
                    color: theme.palette.text.primary
                }
            },
            title: {
                style: {
                    color: theme.palette.text.primary
                }
            },
            lineColor: theme.palette.text.primary,
        },
        yAxis: [
            {
                labels: {
                    style: {
                        color: theme.palette.text.primary
                    }
                },
                title: {
                    text: 'Volume',
                    style: {
                        color: theme.palette.text.primary
                    }
                },
                opposite: true,

            },
            {
                labels: {
                    style: {
                        color: theme.palette.text.primary
                    }
                },
                title: {
                    text: 'Close Price',
                    style: {
                        color: theme.palette.text.primary
                    }
                },
            },
        ],
        legend: {
            itemStyle: {
                color: theme.palette.text.primary
            }
        },

        series: [
            {
                name: 'Volume',
                data: security.dailySeries.map((series) => Number(series.volume)),
                type: 'line',
                yAxis: 0,
                color: '#ff6961',
            },
            {
                name: 'Close Price',
                data: security.dailySeries.map((series) => series.close),
                type: 'line',
                yAxis: 1,
                color: '#30adcb',
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