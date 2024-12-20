/* eslint-disable react/prop-types */
import { Dialog, DialogContent } from '@mui/material';
import { ArrowLeft, Printer, RefreshCcw, RefreshCw, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';


const BuyerListView = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    const filtered = invoices.filter(invoice =>
      invoice.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInvoices(filtered);
  }, [searchTerm, invoices]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/invoices/viewall');
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const data = await response.json();
      setInvoices(data);
      setFilteredInvoices(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (invoice) => {
    const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
    const cgstAmount = subtotal * (invoice.cgstRate / 100);
    const sgstAmount = subtotal * (invoice.sgstRate / 100);
    return subtotal + cgstAmount + sgstAmount;
  };

  const handlePrint = () => {
    window.print();
  };

  // eslint-disable-next-line react/prop-types
  const InvoiceDetails = ({ invoice, onReturn }) => {
    const handlePrint = () => {
      window.print();
    };
  
    const calculateTotal = (invoice) => {
      const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
      const cgstAmount = subtotal * (invoice.cgstRate / 100);
      const sgstAmount = subtotal * (invoice.sgstRate / 100);
      return (subtotal + cgstAmount + sgstAmount).toFixed(2);
    };
  
   
    const numberToWords = (num) => {
   
      return `Rupees ${num} Only`;
    };
  
    return (
      <div className="p-8 bg-white print:p-4 font-light">
        
        <div className="text-center border-b pb-4">
          <h1 className="text-3xl font-bold mb-4">INVOICE</h1>
          <h2 className="text-2xl font-bold mb-2">Salvi Global</h2>
          <p className="mb-1">303 A, Gold Cost, Kutwal Colony,</p>
          <p className="mb-1">Shiv Colony, Sathe Vasti,</p>
          <p className="mb-1">Lohgaon, Pune. 411047</p>
          <p className="mb-1">GSTIN/UIN: {invoice.supplierGSTIN}</p>
          <p>IEC CODE: CRJPS4539J</p>
        </div>
  
      
        <div className="grid grid-cols-2 gap-4 my-4 text-sm">
          <div className="grid grid-cols-3">
            <p className="font-semibold">Invoice No</p>
            <p className="col-span-2">{invoice.invoiceNo}</p>
            
            <p className="font-semibold">Suppliers Ref</p>
            <p className="col-span-2">SG - {invoice.invoiceNo}</p>
            
            <p className="font-semibold">Other References</p>
            <p className="col-span-2">NA</p>
          </div>
          
          <div className="grid grid-cols-3">
            <p className="font-semibold">Date</p>
            <p className="col-span-2">{new Date(invoice.date).toLocaleDateString()}</p>
            
            <p className="font-semibold">Mode/Terms Of Payment</p>
            <p className="col-span-2">Within 30 days</p>
          </div>
        </div>
  
    
        <div className="my-4 border-t border-b py-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">Buyer</p>
              <p>{invoice.buyerName}</p>
              <p className="whitespace-pre-line">{invoice.buyerAddress}</p>
              <p>GSTIN/UIN: {invoice.buyerGSTIN}</p>
            </div>
            <div className="grid grid-cols-3">
           
              
              <p className="font-semibold">Dated</p>
              <p className="col-span-2">{new Date(invoice.date).toLocaleDateString()}</p>
              
              <p className="font-semibold">Despatched Through</p>
              <p className="col-span-2">By Hand</p>
              
              <p className="font-semibold">Destination</p>
              <p className="col-span-2">Pune</p>
            </div>
          </div>
        </div>
  
        
        <table className="w-full text-sm border mb-4">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 border text-left">Sr.No</th>
              <th className="p-2 border text-left">HSN/SAC</th>
              <th className="p-2 border text-left">Particular</th>
              <th className="p-2 border text-right">Quantity</th>
              <th className="p-2 border text-right">Rate</th>
              <th className="p-2 border text-center">Per</th>
              <th className="p-2 border text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border font-small">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{item.hsnCode}</td>
                <td className="p-2 border">{item.particular}</td>
                <td className="p-2 border text-right">{item.quantity}</td>
                <td className="p-2 border text-right">₹{item.rate.toFixed(2)}</td>
                <td className="p-2 border text-center">No</td>
                <td className="p-2 border text-right">₹{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
    
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-sm">
            <p className="font-semibold mb-2">Amount Chargeable (in words):</p>
            <p>{numberToWords(calculateTotal(invoice))}</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>CGST {invoice.cgstRate}%:</span>
              <span>₹{(invoice.items.reduce((sum, item) => sum + item.amount, 0) * (invoice.cgstRate / 100)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>SGST {invoice.sgstRate}%:</span>
              <span>₹{(invoice.items.reduce((sum, item) => sum + item.amount, 0) * (invoice.sgstRate / 100)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total:</span>
              <span>₹{calculateTotal(invoice)}</span>
            </div>
          </div>
        </div>
  
      
        <div className="text-sm border-t pt-4">
          <h3 className="font-semibold mb-2">Our Bank Details:</h3>
          <p>A/C Name: Salvi Global</p>
          <p>Bank: ICICI Bank Limited</p>
          <p>Account No.: 042405004516</p>
          <p>IFSC Code: ICIC0000424</p>
          <p>Swift Code: ICICINBBCTS</p>
          <p className="mt-2">
            Address: Plot No. 23, Final Plot No. 395/396, Shivajinagar, Goodwill House
            Opposite Audi Showroom, Near Ratna Memorial Hospital, Pune, Maharashtra 411016
          </p>
        </div>
  
        
        <div className="text-sm mt-4 border-t pt-4">
          <p>Declaration: We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
          <p className="mt-2 text-right">For Salvi Global</p>
        </div>
  
     
        <div className="flex justify-between mt-6 print:hidden">
            <button
              onClick={() => window.location.reload()} 
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded"
          >
              <RefreshCw className="w-4 h-4" />
              Refresh
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <Printer className="w-4 h-4" />
            Print Invoice
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading invoices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Invoice Records</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by buyer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left font-small">Invoice No</th>
                    <th className="p-4 text-left font-small">Date</th>
                    <th className="p-4 text-left font-small">Buyer Name</th>
                    <th className="p-4 text-left font-small">Address</th>
                    <th className="p-4 text-right font-small">Total Amount</th>
                    <th className="p-4 text-center font-small">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">{invoice.invoiceNo}</td>
                      <td className="p-4">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="p-4">{invoice.buyerName}</td>
                      <td className="p-4">{invoice.buyerAddress}</td>
                      <td className="p-4 text-right">
                        ₹{calculateTotal(invoice).toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setIsDialogOpen(true);
                          }}
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                        >
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedInvoice && <InvoiceDetails invoice={selectedInvoice} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyerListView;