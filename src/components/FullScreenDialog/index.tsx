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


    // Suponha que `item` seja do tipo ItemType.
    // Suponha que `item` seja do tipo ItemType.
    const itemListWithPercentages = Object.keys(item).map((key, index) => {
        const dropValue = item[key as keyof ItemType];
        if (dropValue && dropValue.includes('(')) {
            const primary = dropValue.split('(')[0];
            const percentageMatch = dropValue.match(/\(([^)]+)\)/);
            const percentage = percentageMatch ? parseFloat(percentageMatch[1]) : 0;
            return { primary, percentage, index };
        }
        return null;
    });


    // Remova os valores nulos do array.
    const filteredItemListWithPercentages = itemListWithPercentages.filter(item => item !== null);

    // Ordene o novo array com base nas porcentagens em ordem decrescente.
    filteredItemListWithPercentages.sort((a, b) => (b?.percentage ?? 0) - (a?.percentage ?? 0));


    function getClassForElement(element: any) {
        if (/Dark/i.test(element)) {
            return 'Dark';
        } else if (/Earth/i.test(element)) {
            return 'Earth';
        } else if (/Fire/i.test(element)) {
            return 'Fire';
        } else if (/Water/i.test(element)) {
            return 'Water';
        } else if (/Ghost/i.test(element)) {
            return 'Ghost';
        } else if (/Holy/i.test(element)) {
            return 'Holy';
        } else if (/Poison/i.test(element)) {
            return 'Poison';
        } else if (/Undead/i.test(element)) {
            return 'Undead';
        } else if (/Wind/i.test(element)) {
            return 'Wind';
        } else {
            return ''; // Classe padrão (sem cor) se nenhuma palavra-chave for encontrada
        }
    }




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
                <AppBar sx={{ position: 'relative', backgroundColor: '#940000' }}>
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
                    <div className='fila-1' style={{ display: 'flex' }}>
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
                    <div className='fila-2' style={{ display: 'flex' }}>
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
                            <ListItemText primary="Element" secondary={
                                <span className={getClassForElement(item['Element'])}>
                                    {item['Element']}
                                </span>
                            } />
                        </div>
                    </ListItem>

                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Drop List
                    </Typography>
                    <Divider />



                    {filteredItemListWithPercentages.map((itemInfo, index) => {
                        if (itemInfo && !isNaN(itemInfo.percentage)) {
                            const percentage = itemInfo.percentage;
                            const isRare = percentage >= 1 && percentage <= 3;
                            const isEpic = percentage < 1;

                            return (
<ListItem button key={itemInfo.index}>
        <ListItemText
          primary={itemInfo.primary}
          secondary={
            <div>
              <span>{`(${percentage}%)`}</span>
              {isRare && (
                <span style={{ marginLeft: '8px' }}>
                  <span style={{ padding: '4px', backgroundColor: 'purple', color: 'white', borderRadius: '10px' }}>
                    RARE
                  </span>
                </span>
              )}
              {isEpic && (
                <span style={{ marginLeft: '8px' }}>
                  <span style={{ padding: '4px', backgroundColor: 'gold', color: 'black', borderRadius: '10px' }}>
                    EPIC!
                  </span>
                </span>
              )}
            </div>
          }
        />
      </ListItem>
    );
  } else {
    return null;
  }
})}






                </List>
            </Dialog>
        </div>
    );
}
