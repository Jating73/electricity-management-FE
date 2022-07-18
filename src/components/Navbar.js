import React from 'react';
import { Navbar as NavbarBs, Container } from 'react-bootstrap'

function Navbar() {

    return (
        <NavbarBs sticky='top' className='bg-white shadow-sm mb-3'>
            <Container>
                <div className='d-flex justify-content-center align-items-center'>
                    <h1>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ height: "2rem", width: "2rem", color:"yellow" }}>
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                        </svg>
                        Electricity Bill Manager
                    </h1>
                </div>
            </Container>
        </NavbarBs>
    )
}

export default Navbar