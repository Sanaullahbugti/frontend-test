import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Label, LabelList, Cell } from 'recharts';

// Define a color palette
const colors = ['#FF7300', '#34AADC', '#0088FE', '#FFDC00', '#FF33FF'];

const aggregateData = (data) => {
  // Aggregate data to get the count of each overall rating
  const aggregatedData = data.reduce((acc, entry) => {
    const rating = entry.overall.toString(); // Assuming 'overall' is a numeric value
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  // Convert the aggregated data to an array of objects
  return Object.keys(aggregatedData).map((rating, index) => ({
    rating,
    count: aggregatedData[rating],
    color: colors[index % colors.length], // Assign color from the palette
  }));
};

const ReviewsPieChart = ({ data }) => {
  const aggregatedData = aggregateData(data);

  return (
    <ResponsiveContainer width={300} height={300}>
      <PieChart>
        <Pie
          data={aggregatedData}
          dataKey="count"
          nameKey="rating"
          cx="50%"
          cy="50%"
          outerRadius={100}
          labelLine={false}
        >
          {aggregatedData.map((entry) => (
            <Cell key={entry.rating} fill={entry.color} />
          ))}
          {/* <Label value="Rating Categories" position="top" /> */}
          <LabelList dataKey="rating" position="outside" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ReviewsPieChart;
