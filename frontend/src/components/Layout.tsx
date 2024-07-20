import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    const { i18n } = useTranslation();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Link
                        to={'/'}
                    >
                        <Typography variant="h6">
                            My App
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Box pt={2} pb={2} pr={4} pl={4}>
                <Outlet />
            </Box>
            <Box component="footer" py={3} textAlign="center">
                <Button
                    variant='outlined'
                    onClick={() => i18n.changeLanguage('en')}
                    disabled={i18n.language.slice(0, 2) === 'en'}
                >
                    EN
                </Button>
                <Button
                    variant='outlined'
                    onClick={() => i18n.changeLanguage('pt')}
                    disabled={i18n.language.slice(0, 2) === 'pt'}
                >
                    PT
                </Button>
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} My App
                </Typography>
            </Box>
        </div>
    );
};

export default Layout;
