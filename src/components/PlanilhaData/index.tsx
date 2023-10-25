import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import FullScreenDialog from '../FullScreenDialog';
import { ItemType } from '../types/index'; // Importe o tipo ItemType
import Footer from '../Footer';


const PlanilhaData = () => {
    const [data, setData] = useState<ItemType[]>([]); // Use o tipo ItemType
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<ItemType[]>([]); // Use o tipo ItemType
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Você pode configurar isso conforme necessário


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

                // Mapeie os dados para o tipo ItemType explicitamente
                const typedData: ItemType[] = parsedData.map((item: { [key: string]: string }) => ({
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
                    'Drop 1': item['Drop 1'],
                    'Drop 2': item['Drop 2'],
                    'Drop 3': item['Drop 3'],
                    'Drop 4': item['Drop 4'],
                    'Drop 5': item['Drop 5'],
                    'Drop 6': item['Drop 6'],
                    'Drop 7': item['Drop 7'],
                    'Drop 8': item['Drop 8'],
                    'Drop 9': item['Drop 9'],
                    'Drop 10': item['Drop 10'],

                }));

                setData(typedData);
                // Define os primeiros 5 resultados como os resultados de pesquisa iniciais
                setSearchResults(typedData.slice(0, 5));
            } catch (error) {
                console.error('Erro ao buscar os dados da planilha:', error);
            }
        };

        fetchData();
    }, []);


    const [pagedSearchResults, setPagedSearchResults] = useState<ItemType[]>([]);
    const [sortedSearchResults, setSortedSearchResults] = useState<ItemType[]>([]);
    const [selectedMobName, setSelectedMobName] = React.useState<string | null>(null);



    useEffect(() => {
        let filteredResults = data;
    
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredResults = data.filter((item) => {
                // Verifique se 'Mob Name' ou as chaves de 'Drop 1' até 'Drop 10' contêm o termo de pesquisa em letras minúsculas
                return (
                    item['Mob Name'].toLowerCase().includes(lowerCaseSearchTerm) ||
                    Array.from(Array(10).keys()).some((i) => {
                        const key = `Drop ${i + 1}` as keyof ItemType;
                        return item[key] && item[key].toLowerCase().includes(lowerCaseSearchTerm);
                    })
                );
            });
        }
    
        // Classifique os resultados filtrados
        const sortedResults = [...filteredResults].sort((a, b) => Number(b['Level']) - Number(a['Level']));
    
        // Lógica de paginação
        const totalResults = sortedResults.length;
        const totalPages = Math.ceil(totalResults / rowsPerPage);
    
        // Verifique se a página atual está fora dos limites
        let newPage = page;
        if (newPage < 0) {
            newPage = 0;
        } else if (newPage >= totalPages) {
            newPage = totalPages - 1;
        }
    
        setPage(newPage);
    
        const startIdx = newPage * rowsPerPage;
        const endIdx = startIdx + rowsPerPage;
        const paginatedResults = sortedResults.slice(startIdx, endIdx);
    
        // Defina os resultados filtrados e classificados
        setSortedSearchResults(sortedResults);
        setPagedSearchResults(paginatedResults);
    }, [searchTerm, data, page, rowsPerPage]);
    
    
    
    
    



    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };





    return (
        <Box>
            <Typography sx={{ flex: 1, color: '#5a5e5b' }} variant="h6" component="div">
                Search
            </Typography>
            <TextField
                id="outlined-search" label="Mob Name or Item Name" type="search"
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
                            <TableCell style={{ color: '#FFFFFF' }} align="center">Mob Name</TableCell>
                            <TableCell style={{ color: '#FFFFFF' }} align="center">Level</TableCell>
                            <TableCell style={{ color: '#FFFFFF' }} align="center">HP</TableCell>
                            <TableCell style={{ backgroundColor: '#690a24', color: '#FFFFFF' }} align="center">Other</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pagedSearchResults.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row" style={{ maxWidth: '100px' }}>
                                    <div className='NameAndAvatar' style={{}}>
                                        {item['Mob Name']}
                                    </div>
                                </TableCell>
                                <TableCell align="center">{item['Level']}</TableCell>
                                <TableCell align="center">{item['HP']}</TableCell>
                                <TableCell align="center">
                                    <FullScreenDialog
                                        item={item}
                                        data={data}
                                        selectedMobName={selectedMobName}
                                        setSelectedMobName={setSelectedMobName}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sortedSearchResults.length} // Use sortedSearchResults em vez de searchResults
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />
            <Footer />

        </Box>



    );


};

export default PlanilhaData;
