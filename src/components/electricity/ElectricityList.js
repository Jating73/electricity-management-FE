import React, { useState, useRef } from 'react';
import { DatePicker } from 'antd';
import { Button, Table, Modal } from 'react-bootstrap';
import { sendPostRequest, formatDateTime } from '../../utilities/utils';
import { API_LIST, DATE_CONVERSION_TYPE } from '../../utilities/constants';

function ElectricityList({ bills, showAdd, handleCloseAdd }) {

    // Date State Change
    const [billDate, setBillDate] = useState("");
    const [paidDate, setPaidDate] = useState("");

    // Form Inputs
    const unitConsumedInput = useRef();
    const billAmountInput = useRef();
    const paymentAmountInput = useRef();

    const onChangeBillDate = (value, dateString) => {
        setBillDate(dateString);
    };

    const onChangePaidDate = (value, dateString) => {
        setPaidDate(dateString);
    };

    const onOk = (value) => { };

    // Success or Error Alerts
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);


    // Clear Form Data
    function clearFormData() {
        unitConsumedInput.current.value = '';
        billAmountInput.current.value = '';
        paymentAmountInput.current.value = '';
    }

    // Function to add New Bill Through API
    async function addNewBill(billData) {

        const url = process.env.REACT_APP_BASE_URL + API_LIST.CREATE_BILL;

        const data = {
            bill_date: billData.bill_date,
            paid_date: billData.paid_date,
            unit_consumed: billData.unit_consumed,
            bill_amount: billData.bill_amount,
            payment_amount: billData.payment_amount
        };

        const response = await sendPostRequest(url, null, data, null);

        if (response.status === 200) {
            setSuccess(`${response.message}: ${response.taskid}`);
        } else {
            if (response.status === 400) {
                setError(response.error)
            } else {
                setError("Something went wrong! Please try again");
            }
        }

        setTimeout(() => {
            clearFormData();
            setSuccess(null);
            setError(null);
        }, 3000);
    }

    // Add New Bill Event Handler
    function addHandler(event) {
        event.preventDefault();

        const bill_date = billDate;
        const paid_date = paidDate;
        const unit_consumed = unitConsumedInput.current.value;
        const bill_amount = billAmountInput.current.value;
        const payment_amount = paymentAmountInput.current.value;

        const formData = {
            bill_date,
            paid_date,
            unit_consumed,
            bill_amount,
            payment_amount
        }
        addNewBill(formData);
    }

    // function Delete Bill Handler
    function deleteHandler() {

    }

    return (
        <>
            {/* Bill Data Table */}
            <Table responsive striped bordered hover>
                <thead className='table-dark'>
                    <tr>
                        <th>Bill ID</th>
                        <th>Bill Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill) => {
                        return (
                            <tr>
                                <td>{bill._id}</td>
                                <td>{formatDateTime(bill.bill_date, DATE_CONVERSION_TYPE.DATE)}</td>
                                <td className='d-flex justify-content-between'>
                                    <Button variant="success">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ height: "1.5rem", width: "1.5rem" }}>
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                        </svg>
                                    </Button>
                                    <Button variant="warning">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ height: "1.5rem", width: "1.5rem" }}>
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </Button>
                                    <Button variant="danger" onClick={deleteHandler}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ height: "1.5rem", width: "1.5rem" }}>
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            {/* Add New Bill Modal */}
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>New Bill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {success && (<div className="alert alert-success" role="alert">
                        {success}
                    </div>)
                    }
                    {error && (<div className="alert alert-danger" role="alert">
                        {error}
                    </div>)
                    }

                    <form onSubmit={addHandler}>
                        <div className='mt-3 mb-3'>
                            <label>Bill Date</label>
                            <DatePicker onChange={onChangeBillDate} onOk={onOk} style={{ width: '100%' }} />
                        </div>
                        <div className='mt-3 mb-3'>
                            <label>Paid Date</label>
                            <DatePicker onChange={onChangePaidDate} onOk={onOk} style={{ width: '100%' }} />
                        </div>
                        <div className='mt-3 mb-3'>
                            <input className="form-control" type="number" placeholder="Units Consumed in KWH" ref={unitConsumedInput} />
                        </div>
                        <div className='mt-3 mb-3'>
                            <input className="form-control" type="number" placeholder="Bill Amount" ref={billAmountInput} />
                        </div>
                        <div className='mt-3 mb-3'>
                            <input className="form-control" type="number" placeholder="Amount Paid" ref={paymentAmountInput} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ElectricityList
