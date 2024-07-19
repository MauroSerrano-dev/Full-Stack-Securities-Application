// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
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
                    backgroundColor: '#1976d2',
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
    },
});

export default theme;