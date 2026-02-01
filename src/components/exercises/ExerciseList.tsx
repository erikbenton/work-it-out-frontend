import { DataGrid, type GridColDef, type GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import type Exercise from '../../types/exercise';
import { useQuery } from '@tanstack/react-query';
import { getExerciseList } from '../../requests/exercises';
import { Box } from '@mui/material';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import LoadingMessage from '../layout/LoadingMessage';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'equipment', headerName: 'Equipment', width: 130 },
  { field: 'bodyPart', headerName: 'Body Part', width: 130 },
];

const handleRowClick = (navigate: NavigateFunction) => {
  return (params: GridRowParams) => {
    navigate(`/exercises/${params.row.id}`);
  }
}

export default function ExerciseList() {
  const navigate = useNavigate();
  const { data: exercises, isLoading } = useQuery<Exercise[]>({
    queryKey: ['exercises'],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: getExerciseList
  });

  if (isLoading) {
    return (<LoadingMessage dataName='exercises' />);
  }

  return (
    <Box className="w-full md:w-2/3 px-3">
      <Paper sx={{ width: '100%' }}>
        <DataGrid
          rows={exercises ?? []}
          columns={columns}
          autoHeight
          sx={{ border: 0 }}
          onRowClick={handleRowClick(navigate)}
        />
      </Paper>
    </Box>
  );
}