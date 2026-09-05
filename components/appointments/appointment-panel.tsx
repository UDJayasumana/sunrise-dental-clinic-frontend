import { Appointment } from '@/types/appointment.types';
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AppointmentFilterPanel from './appointment-filter-panel';
import AppointmentPanelRow from './appointment-panel-row';
import { useAppointmentStore } from '@/lib/store/appointmentStore';

interface AppointmentPanelProps {
    data: Appointment[];
    appointmentCount: number;
    updatePage: (searchTerm: string) => void;
    onNewAppointment: () => void;
    OnViewAppointment: (noteId: string) => void;
    onDeleteAppointment: (noteId: string) => void;
  }

const AppointmentPanel: React.FC<AppointmentPanelProps> = ({
    data,
    appointmentCount,
    updatePage,
    onNewAppointment,
    OnViewAppointment,
    onDeleteAppointment
}) => {
    const rowsPerPage = 5;
    
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

     const { fetchAppointments} = useAppointmentStore();



    const handlePageChange = useCallback(
        (_: React.ChangeEvent<unknown>, value: number) => {
          setPage(value);
        },
        []
      );

      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };

      const pageCount = useMemo(() => {
        const pCount = Math.ceil(appointmentCount / rowsPerPage);
        return pCount;
      }, [appointmentCount, rowsPerPage]);
    
      useEffect(() => {
        if (page > pageCount) {
          // Defer state update to next tick
          const id = setTimeout(() => {
            setPage(pageCount);
          }, 0);
          return () => clearTimeout(id);
        }
      }, [pageCount, page]);

      const handleUpdatePage = useCallback(() => {
        updatePage(searchTerm);
      }, [searchTerm, updatePage]);
    
      useEffect(() => {
        handleUpdatePage();
      }, [handleUpdatePage]);

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
        <AppointmentFilterPanel onSearch={handleSearch} onNewAppointment={onNewAppointment} />

        <TableContainer sx={{ height: 500, maxHeight: 500 }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead
            sx={{
              "& .MuiTableCell-root": {
                backgroundColor: "background.paper",
                fontWeight: 600,
              },
            }}
          >
            <TableRow>
              <TableCell />
              {/* <TableCell>Note ID</TableCell> */}
              <TableCell>Appointment Num</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Contact Num</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row) => (
                <AppointmentPanelRow
                  key={row.appoNum}
                  row={row}
                  onAppointmentView={OnViewAppointment}
                  onAppointmentDelete={onDeleteAppointment}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Fixed Footer */}
      {/* <Stack
        spacing={2}
        direction="row"
        sx={{ mt: 2, mb: 1 }}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Typography variant="body2" color="text.secondary">
          Page {page} of {pageCount}
        </Typography>

        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </Stack> */}
    </Paper>
  )

}

export default AppointmentPanel