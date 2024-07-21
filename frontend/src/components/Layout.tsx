import { AppBar, Toolbar, Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import ThemeButton from './ThemeButton';
import LanguageButton from './LanguageButton';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
    setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
    themeMode: 'light' | 'dark' | 'system';
}

export default function Layout(props: LayoutProps) {
    const {
        setThemeMode,
        themeMode
    } = props

    const { t: tCommon } = useTranslation('common')

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <AppBar position="static">
                <Toolbar
                    sx={{
                        justifyContent: 'space-between'
                    }}
                >
                    <Link
                        to={'/'}
                    >
                        <Typography
                            variant="h6"
                        >
                            {tCommon('app_name')}
                        </Typography>
                    </Link>
                    <Box display='flex' gap={1}>
                        <ThemeButton
                            setThemeMode={setThemeMode}
                            themeMode={themeMode}
                        />
                        <LanguageButton />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                flexGrow={1}
                py={2}
                px={isMobile ? 1 : 4}
            >
                <Outlet />
            </Box>
            <Box component="footer" py={3} textAlign="center">
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} {tCommon('app_name')}
                </Typography>
            </Box>
        </Box>
    );
};