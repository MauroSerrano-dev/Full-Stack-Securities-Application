// src/theme.ts
import { createTheme } from '@mui/material/styles';

const primary = '#003134'

const theme = createTheme({
    palette: {
        primary: {
            main: primary,
        },
        success: {
            main: '#4caf50',
        },
        error: {
            main: '#f44336',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
        },
    },
    components: {
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f5f5f5',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: primary,
                    color: '#ffffff',
                    fontWeight: 'bold',
                },
                body: {
                    fontSize: '0.875rem',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(odd)': {
                        backgroundColor: '#eeeeee',
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
    },
});

export default theme;