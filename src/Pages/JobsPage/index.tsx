import React, { Fragment, useEffect, useState } from "react";

import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { JobCard } from "./components/Card";
import { fetchJobs } from "./components/Card/service";
import { Loading } from "../../components/LoadingSpinner";
import { fetchJobsSuccess } from "../../reducers/jobListReducer";
import { RootState } from "../../reducers";

export const Jobs: React.FC = () => {
  const dispatch = useDispatch();
  const [offset, setOffSet] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
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
      //setJobs((prev: Array<any>) => [...prev, ...response?.jdList]);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
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
