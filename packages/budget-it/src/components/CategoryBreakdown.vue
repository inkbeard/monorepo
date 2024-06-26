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
    CategoryInfo,
    ExpenseList,
  } from '../types';

  ChartJS.register(ArcElement, Tooltip, Legend);

  const categoryList = inject<CategoryInfo[]>('categoryList', []);
  const expenseList = inject<ExpenseList>('expenseList', {});
  /**
   * Get the category label and the total amount for each.
   */
  const chartData = computed(() => Object.values(expenseList).reduce((acc, { categoryId, amount, isHidden }) => {
    if (isHidden) {
      return acc;
    }

    const { name, backgroundColor } = categoryList.find(({ id }) => id === categoryId)
      ?? { name: '', backgroundColor: '' };
    const categoryIndex = acc.labels.findIndex((categoryName) => name === categoryName);

    if (categoryIndex === -1) {
      acc.labels.push(name);
      acc.datasets[0].data.push(amount);
      acc.datasets[0].backgroundColor.push(backgroundColor);
    } else {
      acc.datasets[0].data[categoryIndex] += amount;
    }

    return acc;
  }, {
    labels: [] as string[],
    datasets: [{
      data: [] as number[],
      backgroundColor: [] as string[],
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
    Category Breakdown
  </h2>
  <Pie
    :data="chartData"
    :options="chartOptions as any"
  />
</template>
