import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import FullScreenDialog from '../FullScreenDialog';
import { ItemType_Item } from '../types/types_item'
import Footer from '../Footer';
import FullScreenDialog_Item from '../FullScreenDialog_Item';

const PlanilhaData_Item = () => {
    const [data, setData] = useState<ItemType_Item[]>([]); // Use o tipo ItemType
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<ItemType_Item[]>([]); // Use o tipo ItemType
    const [uniqueDropNames, setUniqueDropNames] = useState<string[]>([]);
    const [topFiveItems, setTopFiveItems] = useState<string[]>([]);
    const [filteredResults, setFilteredResults] = useState<ItemType_Item[]>([]);


    useEffect(() => {
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
                        'Drops': drops, // Aqui, usamos uma única chave 'Drops' para armazenar a lista unificada de drops.
                    };
                });

            // Defina o estado dos resultados filtrados
            setFilteredResults(filteredResults);

                // Obtenha todos os drops
                const allDrops = typedData.flatMap(item => item.Drops);

                console.log('Todos os drops:', allDrops); // Adicione este log

                // Remova itens duplicados e obtenha apenas os nomes dos itens
                const uniqueDropNamesSet = new Set<string>(); // Defina explicitamente o tipo como string
                allDrops.forEach(drop => {
                    const itemName = drop.replace(/\s*\(.*\)\s*/g, ''); // Remove a porcentagem
                    uniqueDropNamesSet.add(itemName);
                });

                const uniqueDropNames = Array.from(uniqueDropNamesSet);

                setUniqueDropNames(uniqueDropNames);

                console.log('Nomes exclusivos dos drops:', uniqueDropNames); // Adicione este log

                // Agora, defina os 5 primeiros itens em `searchResults`
                setTopFiveItems(uniqueDropNames.slice(0, 5));

            } catch (error) {
                console.error('Erro ao buscar os dados da planilha:', error);
            }
        };

        fetchData();
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Defina o número de itens por página desejado

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Volte para a primeira página quando o número de itens por página é alterado
    };


    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const itemsToDisplay = topFiveItems.slice(startIndex, endIndex);

    return (

        <Box>
            <Typography sx={{ flex: 1, color: '#5a5e5b' }} variant="h6" component="div">
                Search Name
            </Typography>
            <TextField
                id="outlined-search" label="Drops" type="search"
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
                            <TableCell style={{ backgroundColor: '#690a24', color: '#FFFFFF' }} align="center">Other</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemsToDisplay.map((drop, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row" style={{ maxWidth: '100px' }}>
                                    <div className='NameAndAvatar' style={{}}>
                                        {drop}
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <FullScreenDialog_Item itemName={drop} data={data} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={topFiveItems.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Footer />

        </Box>

    );
}

export default PlanilhaData_Item;
