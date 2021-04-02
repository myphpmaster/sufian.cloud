/*  ./components/AdminContain.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import {Bar} from 'react-chartjs-2';

const sample_data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
}

var rows = [
  { 'createdDate': '3/11/2016', 'createdBy': 'Bob' },
  { 'createdDate': '3/12/2016', 'createdBy': 'Megan' },
  { 'createdDate': '3/12/2016', 'createdBy': 'Bob' },
  { 'createdDate': '3/13/2016', 'createdBy': 'Sam' },
  { 'createdDate': '3/11/2016', 'createdBy': 'Bob' },
];

var occurences = rows.reduce(function (r, row) {
  r[row.createdBy] = ++r[row.createdBy] || 1;
  return r;
}, {});

var result = Object.keys(occurences).map(function (key) {
  return { key: key, value: occurences[key] };
});


const GetData = () => {
  
  const fetcher = url => fetch(url).then(res => res.json());
  const PAGE_SIZE = 3;
  var key = 'age';

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
      index =>
        `/api/charts?key=${key}`,
      fetcher
    );
  
  const datas = data ? [].concat(...data) : [];

  console.log(datas);

  var occurences = datas.reduce(function (r, row) {
    r = ++r || 1;
    return r;
  }, {});

  var result = Object.keys(occurences).map(function (key) {
    return { key: key, value: occurences[key] };
  });

  console.log(result);
  
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return result

};

const BarChart = () => ({
  
  displayName: 'BarChart',
  render() {

    return (
      <>
      <Bar
        data={sample_data}
        width={400}
        height={200}
        options={{
          maintainAspectRatio: false
        }}
      />
      </>
    );
  }
});

export default BarChart