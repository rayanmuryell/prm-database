import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ItemType } from '../types/index'; // Importe o tipo ItemType
import ShieldIcon from '@mui/icons-material/Shield';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ item }: { item: ItemType }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                More
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: '#690a24' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {item['Mob Name']}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Basic Info
                    </Typography>
                    <Divider />
                    <div className='fila-1' style={{display: 'flex'}}>
                    <ListItem button>
                        <ListItemText primary="Level" secondary={item['Level']} />
                    </ListItem>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>
                            <ListItemText primary="HP" secondary={item['HP']} />
                        </div>
                    </ListItem>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="HIT" secondary={item['HIT']} />
                        </div>
                    </ListItem>                    
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="Flee" secondary={item['Flee']} />
                        </div>
                    </ListItem>
                    </div>
                    <div className='fila-2' style={{display: 'flex'}}>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="Def" secondary={item['Def']} />
                        </div>
                    </ListItem>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="MDef" secondary={item['MDef']} />
                        </div>
                    </ListItem>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="Size" secondary={item['Size']} />
                        </div>
                    </ListItem>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="Race" secondary={item['Race']} />
                        </div>
                    </ListItem>
                    </div>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>
                            <ListItemText primary="Element" secondary={item['Element']} />
                        </div>
                    </ListItem>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Drop List
                    </Typography>
                    <Divider />
                    {item['Drop  1'] && (
                        <ListItem button>
                            <ListItemText primary="" secondary={item['Drop  1']} />
                        </ListItem>
                    )}
                    {item['Drop  2'] && (
                        <ListItem button>
                            <ListItemText primary="" secondary={item['Drop  2']} />
                        </ListItem>
                    )}
                    {item['Drop 3'] && (
                        <ListItem button>
                            <ListItemText primary="" secondary={item['Drop 3']} />
                        </ListItem>
                    )}
                    {item['Drop 4'] && (
                        <ListItem button>
                            <ListItemText primary="" secondary={item['Drop 4']} />
                        </ListItem>
                    )}
                    {item['Drop 5'] && (
                        <ListItem button>
                            <ListItemText primary="" secondary={item['Drop 5']} />
                        </ListItem>
                    )}
                    {item['Drop 6'] && (
                        <ListItem button>
                            <ListItemText primary="" secondary={item['Drop 6']} />
                        </ListItem>
                    )}
                    {item['Drop 7'] && (
                        <ListItem button>
                            <ListItemText primary="" secondary={item['Drop 7']} />
                        </ListItem>
                    )}
                    {item['Drop 8'] && (
                        <ListItem button>
                            <ListItemText primary="" secondary={item['Drop 8']} />
                        </ListItem>
                    )}
                    {item['Drop 9'] && (
                        <ListItem button>
                            <ListItemText primary="" secondary={item['Drop 9']} />
                        </ListItem>
                    )}
                </List>
            </Dialog>
        </div>
    );
}
