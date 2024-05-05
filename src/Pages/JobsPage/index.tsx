import React, { Fragment, useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { RootState } from "../../reducers";
import { JobCard } from "./components/Card";
import { fetchJobs } from "./components/Card/service";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/LoadingSpinner";
import { fetchJobsSuccess } from "../../reducers/jobListReducer";

export const Jobs: React.FC = () => {
  const dispatch = useDispatch();
  const [offset, setOffSet] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>();
  const [experience, setExperience] = useState<number>();
  const { jobs } = useSelector((state: RootState) => state.jobList);

  useEffect(() => {
    getJobList();
  }, [offset]);

  useEffect(() => {
    const handleScroll = (): void => {
      const windowHeight: number = window.innerHeight;
      const documentHeight: number = document.documentElement.scrollHeight;
      const scrollTop: number =
        window.scrollY ||
        document.body.scrollTop + (document.documentElement.scrollTop || 0);
      // Check if the user has scrolled to the end of the page
      if (windowHeight + scrollTop >= documentHeight) {
        setOffSet((prev: number) => prev + 1);
      }
    };
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getJobList = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: Awaited<{ jdList: Array<any>; totalCount: number }> =
        await fetchJobs(12, offset);
      dispatch(fetchJobsSuccess(response?.jdList));
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <FormControl>
            <InputLabel id="role-select-label">{"Role"}</InputLabel>
            <Select
              labelId="role-select-label"
              placeholder="Select Role"
              onChange={(e: SelectChangeEvent) =>
                setSelectedRole(e.target.value)
              }
              disabled={loading}
              label="Role"
              defaultValue=""
              value={selectedRole}
              style={{ backgroundColor: "white", width: "200px" }}
            >
              <MenuItem value={"All"}>{"All"}</MenuItem>
              {Array.from(
                new Map(
                  jobs?.map((jobData: any) => [jobData?.jobRole, jobData])
                ).values()
              )?.map((jobData: any) => {
                return (
                  <MenuItem key={jobData?.jdUid} value={jobData?.jobRole}>
                    {jobData?.jobRole}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ ml: 1 }}>
            <TextField
              type="number"
              id="outlined-basic"
              label="Experience"
              variant="outlined"
              value={experience}
              onChange={(e: any) => {
                setExperience(e?.target?.value);
              }}
            />
          </FormControl>
        </Box>
        <Button variant="contained" color="secondary">
          {"Reset Filters"}
        </Button>
      </Box>
      <Grid container spacing={3} sx={{ p: 2 }}>
        {jobs?.length > 0 && (
          <Fragment>
            {jobs?.map((jobData: any) => {
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
                    minExp={jobData?.minExp}
                    jobLink={jobData?.jdLink}
                  />
                </Grid>
              );
            })}
          </Fragment>
        )}
      </Grid>
      {loading && <Loading />}
    </Fragment>
  );
};
