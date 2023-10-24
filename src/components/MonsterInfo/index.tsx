import { AppBar, Toolbar, IconButton, Typography, List, Divider, ListItem, ListItemText } from "@mui/material";
import { ItemType } from "../types";

interface MonsterInfoProps {
    item: ItemType;
    data: ItemType[];
    selectedMobName: string | null;
    setSelectedMobName: (mobName: string | null) => void;
}





export default function MonsterInfo() {

    // const handleClose = () => {
    //     setSimilarMob(originalMob);
    //     setOpen(false);
    //   };

    return (
        <>
            {/* <AppBar sx={{ position: 'relative', backgroundColor: '#940000' }}>
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
                        {mob['Mob Name']}
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
                        <ListItemText primary="Level" secondary={mob['Level']} />
                    </ListItem>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>
                            <ListItemText primary="HP" secondary={mob['HP']} />
                        </div>
                    </ListItem>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="HIT" secondary={mob['HIT']} />
                        </div>
                    </ListItem>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="Flee" secondary={mob['Flee']} />
                        </div>
                    </ListItem>
                </div>
                <div className='fila-2' style={{ display: 'flex' }}>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="Def" secondary={mob['Def']} />
                        </div>
                    </ListItem>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="MDef" secondary={mob['MDef']} />
                        </div>
                    </ListItem>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="Size" secondary={mob['Size']} />
                        </div>
                    </ListItem>
                    <ListItem button>
                        <div className='icons' style={{ display: 'flex' }}>

                            <ListItemText primary="Race" secondary={mob['Race']} />
                        </div>
                    </ListItem>
                </div>
                <ListItem button>
                    <div className='icons' style={{ display: 'flex' }}>
                        <ListItemText primary="Element" secondary={
                            <span className={`${getClassForElement(mob['Element'])}`}>
                                {mob['Element']}
                            </span>

                        } />
                    </div>
                </ListItem>

                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Drop List
                </Typography>
                <Divider />



                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {filteredItemListWithPercentages.map((itemInfo, index) => {
                        if (itemInfo && !isNaN(itemInfo.percentage)) {
                            const percentage = itemInfo.percentage;
                            const isRare = percentage >= 1 && percentage <= 3;
                            const isEpic = percentage < 1;

                            const itemStyle: React.CSSProperties = {
                                flex: '0 0 calc(20% - 20px)',
                                margin: '10px',
                                border: '1px dashed gray',
                                padding: '10px',
                                cursor: 'pointer', // Estilo do cursor para indicar que é clicável
                            };

                            return (
                                <div
                                    key={itemInfo.index}
                                    style={itemStyle}
                                    onClick={() => handleItemClick(itemInfo.primary)}
                                >
                                    <ListItem button style={{ height: '100%' }}>
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
                                </div>

                            );
                        } else {
                            return null;
                        }
                    })}
                </div>

                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Monsters that also drop this item
                </Typography>
                <Divider />
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {similarMobs.map((mob, index) => (
                        <div
                            key={index}
                            style={{
                                flex: '0 0 calc(20% - 20px)',
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
                            onClick={() => {
                                console.log('Clicou no monstro:', mob);
                                handleSimilarMobClick(mob);
                            }}
                        >
                            <ListItem>
                                <ListItemText
                                    primary={mob['Mob Name']}
                                    secondary={`Level: ${mob['Level']}`}
                                />
                            </ListItem>
                        </div>
                    ))}
                </div>


            </List> */}

            Construção!!!
        </>
    )


}