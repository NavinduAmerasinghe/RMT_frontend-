import React, { useEffect, useState } from "react";
import "jspdf-autotable";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardHeader, MDBCol } from 'mdb-react-ui-kit';
import Footer from "../../Layout/Footer";
import image from "./presentation.jpg"

const ViewPresentationMarks = () => {
    const [presentation, setpresentation] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/presentation/")
            .then((res) => res.json())
            .then((data) => {
                setpresentation(data);
                //console.log(data);
            });
    }, []);

    return (
        <div style={{backgroundImage: `url(${image})` }}>
            <div className="container">
                <center>
                <br /><br />
                <MDBCard shadow='0' border='info' style={{width:"70%",backgroundColor: '#6F8FAF'}} >
                    <MDBCardBody>
                        <MDBCardText>
                        <h2 className="bg-ligh text-dark p-3">Presentation Marks</h2>
                        <br />
                        
                            <div className="table-responsive">

                                {presentation.data ?
                                    presentation.data.map((item) => {
                                        return (
                                            <div>
                                                <ul class="list-group">
                                                    <li class="list-group-item d-flex justify-content-between align-items-center" key={item._id}>
                                                    {item.studentGroup} - {parseInt(item.presentationSkills) + (item.correctness) + (item.content)}
                                                    </li>
                                                </ul>
                                                <br />
                                            </div>
                                        );
                                    })
                                    : <div></div>}

                            </div>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                </center>
                <br /><br /><br /><br />
            </div>

            <Footer />
        </div>

    );
};

export default ViewPresentationMarks;