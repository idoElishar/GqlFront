import React, { useState, useEffect } from 'react';
import { Box, Grid, Slider, Typography } from '@mui/material';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Banner2 } from '../interface/interface';

export default function Statistic2() {
    const [data, setData] = useState<{ name: string; sales: number }[]>([]);
    const [itemCount, setItemCount] = useState<number>(5);

    const fetchSales = async (isTopSales: boolean) => {
        try {
            const response = await fetch('https://serverbanners.onrender.com/banners/');
            const banners: Banner2[] = await response.json();
            console.log(banners);
            const sortedBanners = isTopSales
                ? banners.sort((a, b) => b.sale - a.sale).slice(0, itemCount)
                : banners.sort((a, b) => a.sale - b.sale).slice(0, itemCount);

            const chartData = sortedBanners.map(banner => ({
                name: banner.image.alt,
                sales: banner.sale
            }));
            console.log(chartData);

            setData(chartData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {

        fetchSales(true);
    }, [itemCount]);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setItemCount(newValue as number);
    };

    return (
        <div>
            <Box sx={{ width: '100vw', height: 'auto' }}>
                <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2em' }}>
                    <Grid item xs={12} sx={{ height: '60vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ marginBottom: '1em' }}>
                            Banner Top Sales
                        </Typography>
                        <ResponsiveContainer width="80%" height="100%" style={{ backgroundColor: '#E8EAF6', padding: '1em', borderRadius: '0.8em', border: 'solid #9FA8DA 0.1em' }}>
                            <BarChart
                                width={600}
                                height={600}
                                data={data}
                                margin={{
                                    top: 10, right: 30, left: 0, bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    tickFormatter={(value) => value.length > 12 ? `${value.substring(0, 10)}...` : value}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#7986CB" />
                            </BarChart>
                        </ResponsiveContainer>
                        <Slider
                            value={itemCount}
                            onChange={handleSliderChange}
                            aria-labelledby="item-count-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={2}
                            max={7}
                            style={{ color: '#7986CB', width: '500px' }}
                        />

                        {/* <Button
                            variant="contained"
                            onClick={() => fetchSales(true)}
                            style={{ backgroundColor: '#7986CB', color: 'white' }}
                        >
                            Top Sales
                        </Button> */}
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}