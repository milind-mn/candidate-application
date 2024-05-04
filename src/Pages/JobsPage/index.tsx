import React from "react";
import { data } from "./data";
import { Grid } from "@mui/material";
import { JobCard } from "./components/Card";

export const Jobs: React.FC = () => {

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {data?.jdList?.map((jobData: any) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={jobData?.jdUid}>
            <JobCard
              logoUrl={jobData?.logoUrl}
              jobRole={jobData?.jobRole}
              location={jobData?.location}
              companyName={jobData?.companyName}
              maxJdSalary={jobData?.maxJdSalary}
              minJdSalary={jobData?.minJdSalary}
              salaryCurrencyCode={jobData?.salaryCurrencyCode}
              jobDetailsFromCompany={jobData?.jobDetailsFromCompany}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
