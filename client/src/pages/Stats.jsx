import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';


export const loader = async () => {

  try{
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  } catch {
    throw new Response('Error fetching stats', { status: 500 });
  }
}

const Stats = () => {
  const { monthlyApplications, defaultStats } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {
        monthlyApplications?.length>1 && (
          <ChartsContainer
            data={monthlyApplications}
          />
        )
      }
    </>
    )
}

export default Stats