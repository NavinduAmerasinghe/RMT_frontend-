import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardHeader } from 'mdb-react-ui-kit';
import axios from 'axios'
import Footer from "../../Layout/Footer";

function Mail() {
    //send email
    const [sent, setSent] = useState(false);
    const [text, setText] = useState("");

    //handle sending email
    const handleSend = async () => {
        setSent(true)
        try {
            await axios.post("http://localhost:8000/sendmail", {
                text
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div style={{ backgroundColor: '#83a4d4' }}>
                <div className="container">
                    <br /><br />
                    <h3 className="bg-dark text-white p-3">New Email </h3><br /><br />
                    <MDBCard shadow='0' border='info' background='white' >
                        <MDBCardBody>
                            <MDBCardText>
                                {!sent ? (
                                    <form onSubmit={handleSend}>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">To:</label>
                                            <input type="email" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Content</label>
                                            <textarea class="form-control" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type Here"/>
                                        </div>
                                        <br/>
                                        <button type="submit">Send</button>
                                    </form>
                                ) : (
                                    <h1>Email Sent!</h1>
                                )}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard><br/><br/><br/><br/><br/><br/><br/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Mail;
