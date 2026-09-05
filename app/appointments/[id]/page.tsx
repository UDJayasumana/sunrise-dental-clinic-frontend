"use client";

import { AppointmentCard } from '@/components/appointments/appointment-card';
import { 
  Box, 
  Typography, 
  Divider, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Grid 
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import { notFound, useParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppointmentStore } from '@/lib/store/appointmentStore';
import { formatDate } from '@/utils/utility.utils';
import { AppointmentCategory, DentistName } from '@/types/appointment.types';
import { number } from 'zod';


const dentistRates = {
  [DentistName.DR_ANNESLEY_GOMES]: { 
    description: DentistName.DR_ANNESLEY_GOMES + " Fee",
    hours: 1, 
    rate: 2200.00, 
    total: 2800.00 
  },
  [DentistName.DR_E_ANIL_SALGADO]: { 
    description: DentistName.DR_E_ANIL_SALGADO + " Fee",
    hours: 1, 
    rate: 3500.00, 
    total: 3900.00 
  },
  [DentistName.DR_S_KANAGARAYAN]: { 
    description: DentistName.DR_S_KANAGARAYAN + " Fee",
    hours: 1, 
    rate: 5300.00, 
    total: 6000.00 
  },
};

const treatmentRates = {
  [AppointmentCategory.BRIDGES]:{
    description: AppointmentCategory.BRIDGES + " Fee",
    hours: 1, 
    rate: 1000.00, 
    total: 1500.00 
  },
  [AppointmentCategory.CROWNS]:{
    description: AppointmentCategory.CROWNS + " Fee",
    hours: 1, 
    rate: 800.00, 
    total: 1100.00 
  },
  [AppointmentCategory.DENTAL_CLEANINGS]:{
    description: AppointmentCategory.DENTAL_CLEANINGS + " Fee",
    hours: 1, 
    rate: 3500.00, 
    total: 4100.00 
  },
  [AppointmentCategory.DENTAL_IMPLANTS]:{
    description: AppointmentCategory.DENTAL_IMPLANTS + " Fee",
    hours: 1, 
    rate: 2800.00, 
    total: 3400.00 
  },
  [AppointmentCategory.DENTAL_SEALANTS]:{
    description: AppointmentCategory.DENTAL_SEALANTS + " Fee",
    hours: 1, 
    rate: 3100.00, 
    total: 3500.00 
  },
  [AppointmentCategory.DENTURES]:{
    description: AppointmentCategory.DENTURES + " Fee",
    hours: 1, 
    rate: 6400.00, 
    total: 7800.00 
  },
  [AppointmentCategory.EXAMINATIONS_AND_XRAY]:{
    description: AppointmentCategory.EXAMINATIONS_AND_XRAY + " Fee",
    hours: 1, 
    rate: 800.00, 
    total: 1500.00 
  },
  [AppointmentCategory.FILLINGS]:{
    description: AppointmentCategory.FILLINGS + " Fee",
    hours: 1, 
    rate: 8000.00, 
    total: 9400.00 
  },
  [AppointmentCategory.FLUORIDE_TREATMENTS]:{
    description: AppointmentCategory.FLUORIDE_TREATMENTS + " Fee",
    hours: 1, 
    rate: 2950.00, 
    total: 3540.00 
  },
}

const billItems = [
  { id: 1, description: 'Initial Consultation Fee', hours: 1, rate: 150.00, total: 150.00 },
  { id: 2, description: 'Diagnostic Blood Panel', hours: 1, rate: 85.00, total: 85.00 },
  { id: 3, description: 'Follow-up Care Plan', hours: 1, rate: 50.00, total: 50.00 },
  {id: 1, description: 'Dental Cleanings Plan', hours: 1, rate: 3500.00, total: 4000.00}
];

const ViewBill = () => {

  const params = useParams();

  const rawId = params?.id;
  const appoId = Array.isArray(rawId) ? rawId[0] : rawId;

  const { appointment, fetchAppointmentByAppoNum} = useAppointmentStore();

  console.log(appoId)

  const handleNote = useCallback(()=>{
    if(appoId)
    {
      fetchAppointmentByAppoNum(appoId);
    }
  },[fetchAppointmentByAppoNum, appoId])

  useEffect(()=>{
    handleNote();
  },[]);
  

      useEffect(()=>{
        console.log(appointment)
      },[appointment]);


  

  const billRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  //const subtotal = billItems.reduce((acc, item) => acc + item.total, 0);
  const doctorFee    = appointment?.dentist ? dentistRates[appointment.dentist]?.total  : 0;
  const treatmentFee = appointment?.treatmentType ? treatmentRates[appointment.treatmentType]?.total : 0;
  const subtotal =  doctorFee + treatmentFee;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + tax;



  // Handle Print Function
  const handlePrint = () => {
    window.print();
  };

  // Handle PDF Download Function
  const handleDownloadPDF = async () => {
    if (!billRef.current) return;
    
    setIsDownloading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      // Capture the bill element as a canvas
      const canvas = await html2canvas(billRef.current, {
        scale: 2, // Increases quality/resolution
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Initialize jsPDF (A4 size profile)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('Invoice-INV-2026-089.pdf');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      {/* Global CSS style to hide unwanted layout elements during standard window.print() */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-bill, #printable-bill * {
            visibility: visible;
          }
          #printable-bill {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <AppointmentCard>
        {/* We attach the ref and ID here so it can be targeted for print and PDF generation */}
        <Box ref={billRef} id="printable-bill" sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.paper' }}>
          
          {/* Header Section */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <ReceiptIcon color="primary" sx={{ fontSize: '2rem' }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Invoice / Bill
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Invoice #: { appointment?.appoNum}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Patient & Appointment Details */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Billed To:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{appointment?.patientName}</Typography>
              <Typography variant="body2" color="text.secondary">{appointment?.address}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
              <Typography variant="subtitle2" color="text.secondary">Date Issued:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{formatDate(appointment?.appoDateTime)}</Typography>
              <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                Status: Paid
              </Typography>
            </Grid>
          </Grid>

          {/* Line Items Table */}
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: 'action.hover' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Qty</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Rate</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{appointment?.dentist ? dentistRates[appointment.dentist]?.description : "N/A"}</TableCell>
                  <TableCell align="right">{appointment?.dentist ? dentistRates[appointment.dentist]?.hours : "N/A"}</TableCell>
                  <TableCell align="right">{appointment?.dentist ? dentistRates[appointment.dentist]?.rate.toFixed(2) : "N/A"}</TableCell>
                  <TableCell align="right">{appointment?.dentist ? dentistRates[appointment.dentist]?.total.toFixed(2) : "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{appointment?.treatmentType ? treatmentRates[appointment.treatmentType]?.description : "N/A"}</TableCell>
                  <TableCell align="right">{appointment?.treatmentType ? treatmentRates[appointment.treatmentType]?.hours : "N/A"}</TableCell>
                  <TableCell align="right">{appointment?.treatmentType ? treatmentRates[appointment.treatmentType]?.rate.toFixed(2) : "N/A"}</TableCell>
                  <TableCell align="right">{appointment?.treatmentType ? treatmentRates[appointment.treatmentType]?.total.toFixed(2) : "N/A"}</TableCell>
                </TableRow>
                {/* {billItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell align="right">{item.hours}</TableCell>
                    <TableCell align="right">${item.rate.toFixed(2)}</TableCell>
                    <TableCell align="right">${item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Totals Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
              <Typography variant="body2" color="text.secondary">Subtotal:</Typography>
              <Typography variant="body2">Rs. {subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
              <Typography variant="body2" color="text.secondary">Tax (5%):</Typography>
              <Typography variant="body2">Rs. {tax.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ width: '250px', my: 0.5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total:</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Rs. {grandTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons (Hidden during print) */}
          <Box className="no-print" sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Print Bill
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadPDF}
              disabled={isDownloading}
            >
              {isDownloading ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          </Box>

        </Box>
      </AppointmentCard>
    </>
  );
};

export default ViewBill;