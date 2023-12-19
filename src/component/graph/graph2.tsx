import { Box, Grid, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChartData,ClickData3,Click } from '../interface/interface';
import {GET_BANNER_BY_ID, GET_ALL_PRODUCT_CLICKS} from '../../apolloClient/graphQL_querys';
import client from '../../apolloClient/client';



async function getBannerName(bannerId:string) {
    try {
        const { data, errors } = await client.query({
            query: GET_BANNER_BY_ID,
            variables: { bannerId },
        });

        if (errors) {
            console.error('GraphQL Errors:', errors);
            return '';
        }

        console.log(data.getBannerById[0].image.alt);
        return data.getBannerById[0].image.alt;
    } catch (error) {
        console.error('Error fetching banner name:', error);
        return '';
    }
}



async function getAllProductClicks() {
    try {
        const { data, errors } = await client.query({
            query: GET_ALL_PRODUCT_CLICKS
        });

        if (errors) {
            console.error('GraphQL Errors:', errors);
            return [];
        }
        return data.getAllProductClicks;
    } catch (error) {
        console.error('Error fetching product clicks:', error);
        return [];
    }
}


async function getTopBannerIdsWithClicks(): Promise<Array<{ banner_id: string, clicks: number }>> {
    try {
        const data = await getAllProductClicks();

        const clickCounts: { [key: string]: number } = data.reduce((acc: { [key: string]: number }, item: ClickData3) => {
            item.clicks.forEach((click: Click) => { 
                acc[item.banner_id] = (acc[item.banner_id] || 0) + click.count;
            });
            return acc;
        }, {});

        const bannerIds = Object.entries(clickCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 7);

        const bannersWithNames = await Promise.all(
            bannerIds.map(async ([banner_id, clicks]) => ({
                banner_id,
                clicks,
                bannername: await getBannerName(banner_id)
            }))
        );

        return bannersWithNames;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


export default function Statistic() {

    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [numBannersToShow, setNumBannersToShow] = useState<number>(5);

    useEffect(() => {
        getTopBannerIdsWithClicks()
            .then(data => {
                const sortedBanners = data.sort((a, b) => b.clicks - a.clicks);
                const topBanners = sortedBanners.slice(0, numBannersToShow);
                setChartData(topBanners);
            });
    }, [numBannersToShow]);

    const handleSliderChange = (_event: Event, value: number | number[]) => {
        setNumBannersToShow(value as number);
    };

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2em' }}>
                <Grid item xs={8}>
                    <Box sx={{ height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                            Select Number of Popular Banners:
                        </Typography>
                        <Slider
                            value={numBannersToShow}
                            min={3}
                            max={7}
                            step={1}
                            valueLabelDisplay="auto"
                            onChange={handleSliderChange}
                            sx={{ width: '30%' }}
                        />
                        <ResponsiveContainer width="90%" height="90%" style={{ backgroundColor: '#b2dfdb', padding: '1em', borderRadius: '0.8em', border: 'solid black 0.1em' }}>
                            <BarChart
                                width={300}
                                height={300}
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 20,
                                    bottom: 30,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="bannername" tick={{ fill: '#black', fontSize: 12 }} tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value} />
                                <YAxis tick={{ fill: '#black' }} axisLine={{ stroke: 'black' }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="clicks" fill="#5e35b1" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}