import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LanguageIcon from '@mui/icons-material/Language';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

export default function LanguageButton() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { t: tLanguage } = useTranslation('language');

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        handleClose();
    };

    return (
        <>
            <Tooltip title={tLanguage('language_button_tooltip')}>
                <IconButton onClick={handleClick} color="inherit">
                    <LanguageIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => changeLanguage('en')}>{tLanguage('en')}</MenuItem>
                <MenuItem onClick={() => changeLanguage('pt')}>{tLanguage('pt')}</MenuItem>
            </Menu>
        </>
    );
};
