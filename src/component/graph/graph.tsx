import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, ResponsiveContainer, Area } from 'recharts';
import { useParams } from 'react-router-dom';
import client from '../../apolloClient/client';
import { GET_PRODUCT_CLICKS_BY_ID } from '../../apolloClient/graphQL_querys';
import { ChartData2, Click } from '../interface/interface';
export default function Statistic() {
    const [data, setData] = useState<ChartData2[]>([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: responseData } = await client.query({
                    query: GET_PRODUCT_CLICKS_BY_ID,
                    variables: { id },
                });
                const formattedData = responseData.getProductClicksById.clicks.map((click: Click) => ({
                    date: click.date,
                    clicks: click.count
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                })).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id, client]);
    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2em' }}>
                <Grid item xs={12} sx={{ height: '45vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ marginBottom: '1em' }}>
                        Banner View Count
                    </Typography>
                    <ResponsiveContainer width="80%" height="80%" style={{ backgroundColor: '#E8EAF6', padding: '1em', borderRadius: '0.8em', border: 'solid #9FA8DA 0.1em' }}>
                        <AreaChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 4" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="clicks" stroke="#7986CB" fill="#7986CB" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        </Box>
    );
}