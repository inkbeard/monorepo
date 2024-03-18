<script setup lang="ts">
  import { computed, inject } from 'vue';
  import { Pie } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
  import type {
    ExpenseList,
    SourceList,
  } from '../types';

  ChartJS.register(ArcElement, Tooltip, Legend);
  const expenseList = inject<ExpenseList>('expenseList', {});
  const sourceList = inject<SourceList>('sourceList', {});
  /**
   * Get the source name and the total amount for each.
   */
  const chartData = computed(() => Object.values(expenseList).reduce((acc, { sourceId, amount }) => {
    const sourceIndex = acc.labels.findIndex((sourceName) => sourceList[sourceId] === sourceName);

    if (sourceIndex === -1) {
      acc.labels.push(sourceList[sourceId]);
      acc.datasets[0].data.push(amount);
    } else {
      acc.datasets[0].data[sourceIndex] += amount;
    }

    return acc;
  }, {
    labels: [] as string[],
    datasets: [{
      data: [] as number[],
      backgroundColor: [
        '#b30000',
        '#7c1158',
        '#4421af',
        '#1a53ff',
        '#0d88e6',
        '#00b7c7',
        '#5ad45a',
        '#8be04e',
        '#ebdc78',
      ],
    }],
  }));
  const chartOptions = {
    borderWidth: 1,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label({ formattedValue = '' }) {
            return `$${formattedValue}`;
          },
        },
      },
    },
  };
</script>

<template>
  <h2 class="font-size-h5">
    Sources cost breakdown
  </h2>
  <Pie
    :data="chartData"
    :options="chartOptions as any"
  />
</template>
