import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

interface Security {
    id: number;
    ticker: string;
    securityName: string;
    sector: string;
    country: string;
    trend: number;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SecurityList() {
    const [securities, setSecurities] = useState<Security[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || '1';
    const limit = query.get('limit') || '15';

    useEffect(() => {
        const fetchSecurities = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/securities`, {
                    params: { page, limit },
                });
                setSecurities(response.data.data);
            } catch (err) {
                setError('Error fetching securities');
            } finally {
                setLoading(false);
            }
        };

        fetchSecurities();
    }, [page, limit]);

    function getTrendColor(trend: number) {
        if (trend < -0.2) return 'red';
        if (trend >= -0.2 && trend <= 0.2) return 'green';
        if (trend > 0.2) return 'blue';
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol/Ticker</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Sector</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Trend</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {securities.map((security) => (
                        <TableRow
                            key={security.ticker}
                            onClick={() => navigate(`/securities/${security.ticker}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <TableCell>{security.ticker}</TableCell>
                            <TableCell>{security.securityName}</TableCell>
                            <TableCell>{security.sector}</TableCell>
                            <TableCell>{security.country}</TableCell>
                            <TableCell style={{ backgroundColor: getTrendColor(security.trend) }}>
                                {security.trend}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SecurityList;