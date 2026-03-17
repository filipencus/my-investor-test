import GenericTable from "../components/generic-table/Table";
import { useQuery } from '@tanstack/react-query';

const fetchFunds = async () => {
  const response = await fetch('http://localhost:3000/funds');
  const data = await response.json(); 
  return data;
};

export default function FundsPage() {
   const { data, isLoading, isError, error } = useQuery({
    queryKey: ['funds'],
    queryFn: fetchFunds,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1>Funds Page</h1>
      <GenericTable data={data} />
    </>
  );
}