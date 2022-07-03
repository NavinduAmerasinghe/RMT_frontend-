import React, { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios'
import jspdf from "jspdf";
import "jspdf-autotable";
import ReactPaginate from "react-paginate";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardHeader, MDBCol } from 'mdb-react-ui-kit';
import Footer from "../../Layout/Footer";

const Presentation = () => {
    const [presentation, setpresentation] = useState([]);

    //view modal
    const [RowData, setRowData] = useState([]);
    const [viewShow, setViewShow] = useState(false);
    const handleViewShow = () => { setViewShow(true) }
    const handleViewClose = () => { setViewShow(false) }
    //add modal
    const [viewPost, setPostShow] = useState(false);
    const handlePostShow = () => { setPostShow(true) }
    const handlePostClose = () => { setPostShow(false) }
    //delete modal
    const [viewDelete, setDeleteShow] = useState(false);
    const handleDeleteShow = () => { setDeleteShow(true) }
    const handleDeleteClose = () => { setDeleteShow(false) }

    //defeine here local state that store the form data
    const [studentGroup, setStudentGroup] = useState("");
    const [description, setDescription] = useState("");
    const [presentationSkills, setPresentationSkills] = useState("");
    const [correctness, setCorrectness] = useState("");
    const [content, setContent] = useState("");
    const [total, setTotal] = useState("");
    const [overoll, setOveroll] = useState("");

    const [Delete, setDelete] = useState(false);
    //Id for update record and delete
    const [id, setId] = useState("");

    //search filter
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch("http://localhost:8000/presentation/")
            .then((res) => res.json())
            .then((data) => {
                setpresentation(data);
                //console.log(data);
            });
    }, []);

    const handleSubmit = () => {
        const url = 'http://localhost:8000/presentation/'
        const credentials = { studentGroup, description, presentationSkills, correctness, content, total, overoll }
        axios.post(url, credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message);
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    //handle delete function
    const handleDelete = () => {
        const url = `http://localhost:8000/presentation/${id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message);
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const generatePDF = (presentation) => {

        const doc = new jspdf();
        const tableColumn = [
            "Group Number",
            "Marks",
        ];

        const tableRows = [];
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];

        presentation.data.map((presentation) => {
            const presentationData = [
                presentation.studentGroup,
                parseInt(presentation.presentationSkills) + (presentation.correctness) + (presentation.content),
            ];

            tableRows.push(presentationData);
        });
        doc.text("Presentation Marks Report", 14, 16).setFontSize(13);
        doc.text(`Date - ${dateStr}`, 14, 23);

        //right down width height

        // doc.addImage(img, "JPEG", 170, 8, 25, 25);

        doc.autoTable(tableColumn, tableRows, {
            styles: { fontSize: 10 },
            startY: 35,
        });

        // doc.addImage(img1, "JPEG", 120, 140, 70, 40);
        doc.save("Presentation Marks.pdf");

    };

    return (
        <div style={{ backgroundColor: '#83a4d4' }}>
            <div className="container">
                <br /><br />
                <h3 className="bg-dark text-white p-3">Panel Member</h3><br />
                <h2 className="bg-ligh text-dark p-3">Marks For Presentations</h2>
                <button onClick={() => { generatePDF(presentation) }}>Download Marks</button>
                <MDBCard shadow='0' border='info' background='white' >
                    <MDBCardBody>
                        <MDBCardText>
                            <h4>Search your Group Number</h4>
                            <input type="text" placeholder="Search..." onChange={e => { setSearch(e.target.value) }} />
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                <br />
                <MDBCard shadow='0' border='info' background='white' >
                    <MDBCardBody>
                        <MDBCardText>
                            <div className="mt-5 mb-4">
                                <Button variant="primary" onClick={() => { handlePostShow() }}><i className="fa fa-plu"></i>
                                    Add New Presentation Mark
                                </Button>
                            </div>
                            <div className="table-responsive">

                                {presentation.data ?
                                    presentation.data.filter((item) => {
                                        if (search == "") {
                                            return item
                                        } else if (item.studentGroup.toLowerCase().includes(search.toLowerCase())) {
                                            return item
                                        }
                                    }).map((item) => {
                                        return (
                                            <div>
                                                <MDBCol key={item._id}>
                                                    <MDBCard border='success' background='white'>
                                                        <MDBCardBody>
                                                            <MDBCardText>
                                                                {item.studentGroup} -
                                                                {parseInt(item.presentationSkills) + (item.correctness) + (item.content)}
                                                                <Button size="sm" style={{ float: "right" }} variant="primary" onClick={() => { handleViewShow(setRowData(item)) }}>View</Button>
                                                                <Button size="sm" style={{ float: "right" }} variant="danger" onClick={() => { handleViewShow(setRowData(item), setId(item._id), setDelete(true)) }}>Delete</Button>
                                                            </MDBCardText>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </MDBCol>
                                                <br />
                                            </div>
                                        );
                                    })
                                    : <div></div>}

                            </div>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                <br /><br /><br /><br />
            </div>
            {/*Model to view button */}
            <div className="model-box-view">
                <Modal
                    show={viewShow}
                    onHide={handleViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>View Presentation Marks</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-goup">
                                <label>Student Group</label>
                                <input type="text" className="form-control" value={RowData.studentGroup} readOnly />
                            </div>
                            <div className="form-goup mt-3">
                                <label>Description</label>
                                <input type="text" className="form-control" value={RowData.description} readOnly />
                            </div>
                            <div className="form-goup mt-3">
                                <label>Presentation Skills Marks</label>
                                <input type="text" className="form-control" value={RowData.presentationSkills} readOnly />
                            </div>
                            <div className="form-goup mt-3">
                                <label>Correctness</label>
                                <input type="text" className="form-control" value={RowData.correctness} readOnly />
                            </div>
                            <div className="form-goup mt-3">
                                <label>Content</label>
                                <input type="text" className="form-control" value={RowData.content} readOnly />
                            </div>
                            <div className="form-goup mt-3">
                                <label>Total</label>
                                <input type="text" className="form-control" value={parseInt(RowData.presentationSkills) + (RowData.correctness) + (RowData.content)} readOnly />
                            </div>
                            <div className="form-goup mt-3">
                                <label>Overall</label>
                                <input type="text" className="form-control" value={RowData.overoll} readOnly />
                            </div>
                            {
                                Delete && (
                                    <div>
                                        <br /><br />
                                        <p>Are You Sure, Do you need to delete this?</p>
                                        <Button type="submit" className="btn btn-danger mt-4" onClick={handleDelete}>Yes</Button>
                                    </div>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleViewClose}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>

            {/*Modal to submit the data to the database */}
            <div className="model-box-view">
                <Modal
                    show={viewPost}
                    onHide={handlePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Add Presentation Marks</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-goup">
                                <input type="text" className="form-control" onChange={(e) => setStudentGroup(e.target.value)} placeholder="Please enter Group Number" />
                            </div>
                            <div className="form-goup mt-3">
                                <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} placeholder="Please enter the description" />
                            </div>
                            <div className="form-goup mt-3">
                                <input type="text" className="form-control" onChange={(e) => setPresentationSkills(e.target.value)} placeholder="Please enter Prsentation Skills Marks" />
                            </div>
                            <div className="form-goup mt-3">
                                <input type="text" className="form-control" onChange={(e) => setCorrectness(e.target.value)} placeholder="Please enter Marks for Correctness" />
                            </div>
                            <div className="form-goup mt-3">
                                <input type="text" className="form-control" onChange={(e) => setContent(e.target.value)} placeholder="Please enter Marks for Content" />
                            </div>
                            <div className="form-goup mt-3">
                                <input type="text" className="form-control" onChange={(e) => setOveroll(e.target.value)} placeholder="Please enter Overoll" />
                            </div>
                            <Button type="submit" className="btn btn-success mt-4" onClick={handleSubmit}>Add Feedback</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handlePostClose}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
            <Footer/>
        </div>

    );
};

export default Presentation;