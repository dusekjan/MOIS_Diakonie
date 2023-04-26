import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


function Chart({data}) {

    return (
        <>
            <h3>Sledování všech darů v čase:</h3>
            <div>
                <ResponsiveContainer width="95%" height={400}>
                    <LineChart width={600} height={300} data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="createdAt" />
                      <YAxis width={80} />
                      <Tooltip />
                      <Line name="Cena" type="monotone" dataKey="price" stroke="#009ee0" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default Chart;