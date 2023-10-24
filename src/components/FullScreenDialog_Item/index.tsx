import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import MonsterInfo from '../MonsterInfo';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenDialogItemProps {
  mobsForItem: { [itemName: string]: string[] };
  selectedItem: string;
}

export default function FullScreenDialog({ mobsForItem, selectedItem }: FullScreenDialogItemProps) {
  const [open, setOpen] = React.useState(false);
  const [showMonster, setShowMonster] = React.useState(false)


  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedItem}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Droped By
          </Typography>
          <Divider />

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {mobsForItem[selectedItem] ? (
              mobsForItem[selectedItem].map((mob, index) => (
                <div
                  key={index}
                  style={{
                    flex: '0 0 calc(20% - 20px)', // Define a largura para 20% com margens
                    margin: '10px',
                    border: '1px dashed grey',
                    padding: '10px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'lightgrey';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={(e) => {
                    setShowMonster(true)
                  }}
                >
                  {mob}
                  {showMonster && (
                    <MonsterInfo />
                  )} 
                </div>
              ))
            ) : (
              <div>Nenhum monstro encontrado</div>
            )}
          </div>


        </List>
      </Dialog>
    </div>
  );
}
