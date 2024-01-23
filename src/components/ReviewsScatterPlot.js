import React from 'react';
import { Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReviewsScatterPlot = ({ data }) => {
  console.log("data",data)
  return (
    <ResponsiveContainer width="100%" height={300}>
      <Scatter
        width={500}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="reviewerName" />
        <YAxis dataKey="overall" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
      </Scatter>
    </ResponsiveContainer>
  );
};

export default ReviewsScatterPlot;
