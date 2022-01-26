import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
    cCont: {
        position: 'relative',
    },
  }));

const options = {
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (context) => {
            return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + ' €';
          }
        }
      }
    },
    scales: {
        x: {
            ticks: {
                display: false
            }
        },
        y: {
          ticks: {
              callback: function(value, index, values) {
                  return value + ' €';
              }
          }
      }
    }
};

const LineChart = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {t} = useTranslation();

    const data = {
        labels: props.data.labels,
        datasets: [
          {
            label: t('translation:average-prices'),
            data: props.data.all,
            fill: false,
            backgroundColor: '#5289B5',
            borderColor: '#5289B5',
            spanGaps: true
          },
          {
            label: t('translation:my-prices'),
            data: props.data.user,
            fill: false,
            backgroundColor: '#33576b',
            borderColor: '#33576b',
            spanGaps: true
          },
        ],
      };

    return (
        <div className={classes.cCont}>
            <Line data={data} options={options} />
        </div>
    )
};

export default LineChart;