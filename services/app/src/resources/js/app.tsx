import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './components/Main';
import { Box, Typography } from '@mui/material';

function App()
{
    return <Box>
        <Box>
            <Typography variant={'h2'}>
                Договоры и процессы
            </Typography>
        </Box>
        <Box>
            <Main />
        </Box>
    </Box>;
}

if (document.getElementById('app')) {
    const rootElement = document.getElementById('app');
    const root = createRoot(rootElement);
    root.render(<App />);
}
