import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSession, signIn, signOut } from "next-auth/react"
import GoogleIcon from '@mui/icons-material/Google';
import { Avatar, IconButton, Typography } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function Profile() {
    const { data: session }: any = useSession()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                startIcon={<AccountBoxIcon fontSize='large'/>}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size='large'
                variant='contained'
            >
                Profile
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{mt: 1}}
            >
                {session?
                <>
                 <div style={{display: 'flex', alignItems: 'center', padding: '5px 10px'}}>
                 <Avatar alt={session.user.name} src={session.user.image} />
                   <Typography sx={{ml: 1}} variant='body1'>{session.user.email}</Typography>
                 </div>
                 <Button startIcon={<GoogleIcon />} sx={{padding: '5px 20px'}} fullWidth variant='text' onClick={() => signOut()}>Logout</Button>
            </>
            :
            <>
            <Button startIcon={<GoogleIcon />} sx={{padding: '5px 20px'}} fullWidth variant='text' onClick={() => signIn('google')}>Login with Google</Button>
            </>
           
            }
                
            </Menu>
        </div>
    );
}