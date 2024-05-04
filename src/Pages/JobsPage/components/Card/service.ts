import axios, { AxiosResponse } from "axios";

export const fetchJobs = async (
  limit: number,
  offset: number
): Promise<any> => {
  const response: Awaited<AxiosResponse> = await axios({
    method: "POST",
    url: "https://api.weekday.technology/adhoc/getSampleJdJSON",
    data: { limit, offset },
  });
  return response?.data;
};
