import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { sendGetRequest } from '../utilities/utils';
import { API_LIST } from '../utilities/constants';
import ElectricityList from '../components/electricity/ElectricityList';

function Home() {

    const [showAdd, setShowAdd] = useState(false);

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);

    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchBills() {
        const url = process.env.REACT_APP_BASE_URL + API_LIST.FETCH_BILLS;

        const response = await sendGetRequest(url);
        if (response.status === 200) {
            return response.data;
        }
    }

    useEffect(() => {

        const getBills= async () => {
            const bills = await fetchBills();
            setLoading(false);
            setBills(bills);
        };

        setLoading(true);
        getBills();

    }, []);

    if (loading) {
        return (
            <Container style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
                <Spinner className='text-center' animation='border' variant='info' />
            </Container>
        )
    }

    return (
        <Container>
            <div className='d-flex justify-content-end mb-4'>
                <Button className='d-flex align-items-center' onClick={handleAddShow}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ height: "1.5rem", width: "1.5rem" }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                    </svg>
                    New Bill
                </Button>
            </div>
            <ElectricityList bills={bills} handleCloseAdd={handleAddClose} showAdd={showAdd} />

            {/* Add New Bill Modal */}

        </Container>
    )
}

export default Home