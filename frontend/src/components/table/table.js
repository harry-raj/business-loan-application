import React from 'react'

import CloseIcon from '@mui/icons-material/Close';
import {Table, TableBody, TableContainer, TableHead, TableRow, Button, Paper, TableCell, DialogTitle, Dialog } from '@mui/material';


const SheetTable = ({ isSheet, setIsSheet, setApiResponse, setCustomerDetails, handleClose }) => {

    const formSubmit = () => {
        const { approvedLoanAmount, businessEstablishmentYear, businessName, preAssessment, profitOrLossSum, loanAmount } = isSheet?.loanData;

        setApiResponse({
            type: 'success',
            isOpen: true,
            message: preAssessment,
        });
        setCustomerDetails({
            'Business Name': businessName,
            'Business Establishment Year': businessEstablishmentYear,
            'Loan Amount': `$ ${loanAmount.toLocaleString()}`,
            'Approved': `${preAssessment}%`,
            'Approved Amount': `$ ${approvedLoanAmount.toLocaleString()}`,
            'Profit Or Loss': `$ ${profitOrLossSum.toLocaleString()}`,
        });
        setIsSheet({
            isOpen: '',
            sheetData: [],
            loanData: isSheet?.loanData
        });
    };

    return (
        <Dialog open={isSheet?.isOpen && isSheet?.sheetData?.length > 0} onClose={handleClose}>
            <div className="table-heading">
                <DialogTitle className="table-title">Sheet</DialogTitle>
                <CloseIcon onClick={handleClose}/>
            </div>

            {isSheet?.sheetData?.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className="table-cell-key">
                                    Year
                                </TableCell>
                                <TableCell align="center" className="table-cell-key">
                                    Month
                                </TableCell>
                                <TableCell align="center" className="table-cell-key">
                                    Profit Or loss
                                </TableCell>
                                <TableCell align="center" className="table-cell-key">
                                    Assets Value
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isSheet?.sheetData?.map((sheet) => {
                                return (
                                    <TableRow>
                                        <TableCell align="center" className="table-cell-value">
                                            {sheet?.year}
                                        </TableCell>
                                        <TableCell align="center" className="table-cell-value">
                                            {sheet?.month}
                                        </TableCell>
                                        <TableCell align="center" className={`table-cell-value ${sheet?.profitOrLoss > 0 ? "profit-text-color" : "loss-text-color"}`}>
                                            $ {sheet?.profitOrLoss?.toLocaleString()}
                                        </TableCell>
                                        <TableCell align="center" className="table-cell-value">
                                            $ {sheet?.assetsValue?.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <div className="submit-button">
                <Button variant="contained" onClick={formSubmit}>
                    Submit
                </Button>
            </div>
        </Dialog>
    );
};

export default SheetTable;