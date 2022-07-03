import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Footer from "../../Layout/Footer";

const PanelDash = () => {
    return (
        <div style={{backgroundColor:'#83a4d4'}}>
            <div className="container">
                <br/><br/>
            <h3 className="bg-dark text-white p-3">Welcome to the Panel Member Dashboard</h3><br/><br/><br/><br/>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                <MDBCol>
                    <MDBCard>
                        <MDBCardImage
                            src='https://smedigest.com.ng/wp-content/uploads/2017/10/from-business-name-to-company-registration.jpg'
                            alt='...'
                            position='top'
                        />
                        <MDBCardBody>
                            <MDBCardTitle>Send Mail</MDBCardTitle>
                            <p>You can send feedback as an email. Click Here...</p>
                            <MDBCardText>
                                <Link to="/mail">
                                    <Button variant="primary">Go</Button>
                                </Link>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol>
                    <MDBCard>
                        <MDBCardImage
                            src='https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/19/2020/07/write-event-description.jpg'
                            alt='...'
                            position='top'
                        />
                        <MDBCardBody>
                            <MDBCardTitle>Topic Evaluation</MDBCardTitle>
                            <p>You can give feedbacks for topic evaluations...</p>
                            <MDBCardText>
                                <Link to="/panelFeedback">
                                    <Button variant="primary">Go</Button>
                                </Link>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol>
                    <MDBCard>
                        <MDBCardImage
                            src='https://ucollege.wustl.edu/files/ucollege/styles/spotlight_mobile/public/photographs/adult-student-working-header.jpg?itok=QIbj4mf0'
                            alt='...'
                            position='top'
                        />
                        <MDBCardBody>
                            <MDBCardTitle>Evaluate Presentations</MDBCardTitle>
                            <p>Please analyze the presentation marks...</p>
                            <MDBCardText>
                                <Link to="/presentation">
                                    <Button variant="primary">Go</Button>
                                </Link>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            </div>
            <br/><br/><br/><br/><br/><br/><br/>
            <Footer/>
        </div>
        
    );
};

export default PanelDash;