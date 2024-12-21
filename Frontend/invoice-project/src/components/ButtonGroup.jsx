/* eslint-disable no-unused-vars */
import { Button } from '@mui/material';
import React, { useState } from 'react';
import InvoiceSystem from '../invoice/InvoiceSystem';
import BuyerListView from '../invoice/BuyerListView';
import logo from '../assets/salvi-globalLogo.png'; 

const ButtonGroup = () => {
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [showInvoiceList, setShowInvoiceList] = useState(false);

    const handleCreateInvoiceClick = () => {
        setShowCreateInvoice(true);
        setShowInvoiceList(false);
    };

    const handleInvoiceListClick = () => {
        setShowInvoiceList(true);
        setShowCreateInvoice(false);
    };
    return (
        <div className="container-button block ml-12"> 
            <div className="static"> 
                <img src={logo} alt="Your Logo" className="-ml-49 h-25 w-36" /> 
            </div>
           

            
            <div className="mt-4 flex items-center space-x-4 ml-5">
        <Button
            variant="contained"
            color="secondary"
            className="p-4"
            onClick={handleCreateInvoiceClick}
        >
            Create Invoice
        </Button>

        <Button
            variant="contained"
            color="primary"
            className="p-4"
            onClick={handleInvoiceListClick}
        >
            Invoice List
        </Button>
    </div>

          
            {showCreateInvoice && <InvoiceSystem />}
            {showInvoiceList && <BuyerListView />}
        </div>
    );
};

export default ButtonGroup;