import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { useTheme } from '@mui/material/styles';
import HighchartsReact from 'highcharts-react-official';
import { lightBlue, red } from '@mui/material/colors';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

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

export default function SecurityDetail() {
    const { symbol } = useParams<{ symbol: string }>();
    const [security, setSecurity] = useState<Security | null>(null);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { t } = useTranslation('common');

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
        return (
            <Box
                display="flex"
                justifyContent="center"
                pt={5}
            >
                Not Found
            </Box>
        );
    }

    if (!security) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                pt={5}
            >
                <CircularProgress />
            </Box>
        );
    }

    const chartOptions: Highcharts.Options = {
        chart: {
            backgroundColor: 'transparent',
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
                    text: t('volume'),
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
                    text: t('stock'),
                    style: {
                        color: theme.palette.text.primary
                    }
                },
            },
        ],
        legend: {
            itemStyle: {
                color: theme.palette.text.disabled,
            },
            itemHoverStyle: {
                color: theme.palette.text.primary
            }
        },
        series: [
            {
                name: t('volume'),
                data: security.dailySeries.map((series) => Number(series.volume)),
                type: 'line',
                yAxis: 0,
                color: red[theme.palette.mode === 'dark' ? 600 : 400],
            },
            {
                name: t('stock'),
                data: security.dailySeries.map((series) => series.close),
                type: 'line',
                yAxis: 1,
                color: lightBlue[theme.palette.mode === 'dark' ? 600 : 400],
            },
        ],
    };



    return (
        <div>
            <h2>{security.ticker} - {security.securityName}</h2>
            <p>{t('sector')}: {security.sector}</p>
            <p>{t('country')}: {security.country}</p>
            <Box
                sx={{
                    overflowX: 'auto',
                    whiteSpace: 'nowrap'
                }}
            >
                <Box
                    sx={{
                        display: 'inline-block',
                        minWidth: isMobile ? '600px' : '100%',
                        width: isMobile ? 'auto' : '100%'
                    }}
                >
                    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                </Box>
            </Box>
        </div>
    );
};