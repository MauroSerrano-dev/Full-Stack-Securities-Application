import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import ThemeButton from './ThemeButton';
import LanguageButton from './LanguageButton';

interface LayoutProps {
    setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
    themeMode: 'light' | 'dark' | 'system';
}

function Layout(props: LayoutProps) {
    const {
        setThemeMode,
        themeMode
    } = props

    return (
        <div>
            <AppBar position="static">
                <Toolbar
                    sx={{
                        justifyContent: 'space-between'
                    }}
                >
                    <Link
                        to={'/'}
                    >
                        <Typography variant="h6">
                            My App
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
            <Box pt={2} pb={2} pr={4} pl={4}>
                <Outlet />
            </Box>
            <Box component="footer" py={3} textAlign="center">
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} My App
                </Typography>
            </Box>
        </div>
    );
};

export default Layout;
