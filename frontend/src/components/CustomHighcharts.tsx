import HighchartsReact, { HighchartsReactProps } from 'highcharts-react-official';
import { useTheme } from '@mui/material/styles';

const getHighchartsTheme = (mode: 'light' | 'dark') => {
    if (mode === 'dark') {
        return {
            chart: {
                backgroundColor: 'transparent',
                style: {
                    color: '#FFFFFF'
                }
            },
            title: {
                style: {
                    color: '#FFFFFF'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#FFFFFF'
                    }
                },
                title: {
                    style: {
                        color: '#FFFFFF'
                    }
                }
            },
            yAxis: [{
                labels: {
                    style: {
                        color: '#FFFFFF'
                    }
                },
                title: {
                    style: {
                        color: '#FFFFFF'
                    }
                }
            }, {
                labels: {
                    style: {
                        color: '#FFFFFF'
                    }
                },
                title: {
                    style: {
                        color: '#FFFFFF'
                    }
                }
            }],
            legend: {
                itemStyle: {
                    color: '#FFFFFF'
                }
            },
            series: [{
                color: '#ff6961'
            }, {
                color: '#30adcb'
            }]
        };
    } else {
        return {
            chart: {
                backgroundColor: 'transparent',
                style: {
                    color: '#000000'
                }
            },
            legend: {
                itemStyle: {
                    color: '#000000'
                }
            },
            series: [{
                color: '#ff6961'
            }, {
                color: '#30adcb'
            }]
        };
    }
};

function CustomHighchartsTheme(props: HighchartsReactProps) {
    const theme = useTheme();

    return (
        <HighchartsReact
            {...props}
            options={{ ...getHighchartsTheme(theme.palette.mode), ...props.options, }}
        />
    );
};

export default CustomHighchartsTheme;