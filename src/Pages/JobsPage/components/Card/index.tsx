import React, { memo } from "react";
import { EstimatedSalary } from "./Salary";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
  companyName: string;
  logoUrl: string;
  jobRole: string;
  location: string;
  salaryCurrencyCode: string;
  maxJdSalary: number | null;
  minJdSalary: number | null;
  jobDetailsFromCompany: string;
}

export const JobCard: React.FC<Props> = memo(
  ({
    companyName = "",
    logoUrl = "",
    jobRole = "",
    location = "",
    salaryCurrencyCode = "",
    maxJdSalary = null,
    minJdSalary = null,
    jobDetailsFromCompany = "",
  }) => {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 50, height: 50 }}
              image={logoUrl}
              alt={companyName}
            />
            <Box sx={{ ml: 1 }}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {companyName}
              </Typography>
              <Typography
                sx={{ fontSize: 16 }}
                color="text.primary"
                gutterBottom
              >
                {jobRole}
              </Typography>
              <Typography
                sx={{ fontSize: 12 }}
                color="text.primary"
                gutterBottom
              >
                {location}
              </Typography>
            </Box>
          </Box>
          <EstimatedSalary
            salaryCurrencyCode={salaryCurrencyCode}
            maximumSalary={maxJdSalary}
            minimumSalary={minJdSalary}
          />
          <Typography sx={{ fontSize: 16 }} color="text.primary">
            {"About Company:"}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.primary" fontWeight="bold" gutterBottom>
            {"About us"}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.primary">
            {jobDetailsFromCompany}
          </Typography>
        </CardContent>
      </Card>
    );
  }
);
