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
        <div className="container-button flex "> 
            { <div className="mr-4"> 
                <img src={logo} alt="Your Logo" className="h-25 w-36" /> 
            </div>}
           

            
            <div className=''>
                <Button
                    variant="contained"
                    color="secondary"
                    className="p-4 "
                    onClick={handleCreateInvoiceClick}
                >
                    Create Invoice
                </Button>
                <br/><br/>
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