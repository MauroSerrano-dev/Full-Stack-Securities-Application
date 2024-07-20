import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    TablePagination,
    TableSortLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Security {
    id: number;
    ticker: string;
    securityName: string;
    sector: string;
    country: string;
    trend: number;
}

const columns: { id: keyof Security, width: string }[] = [
    { id: 'ticker', width: '10%' },
    { id: 'securityName', width: '30%' },
    { id: 'sector', width: '20%' },
    { id: 'country', width: '20%' },
    { id: 'trend', width: '20%' },
];

function SecurityList() {
    const [securities, setSecurities] = useState<Security[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [orderBy, setOrderBy] = useState<string>('securityName');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const navigate = useNavigate();

    const tCommon = useTranslation('common').t;

    useEffect(() => {
        const fetchSecurities = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/securities`, {
                    params: { page: page + 1, limit: rowsPerPage, sortBy: orderBy, order: order.toUpperCase() },
                });
                setSecurities(response.data.data);
                setTotalRows(response.data.total);
                setError(null);
            } catch (err) {
                setError('Error fetching securities');
            } finally {
                setLoading(false);
            }
        };

        fetchSecurities();
    }, [page, rowsPerPage, orderBy, order]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function getTrendColor(trend: number) {
        if (trend < -0.2) return '#f44336';
        if (trend >= -0.2 && trend <= 0.2) return '#4caf50';
        if (trend > 0.2) return '#1976d2';
    }

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    style={{
                                        width: column.width,
                                        padding: 0
                                    }}
                                >
                                    <TableSortLabel
                                        onClick={() => handleRequestSort(column.id)}
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            padding: '16px'
                                        }}
                                    >
                                        {tCommon(column.id)}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading
                            ? <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                            : error
                                ? <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        {error}
                                    </TableCell>
                                </TableRow>
                                : securities.length > 0
                                    ? securities.map((security) =>
                                        <TableRow
                                            key={security.id}
                                            onClick={() => navigate(`/securities/${security.ticker}`)}
                                            hover
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {columns.map(column =>
                                                <TableCell
                                                    key={column.id}
                                                    style={{
                                                        width: column.width,
                                                        backgroundColor: column.id === 'trend' ? getTrendColor(security.trend) : undefined,
                                                        color: column.id === 'trend' ? '#fff' : undefined
                                                    }}
                                                >
                                                    {security[column.id]}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    )
                                    : <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            No securities found
                                        </TableCell>
                                    </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {!loading && !error &&
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={tCommon('rowsPerPage')}
                />}
        </Paper>
    );
}

export default SecurityList;