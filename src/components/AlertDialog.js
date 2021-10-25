import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({onConfirm, onCancel, opened}) {
  const [open, setOpen] = React.useState(opened);

  

  //const handleClose = () => {
 //   setOpen(false);
 // };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Odjava"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Da li ste sigurni?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Odustani</Button>
          <Button onClick={onConfirm} autoFocus>
            Odjavi se
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}