import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import FullScreenDialog from '../FullScreenDialog';
import { ItemType_Item } from '../types/types_item'
import Footer from '../Footer';
import FullScreenDialog_Item from '../FullScreenDialog_Item';

const PlanilhaData_Item = () => {
    const [uniqueDropNames, setUniqueDropNames] = useState<string[]>([]);
    const [topFiveItems, setTopFiveItems] = useState<string[]>([]);
    const [dropToMobMap, setDropToMobMap] = useState<{ [itemName: string]: string[] }>({});
    const [searchResults, setSearchResults] = useState<ItemType_Item[]>([]);
    const [pagedSearchResults, setPagedSearchResults] = useState<ItemType_Item[]>([]);
    const [allData, setAllData ] = useState<ItemType_Item[]>([]);
    const [hasMoreResult, setHasMoreResult] = useState<boolean>(false);



    const fetchData = async () => {
        try {
            const sheetId = '1Nle99PghJVQxCwg-auVl04BpCBZqepjS7ms9naG427A';
            const sheetTitle = 'Database';
            const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetTitle}&tqx=out:csv`;
            const response = await axios.get(url);
            const rawData: string = response.data;
            const cleanedData: string = rawData.replace(/"/g, '');
            const rows: string[] = cleanedData.split('\n');
            const header: string[] = rows[0].split(',');

            const parsedData: { [key: string]: string }[] = rows.slice(1).map((row: string) => {
                const values: string[] = row.split(',');
                const rowData: { [key: string]: string } = {};

                if (values.length === header.length) {
                    header.forEach((columnName: string, index: number) => {
                        rowData[columnName] = values[index].trim();
                    });
                } else {
                    console.error('Erro ao processar linha:', row);
                }
                return rowData;
            });

            // Mapeie os dados para o tipo ItemType com uma lista unificada de drops
            const typedData: ItemType_Item[] = parsedData.map((item: { [key: string]: string }) => {
                const drops: string[] = [];
                for (let i = 1; i <= 10; i++) {
                    const dropKey = `Drop ${i}`;
                    const dropValue = item[dropKey];
                    if (dropValue) {
                        drops.push(dropValue);
                    }
                }

                return {
                    'Mob Name': item['Mob Name'],
                    'Level': item['Level'],
                    'HP': item['HP'],
                    'HIT': item['HIT'],
                    'Flee': item['Flee'],
                    'Def': item['Def'],
                    'MDef': item['MDef'],
                    'Luk': item['Luk'],
                    'Size': item['Size'],
                    'Race': item['Race'],
                    'Element': item['Element'],
                    'Drops': drops,
                };
            });

            // Preencha o mapeamento de itens para monstros
            const dropToMobMap: { [itemName: string]: string[] } = {};
            typedData.forEach((mobData: ItemType_Item) => {
                mobData.Drops.forEach(drop => {
                    const itemName = drop.replace(/\s*\(.*\)\s*/g, '');
                    if (!dropToMobMap[itemName]) {
                        dropToMobMap[itemName] = [mobData['Mob Name']];
                    } else {
                        dropToMobMap[itemName].push(mobData['Mob Name']);
                    }
                });
            });

            setDropToMobMap(dropToMobMap);

            console.log('Mapeamento de Itens para Monstros:', dropToMobMap);

            // Define o estado dos resultados filtrados
            setAllData(typedData);
            console.log(typedData)
            setSearchResults(typedData.slice(0, rowsPerPage))
            setHasMoreResult(true)

            // Obtenha todos os drops
            const allDrops = typedData.flatMap(item => item.Drops);
            console.log('Drops totais:', allDrops)


            // Remova itens duplicados e obtenha apenas os nomes dos itens
            const uniqueDropNamesSet = new Set<string>();
            allDrops.forEach(drop => {
                const itemName = drop.replace(/\s*\(.*\)\s*/g, '');
                uniqueDropNamesSet.add(itemName);
            });

            const uniqueDropNames = Array.from(uniqueDropNamesSet);

            // Define os nomes exclusivos dos drops
            setUniqueDropNames(uniqueDropNames);

            // Define os 5 primeiros itens em `searchResults`
            setTopFiveItems(uniqueDropNames.slice(0, 5));


        } catch (error) {
            console.error('Erro ao buscar os dados da planilha:', error);
        }
    };



    useEffect(() => {
        fetchData();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0); // Inicialize com a página 0
    const [rowsPerPage, setRowsPerPage] = useState(5); // Inicialize com 5 itens por página



    // Função para lidar com a mudança de página
    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        if (newPage > page) {
            const currentData = allData.slice((rowsPerPage * newPage) + 1 , (rowsPerPage * newPage) + rowsPerPage)
            setSearchResults(currentData);    
            setHasMoreResult(currentData.length < rowsPerPage ? true : false)
        }else {
            const currentData = allData.slice(((rowsPerPage * page) - rowsPerPage) + 1, (rowsPerPage * page))
            setSearchResults(currentData);
            setHasMoreResult(currentData.length < rowsPerPage ? true : false)
        }
         
        setPage(newPage);
    };

    // Função para lidar com a mudança de linhas por página
    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0)
        fetchData();
    };

    // Filtrar resultados com base na pesquisa
    const filteredResults = searchResults.filter((item) =>
        item['Drops'].some((drop) => drop.toLowerCase().includes(searchTerm.toLowerCase()))

    );


    // Calcular o índice inicial e final dos resultados exibidos
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const filteredResultsSet = new Set();

    filteredResults.forEach((mob) => {
        mob.Drops.forEach((drop) => {
            const itemName = drop.split('(')[0].trim();
            // Verifique se o nome do item inclui a pesquisa
            if (itemName.toLowerCase().includes(searchTerm.toLowerCase())) {
                filteredResultsSet.add(itemName);
            }
        });
    });

    const uniqueFilteredResults = Array.from(filteredResultsSet);

    // Determine quais itens exibir com base na página atual
    const itemsToDisplay = uniqueFilteredResults.slice(startIndex, endIndex);




    return (

        <Box>
            <Typography sx={{ flex: 1, color: '#5a5e5b' }} variant="h6" component="div">
                Search
            </Typography>
            <TextField
                id="outlined-search" label="Item Name" type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ color: '#ffffff', marginBottom: '10px' }}
            />
            <div className='levelrange'>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#940000' }}>
                            <TableCell style={{ color: '#FFFFFF' }} align="center">Item Name</TableCell>
                            <TableCell style={{ backgroundColor: '#690a24', color: '#FFFFFF' }} align="center">Monsters</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemsToDisplay.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row" style={{ maxWidth: '100px' }}>
                                    <div className='NameAndAvatar' style={{}}>
                                        {String(item)}
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <FullScreenDialog_Item mobsForItem={dropToMobMap} selectedItem={item as string} />
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={allData.length} // Atualize para o número de resultados filtrados
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                nextIconButtonProps={{disabled: !hasMoreResult}}
            />

            <Footer />

        </Box>

    );
}

export default PlanilhaData_Item;
