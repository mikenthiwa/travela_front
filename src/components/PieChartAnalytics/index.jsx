import React, { Fragment } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import PropTypes from 'prop-types';

export const renderCustomizedLabel = (
  { cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (radius + 10) * cos;
  const sy = cy + (outerRadius - 10) * sin;
  const mx = cx + (outerRadius + 5) * cos;
  const my = cy + (outerRadius + 5) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 2;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#4F4F4F"
        fill="none" strokeDasharray="5,1" />
      <circle cx={ex} cy={ey} r={2} fill="#4F4F4F" stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 4} y={ey} textAnchor={textAnchor}
        fill="#4F4F4F" className="label">
        {`${(percent * 100).toFixed(2)}% [${name}]`}
      </text>
    </g>
  );
};

const PieChartAnalytics = ({data, color, error }) => (
  <Fragment>
    {error 
      ? (
        <p className="dashboard-component__error-text--style">
            Oops! An error occurred in retrieving this data
        </p>
      )
      : (data.length > 0 && data[0].name !== '') ? (
        <PieChart width={300} height={200}>
          <Pie
            isAnimationActive={false}
            data={data} cx={145} cy={75}
            outerRadius={50} fill="#8884d8"
            label={renderCustomizedLabel}
            labelLine={false}
            dataKey="value"
          >
            {
              data.map((entry) => {
                const maxLightness = 90;
                const minLightness = 50;
                const lightnessRange = maxLightness - minLightness;

                const entries = data.slice().sort((a, b) => b.value - a.value);
                const maxEntryValue = entries[0].value;
                const minEntryValue = entries[entries.length - 1].value;

                let lightnessDiff = lightnessRange / (maxEntryValue - minEntryValue);
                lightnessDiff = isFinite(lightnessDiff) ? lightnessDiff : 0;
                const lightness = ((maxEntryValue - entry.value) * lightnessDiff) + 50;
                return color === 'orange' ?
                  <Cell key={color} fill={`hsl(226, 70%, ${lightness}%)`} /> :
                  <Cell key={color} fill={`hsl(37, 99%, ${lightness}%)`} />;
              })
            }
          </Pie>
        </PieChart>
      ) : (
        <div className="chart-data">
          <p className="no-chart">No data to display</p>
        </div>
      )}
  </Fragment>
);

renderCustomizedLabel.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  midAngle: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  percent: PropTypes.number,
  name: PropTypes.string
};

renderCustomizedLabel.defaultProps = {
  cx: 34,
  cy: 34,
  midAngle: 8,
  percent: 0.0,
  name: 'test',
  innerRadius: 13,
  outerRadius: 23,
};

PieChartAnalytics.propTypes = {
  data: PropTypes.array,
  color: PropTypes.string,
  error: PropTypes.string,
};

PieChartAnalytics.defaultProps = {
  data: [],
  color: '',
  error: '',
};

export default  PieChartAnalytics;
