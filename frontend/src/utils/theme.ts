export function getHighchartsTheme(mode: 'light' | 'dark') {
    if (mode === 'dark') {
        return {
            chart: {
                backgroundColor: '#2e3539',
                style: {
                    color: '#fff'
                }
            },
            title: {
                style: {
                    color: '#fff'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#fff'
                    }
                },
                title: {
                    style: {
                        color: '#fff'
                    }
                }
            },
            yAxis: [{
                labels: {
                    style: {
                        color: '#fff'
                    }
                },
                title: {
                    style: {
                        color: '#fff'
                    }
                }
            }, {
                labels: {
                    style: {
                        color: '#fff'
                    }
                },
                title: {
                    style: {
                        color: '#fff'
                    }
                }
            }],
            legend: {
                itemStyle: {
                    color: '#fff'
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
                backgroundColor: '#fff',
                style: {
                    color: '#000000'
                }
            },
            title: {
                style: {
                    color: '#000000'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#000000'
                    }
                },
                title: {
                    style: {
                        color: '#000000'
                    }
                }
            },
            yAxis: [{
                labels: {
                    style: {
                        color: '#000000'
                    }
                },
                title: {
                    style: {
                        color: '#000000'
                    }
                }
            }, {
                labels: {
                    style: {
                        color: '#000000'
                    }
                },
                title: {
                    style: {
                        color: '#000000'
                    }
                }
            }],
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