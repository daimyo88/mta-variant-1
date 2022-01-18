import React, { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Pie } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
    cCont: {
        position: 'relative',
        maxWidth: '650px',
        margin: '0 auto'
    },
  }));

  const options = {
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          generateLabels(chart) {
            const data = chart.data;
              const {labels: {pointStyle}} = chart.legend.options;
  
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                const arc = meta.data[i];
                const value = meta.data[i].$context.raw;
                return {
                  text: label + ' ' + value + '%',
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  pointStyle: pointStyle,
                  hidden: !chart.getDataVisibility(i),
  
                  // Extra data used for toggling the correct item
                  index: i
                };
              });

          }
        },
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (context) => {
            return context.label + ': ' + context.parsed +  ' %';
          }
        }
      }
    }
}

const Chart = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {t} = useTranslation();
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    const dataSorted = props?.data?.all?.sort((a,b) => b.value - a.value);

    useEffect(() => {
      if(dataSorted) {
        const newLabels = [];
        const newValues = [];
        dataSorted.forEach(el => {
          newLabels.push(t(`product-groups:${el.name}`));
          newValues.push(el.value);
        });
        setLabels(newLabels);
        setValues(newValues);
      }
    },[dataSorted]);

    const data = {
      labels: labels,
      datasets: [
        {
          label: '%',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(0, 0, 0, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
        <div className={classes.cCont}>
            <Pie data={data} options= { options }/>
        </div>
    )
};

export default Chart;