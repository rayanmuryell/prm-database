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
import { ItemType_Item } from '../types/types_item';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenDialogProps {
  itemName: string;
  data: ItemType_Item[];
}

export default function FullScreenDialog({ itemName, data }: FullScreenDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [mobNameToDisplay, setMobNameToDisplay] = React.useState<string | null>(null);
  const [mobsWithItem, setMobsWithItem] = React.useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      // Encontre os monstros que possuem o item no campo 'Drops'
      const mobs = data
        .filter((item) => {
          const drops = item.Drops.map((drop) => drop.toLowerCase().trim());
          return drops.includes(itemName.toLowerCase().trim());
        })
        .map((item) => item['Mob Name']);
      setMobsWithItem(mobs);
    }
  }, [open, itemName, data]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        More
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {itemName}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <Typography variant="h6" component="div">
            Monsters with {itemName}:
          </Typography>
          {mobsWithItem.map((mobName) => (
            <ListItem button key={mobName}>
              <ListItemText primary={mobName} />
            </ListItem>
          ))}
          <Divider />
        </List>
      </Dialog>
    </div>
  );
}
