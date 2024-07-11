<template>
  <LineChart :chartData="dataComputed" :options="optionsComputed" />
</template>

<script>
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const colors = [
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#78716c",
  "#ea5d0c",
  "#1e78d1",
  "#50c677",
  "#c92b94",
  "#4f46e5",
  "#c026d3",
];

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  name: "ChartLine",
  components: { LineChart },

  computed: {
    dataComputed() {
      let colorsTmp = this.options?.colors || colors;
      return {
        labels: this.data.labels,
        datasets: this.data.datasets.map((row, index) => ({
          pointBorderColor: colorsTmp[index],
          label: row.label,
          data: row.vals,
          borderColor: colorsTmp[index],
          backgroundColor: colorsTmp[index],
        })),
      };
    },
    optionsComputed() {
      return {
        hoverBorderWidth: "3",
        pointRadius: [0],
        pointHoverRadius: [5],
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: this.title,
          },
        },
      };
    },
  },
};
</script>
