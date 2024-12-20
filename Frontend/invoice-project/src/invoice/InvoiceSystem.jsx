import React, { useState, useEffect } from 'react';
import { XCircle, Plus, Save, FileText } from 'lucide-react';

const InvoiceSystem = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState({
    invoiceNo: '',
    date: new Date().toISOString().split('T')[0],
    supplierName: '',
    supplierAddress: '',
    supplierGSTIN: '',
    supplierIEC: '',
    buyerName: '',
    buyerAddress: '',
    buyerGSTIN: '',
    paymentTerms: '',
    paymentMode :'',
    dispatchMethod: '',
    destination: '',  
    items: [],
    cgstRate: 9,
    sgstRate: 9,
    bankName: '',
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    swiftCode: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/invoices/createInvoice');
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleAddItem = () => {
    setCurrentInvoice({
      ...currentInvoice,
      items: [
        ...currentInvoice.items,
        {
          hsnCode: '',
          particular: '',
          quantity: 1,
          rate: 0,
          unit: 'No',
          amount: 0
        }
      ]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = currentInvoice.items.filter((_, i) => i !== index);
    setCurrentInvoice({ ...currentInvoice, items: newItems });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...currentInvoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setCurrentInvoice({ ...currentInvoice, items: newItems });
  };

  const calculateTotals = () => {
    const totalBeforeTax = currentInvoice.items.reduce((sum, item) => sum + item.amount, 0);
    const cgstAmount = totalBeforeTax * (currentInvoice.cgstRate / 100);
    const sgstAmount = totalBeforeTax * (currentInvoice.sgstRate / 100);
    const totalAmount = totalBeforeTax + cgstAmount + sgstAmount;
    
    return { totalBeforeTax, cgstAmount, sgstAmount, totalAmount };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/invoices/createInvoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentInvoice),
      });
      
      if (response.ok) {
        alert("Invoice Created Successfully");
        setSuccessMessage('Invoice added successfully!');
        
        setTimeout(() => {
          setSuccessMessage('');
          fetchInvoices();
          setCurrentInvoice({
            ...currentInvoice,
            items: [],
            invoiceNo: ''
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-white p-1">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Generate Invoice</h1>
        </div>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 mb-6 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Invoice No</label>
              <input
                type="text"
                value={currentInvoice.invoiceNo}
                onChange={(e) => setCurrentInvoice({ ...currentInvoice, invoiceNo: e.target.value })}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={currentInvoice.date}
                onChange={(e) => setCurrentInvoice({ ...currentInvoice, date: e.target.value })}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

   
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="border rounded p-4">
              <h3 className="font-medium mb-3">Supplier Details</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Supplier Name"
                  value={currentInvoice.supplierName}
                  onChange={(e) => setCurrentInvoice({ ...currentInvoice, supplierName: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
                <textarea
                  placeholder="Supplier Address"
                  value={currentInvoice.supplierAddress}
                  onChange={(e) => setCurrentInvoice({ ...currentInvoice, supplierAddress: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
                <input
                  type="text"
                  placeholder="GSTIN"
                  value={currentInvoice.supplierGSTIN}
                  onChange={(e) => setCurrentInvoice({ ...currentInvoice, supplierGSTIN: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            </div>

            <div className="border rounded p-4">
              <h3 className="font-medium mb-3">Buyer Details</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Buyer Name"
                  value={currentInvoice.buyerName}
                  onChange={(e) => setCurrentInvoice({ ...currentInvoice, buyerName: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
                <textarea
                  placeholder="Buyer Address"
                  value={currentInvoice.buyerAddress}
                  onChange={(e) => setCurrentInvoice({ ...currentInvoice, buyerAddress: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
                <input
                  type="text"
                  placeholder="GSTIN"
                  value={currentInvoice.buyerGSTIN}
                  onChange={(e) => setCurrentInvoice({ ...currentInvoice, buyerGSTIN: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-medium mb-3">Payment Details</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Payment Status"
                  value={currentInvoice.paymentTerms}
                  onChange={(e) => setCurrentInvoice({ ...currentInvoice, paymentTerms: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Payment Mode"
                  value={currentInvoice.paymentMode}
                  onChange={(e) => setCurrentInvoice({ ...currentInvoice, paymentMode: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Items</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">HSN Code</th>
                    <th className="p-2 text-left">Particular</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Rate</th>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentInvoice.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.hsnCode}
                          onChange={(e) => handleItemChange(index, 'hsnCode', e.target.value)}
                          className="w-full border rounded p-1"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.particular}
                          onChange={(e) => handleItemChange(index, 'particular', e.target.value)}
                          className="w-full border rounded p-1"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                          className="w-full border rounded p-1"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
                          className="w-full border rounded p-1"
                        />
                      </td>
                      <td className="p-2">
                        {item.amount.toFixed(2)}
                      </td>
                      <td className="p-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-600"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{totals.totalBeforeTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CGST ({currentInvoice.cgstRate}%):</span>
                    <span>₹{totals.cgstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SGST ({currentInvoice.sgstRate}%):</span>
                    <span>₹{totals.sgstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>₹{totals.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceSystem;