import React, { Fragment, useEffect, useRef, useState } from "react";
import { data } from "./data";
import { Container, Grid } from "@mui/material";
import { JobCard } from "./components/Card";
import { fetchJobs } from "./components/Card/service";
import { Loading } from "../../components/LoadingSpinner";

export const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Array<any>>([]);
  const mainRef = useRef<HTMLDivElement>(null);
  console.log("---", jobs);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffSet] = useState<number>(0);
  console.log("---offset", offset);

  useEffect(() => {
    getJobList();
  }, []);

  const handleScroll = (event: any) => {
    const element = event.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.clientHeight - element.scrollTop
      ) < 1
    ) {
      setOffSet((prev: number) => prev + 1);
    }
  };

  useEffect(() => {
    const mainElement = mainRef.current;
    console.log("--",mainElement);
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
      return () => {
        mainElement.removeEventListener("scroll", handleScroll);
      };
    } else {
      console.error("Main element not found.");
    }
  }, []);

  const getJobList = async () => {
    setLoading(true);
    try {
      const response: Awaited<{ jdList: Array<any>; totalCount: number }> =
        await fetchJobs(12, 0);
      setJobs((prev: Array<any>) => [...prev, ...response?.jdList]);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={mainRef}>
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
        {loading && <Loading />}
      </Grid>
    </div>
  );
};
