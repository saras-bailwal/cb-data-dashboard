import React from "react";
import { DataGrid, GridSlots } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { useDemoData } from "@mui/x-data-grid-generator";

const Analytics = () => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 500,
    maxColumns: 15,
  });

  return (
    <>
      <h1>Analytics</h1>
      <p>
        The bestest of data available here at your finger tips in table form.
        This could be a whole section of data that is available for users to
        deep dive further into the numbers/stats.
      </p>
      <div style={{ height: "900px", width: "100%" }}>
        <DataGrid
          slots={{
            loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
          }}
          loading={!data}
          {...data}
        />
      </div>
    </>
  );
};

export default Analytics;