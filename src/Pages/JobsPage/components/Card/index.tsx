import React, { Fragment, memo, useState } from "react";
import { EstimatedSalary } from "./Salary";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Link,
  Typography,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

interface Props {
  minExp: number;
  logoUrl: string;
  jobRole: string;
  location: string;
  companyName: string;
  salaryCurrencyCode: string;
  maxJdSalary: number | null;
  minJdSalary: number | null;
  jobDetailsFromCompany: string;
  jobLink:string;
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
    jobLink="",
    minExp = 0,
  }) => {
    const [collapseJobInfo, setCollapse] = useState<boolean>(false);

    return (
      <Card>
        <CardContent
          sx={{
            minHeight: "450px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
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
          <Typography
            sx={{ fontSize: 14 }}
            color="text.primary"
            fontWeight="bold"
            gutterBottom
          >
            {"About us"}
          </Typography>
          <Collapse in={collapseJobInfo} collapsedSize={75}>
            <Typography sx={{ fontSize: 14 }} color="text.primary">
              {jobDetailsFromCompany}
            </Typography>
          </Collapse>
          <Box sx={{ textAlign: "center", m: 1 }}>
            <Link
              underline="hover"
              onClick={() => {
                setCollapse((prev: boolean) => !prev);
              }}
            >
              {collapseJobInfo ? "Show Less" : "Know More"}
            </Link>
          </Box>
          {minExp != null && (
            <Fragment>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {"Minimum Experience"}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.primary"
                gutterBottom
              >
                {`${minExp} Years`}
              </Typography>
            </Fragment>
          )}
          <Box>
            <Button
              variant="contained"
              startIcon={<BoltIcon sx={{ color: "#fde79e" }} />}
              sx={{ width: "100%", backgroundColor: "#54efc2", color: "black" }}
              href={jobLink}
            >
              {"Easy Apply"}
            </Button>
            <Button
              variant="contained"
              startIcon={<PeopleAltIcon/>}
              sx={{ width: "100%", mt: 1, backgroundColor: "#4a43d9" }}
            >
              {"Unlock Referral asks"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }
);
