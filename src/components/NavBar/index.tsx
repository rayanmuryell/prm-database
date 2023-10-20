import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';

import LogoPRM from 'next/image'
import { Typography } from '@mui/material';

export default function SearchAppBar() {
    return (
        <Toolbar style={{ backgroundColor: '#5e151b' }}>
            <LogoPRM src='/discordanimated.gif' alt='Logo PRM' width='80' height='80'style={{ margin: '5px' }}/>
            <Typography sx={{ ml: 2, flex: 1, color: '#FFFFFF' }} variant="h5" component="div">
                PRM - Database
            </Typography>
        </Toolbar>
    );
}