import React, { useEffect, useState, Fragment } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const AlertRer = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alert({ type, title, open, setOpenAlert }) {
    return (
        <Snackbar open={open} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }} autoHideDuration={3000}
            onClose={() => setOpenAlert(false)}
        >
            <AlertRer severity={type} sx={{ width: '100%' }}>
                {title}
            </AlertRer>
        </Snackbar>);
}