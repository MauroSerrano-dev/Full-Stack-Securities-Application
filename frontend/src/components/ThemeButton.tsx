import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

interface ThemeButtonProps {
    setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
    themeMode: 'light' | 'dark' | 'system';
}

export default function ThemeButton(props: ThemeButtonProps) {
    const { setThemeMode, themeMode } = props;
    const { t: tTheme } = useTranslation('theme');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const savedTheme = Cookies.get('themeMode') as 'light' | 'dark' | 'system';
        if (savedTheme) {
            setThemeMode(savedTheme);
        }

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (themeMode === 'system') {
                setThemeMode(e.matches ? 'dark' : 'light');
            }
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, [themeMode, setThemeMode]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeTheme = (mode: 'light' | 'dark' | 'system') => {
        setThemeMode(mode);
        Cookies.set('themeMode', mode, { expires: 365 });
        handleClose();
    };

    const getIcon = () => {
        if (themeMode === 'dark') return <NightsStayIcon />;
        if (themeMode === 'light') return <WbSunnyIcon />;
        return <Brightness4Icon />;
    };

    return (
        <>
            <Tooltip title={tTheme('theme_button_tooltip', { theme: tTheme(themeMode) })}>
                <IconButton onClick={handleClick} color="inherit">
                    {getIcon()}
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleChangeTheme('light')}>{tTheme('light')}</MenuItem>
                <MenuItem onClick={() => handleChangeTheme('dark')}>{tTheme('dark')}</MenuItem>
                <MenuItem onClick={() => handleChangeTheme('system')}>{tTheme('system')}</MenuItem>
            </Menu>
        </>
    );
};