import { createTheme, Theme } from '@mui/material/styles';

const primaryLight = '#428a91'
const primaryDark = '#003134'
const transitionDuration = 150

export const lightTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: primaryLight,
        },
        success: {
            main: '#4caf50',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#ffffff',
            paper: '#424242',
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            color: '#213547',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                a: {
                    textDecoration: 'none',
                    color: '#fff',
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f5f5f5',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: primaryLight,
                    transition: `background-color ${transitionDuration}ms ease-in-out`,
                }
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: primaryLight,
                    color: '#ffffff',
                    fontWeight: 'bold',
                    transition: `background-color ${transitionDuration}ms ease-in-out`,
                },
                body: {
                    fontSize: '0.875rem',
                    transition: `background-color ${transitionDuration}ms ease-in-out`,
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    transition: `background-color ${transitionDuration}ms ease-in-out`,
                    '&:nth-of-type(odd)': {
                        backgroundColor: '#eeeeee',
                    },
                    '&:nth-of-type(even)': {
                        backgroundColor: '#f5f5f5',
                    },
                },
                hover: {
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#e0f7fa',
                    },
                },
            },
        },
        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    '&:hover': {
                        color: '#ffffff',
                    },
                    '&.Mui-active': {
                        color: '#ffffff',
                    },
                },
                icon: {
                    color: '#ffffff !important',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#eeeeee',
                },
            },
        },
    },
});

export const darkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: primaryDark,
        },
        success: {
            main: '#4caf50',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#2e3539',
            paper: '#424242',
        },
        text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: '#aaaaaa',
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.87)',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                a: {
                    textDecoration: 'none',
                    color: '#fff',
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: primaryDark,
                    transition: `background-color ${transitionDuration}ms ease-in-out`,
                }
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: primaryDark,
                    color: '#ffffff',
                    fontWeight: 'bold',
                    transition: `background-color ${transitionDuration}ms ease-in-out`,
                },
                body: {
                    fontSize: '0.875rem',
                    transition: `background-color ${transitionDuration}ms ease-in-out`,
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    transition: `background-color ${transitionDuration}ms ease-in-out`,
                    '&:nth-of-type(odd)': {
                        backgroundColor: '#2c2c2c',
                    },
                    '&:nth-of-type(even)': {
                        backgroundColor: '#1e1e1e',
                    },
                },
                hover: {
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#333333',
                    },
                },
            },
        },
        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    '&:hover': {
                        color: '#ffffff',
                    },
                    '&.Mui-active': {
                        color: '#ffffff',
                    },
                },
                icon: {
                    color: '#ffffff !important',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#424242',
                },
            },
        },
    },
});