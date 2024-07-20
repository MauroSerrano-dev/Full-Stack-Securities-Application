import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Link
                        to={'/'}
                        style={{ textDecoration: 'none' }}
                    >
                        <Typography variant="h6">
                            My App
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Container>
                <Box my={4}>
                    <Outlet />
                </Box>
            </Container>
            <Box component="footer" py={3} textAlign="center">
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} My App
                </Typography>
            </Box>
        </div>
    );
};

export default Layout;
