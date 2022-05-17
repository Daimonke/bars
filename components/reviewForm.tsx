import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Alert, AlertColor, Divider, Rating, Typography } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import URL from '../URL'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { getServerSideProps } from '../pages';
import Router from 'next/router';

export default function ReviewForm({ item, update }: any) {
  const { data: session }: any = useSession()
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState<number | null>(2)
  const [euros, setEuros] = useState<number | null>(2)
  const [alert, setAlert] = useState<{active: boolean, type: AlertColor, msg: string}>({
    active: false,
    type: 'success',
    msg: ''
  })

  const handleClickOpen = () => {
    setOpen(true);
    console.log(item)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if(!session) {
      return setAlert({
        active: true,
        type: 'error',
        msg: 'Prisijunkite, kad galėtumėte vertinti.'
      })
    }
    axios.post(`${URL}/api/bars`, {
      user: session.user,
      bar_id: item.id,
      rating: stars,
      price: euros
    })
      .then((res) => {
        console.log(res.data)
        if (res.data.err) {
          console.log('NOTOK')
          setAlert({
            active: true,
            type: 'error',
            msg: res.data.err
          })}
          if (res.data.msg) {
            console.log('OK')
            setAlert({
              active: true,
              type: 'success',
              msg: res.data.msg
            })
            update()
            setTimeout(() => {
              handleClose()
            }, 1000)
          }
      })
  }

  return (
    <div>
      <Button fullWidth color='success' variant='contained' onClick={handleClickOpen}>Įvertinti</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Baras <b>{item.name}</b></DialogTitle>
        <Divider />
        <DialogContent sx={{ display: 'flex', gap: 5 }}>
          <div>
            <Typography component="legend">Kokybė</Typography>
            <Rating
              precision={0.1}
              name="simple-controlled"
              value={stars}
              onChange={(event, newValue) => {
                setStars(newValue);
              }}
            />
          </div>
          <div style={{}}>
            <Typography component="legend">Kaina</Typography>
            <Rating
              icon={<EuroIcon fontSize='medium' />} emptyIcon={<EuroIcon fontSize='medium' />}
              sx={{ color: 'rgb(0, 182, 9)' }}
              precision={0.1}
              name="simple-controlled"
              value={euros}
              onChange={(event, newValue) => {
                setEuros(newValue);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>Atšaukti</Button>
          <Button onClick={handleSubmit} color='success'>Įvertinti</Button>

        </DialogActions>
        <DialogActions>
          {alert.active ?
            <Alert sx={{width: '100%'}} severity={alert.type} onClose={() => setAlert({active: false, msg: '', type: 'success'})}>{alert.msg}</Alert>
            :
            null
          }

        </DialogActions>
      </Dialog>
    </div>
  );
}

function context(context: any) {
  throw new Error('Function not implemented.');
}
