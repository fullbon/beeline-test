import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
    title: string,
    buttonText: string,
    children: React.JSX.Element
    onConfirm: () => void,
    setOpen: (open: boolean) => void
    open: boolean
}

export default function FormDialog(props: Props) {
    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleConfirm = () => {
        props.onConfirm();
        handleClose();
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                {props.buttonText}
            </Button>
            <Dialog
                open={props.open}
                onClose={handleClose}
            >
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm}>Добавить/изменить</Button>
                    <Button onClick={handleClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
