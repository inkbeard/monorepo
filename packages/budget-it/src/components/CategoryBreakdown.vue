<script setup lang="ts">
  import { computed, inject } from 'vue';
  import { DoughnutChart } from 'vue-chart-3';
  import { Chart, registerables } from 'chart.js';
  import type {
    CategoryInfo,
    ExpenseList,
  } from '../types';

  Chart.register(...registerables);

  const categoryList = inject<CategoryInfo[]>('categoryList', []);
  const expenseList = inject<ExpenseList>('expenseList', {});
  /**
   * Get the category label and the total amount for each.
   */
  const categoryBreakdown = computed(() => Object.values(expenseList).reduce((acc, { categoryId, amount }) => {
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
</script>

<template>
  <h2 class="font-size-h5">
    Category Breakdown
  </h2>
  <DoughnutChart :chart-data="categoryBreakdown" />
</template>
