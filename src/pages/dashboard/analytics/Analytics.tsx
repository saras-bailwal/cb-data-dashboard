import React from "react";
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDemoData } from "@mui/x-data-grid-generator";
import { Box } from "@mui/material";

const Analytics = () => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 500,
    editable: true,
  });

  return (
    <>
      <h1>Analytics</h1>
      <p>
        The bestest of data available here at your finger tips in table form.
        This could be a whole section of data that is available for users to
        deep dive further into the numbers/stats.
      </p>
      <Box sx={{ height: 520, width: '100%' }}>
      <DataGridPro
        {...data}
        loading={data.rows.length === 0}
        rowHeight={38}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </>
  );
};

export default Analytics;