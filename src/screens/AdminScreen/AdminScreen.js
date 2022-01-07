import React, { useEffect, useState } from 'react'
import AdminCss from './AdminScreen.module.scss'
import PendingRequest from '../../components/Requests/PendingRequest';
import ApprovedRequest from '../../components/Requests/ApprovedRequest';
import RejectedRequest from '../../components/Requests/RejectedRequest';
import { db } from '../../config/Firebase/FirebaseConfig'
import { collection, query, where, onSnapshot } from "firebase/firestore";

import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loader from '../../components/Loader/Loader';
import ACTION from '../../config/Action'

const AdminScreen = () => {
    const [pendingReqState, setPendingReq] = useState([]);
    const [approvedReqState, setApprovedReq] = useState([]);
    const [rejectedReqState, setRejectReq] = useState([]);

    const [loading, setLoading] = useState(false)

    const handlependingRequest = () => {
        setLoading(true)
        const q = query(collection(db, "Forms"), where("active_status", "==", ACTION.PENDING));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            console.log(data);
            setPendingReq(data)
            setLoading(false)
        });
    }

    const handleApprovedRequest = () => {
        setLoading(true)
        console.log("ameen");
        const q = query(collection(db, "Forms"), where("active_status", "==", ACTION.APPROVED));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            console.log(data);
            setApprovedReq(data)
            setLoading(false)
        });
    }

    const handlerejectedReqest = () => {
        setLoading(true)
        const q = query(collection(db, "Forms"), where("active_status", "==", ACTION.REJECT));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            console.log(data);
            setRejectReq(data);
            setLoading(false)
        });
    }

    useEffect(() => {
        handlependingRequest();
    }, [])




    return (
        <div>
            <div className={`${AdminCss.mainContainer}`}>
                <div className={`${AdminCss.page_content}`}>
                    <div className={`${AdminCss.tabbed}`}>
                        <input type="radio" id="tab21" name="css-tabs2" defaultChecked />
                        <input type="radio" id="tab22" name="css-tabs2" onClick={handleApprovedRequest} />
                        <input type="radio" id="tab23" name="css-tabs2" onClick={handlerejectedReqest} />
                        <input type="radio" id="tab24" name="css-tabs2" />

                        <ul className={`${AdminCss.tabs}`}>
                            <li className={`${AdminCss.tab}`}><label htmlFor="tab21">Pending Request's</label></li>
                            <li className={`${AdminCss.tab}`}><label htmlFor="tab22">Approved Request's</label></li>
                            <li className={`${AdminCss.tab}`}><label htmlFor="tab23">Rejected Request's</label></li>
                            <li className={`${AdminCss.tab}`}><label htmlFor="tab24">Account Controller</label></li>
                        </ul>

                        <div className={`${AdminCss.tab_content}`}>
                            <div className="" id="pending">
                                {loading
                                    ?
                                    <div style={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Loader size={60} loading={loading} color={"#307a03"} />
                                    </div>
                                    :
                                    <TableContainer component={Paper}>
                                        <Table aria-label="collapsible table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell />
                                                    <TableCell><b>Name</b></TableCell>
                                                    <TableCell align="right"><b>No. Family Member</b></TableCell>
                                                    <TableCell align="right"><b>Monthly Income</b></TableCell>
                                                    <TableCell align="right"><b>Help Category</b></TableCell>
                                                    <TableCell align="right"><b>Branch Name</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {pendingReqState.map((data, index) => {
                                                return <PendingRequest key={index} data={data} />
                                            })}
                                        </Table>
                                    </TableContainer>}
                            </div>
                        </div>

                        <div className={`${AdminCss.tab_content}`} >
                            <div className="" id="accepted">
                                {loading
                                    ?
                                    <div style={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Loader size={60} loading={loading} color={"#307a03"} />
                                    </div>
                                    :
                                    <TableContainer component={Paper}>
                                        <Table aria-label="collapsible table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell />
                                                    <TableCell><b>Name</b></TableCell>
                                                    <TableCell align="right"><b>No. Family Member</b></TableCell>
                                                    <TableCell align="right"><b>Monthly Income</b></TableCell>
                                                    <TableCell align="right"><b>Help Category</b></TableCell>
                                                    <TableCell align="right"><b>Branch Name</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {approvedReqState.map((data, index) => {
                                                return <ApprovedRequest key={index} data={data} />
                                            })}
                                        </Table>
                                    </TableContainer>}
                            </div>
                        </div>

                        <div className={`${AdminCss.tab_content}`}>
                            <div className="" id="delivered">
                                {loading
                                    ?
                                    <div style={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Loader size={60} loading={loading} color={"#307a03"} />
                                    </div>
                                    :
                                    <TableContainer component={Paper}>
                                        <Table aria-label="collapsible table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell />
                                                    <TableCell><b>Name</b></TableCell>
                                                    <TableCell align="right"><b>No. Family Member</b></TableCell>
                                                    <TableCell align="right"><b>Monthly Income</b></TableCell>
                                                    <TableCell align="right"><b>Help Category</b></TableCell>
                                                    <TableCell align="right"><b>Branch Name</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {rejectedReqState.map((data, index) => {
                                                return <RejectedRequest key={index} data={data} />
                                            })}
                                        </Table>
                                    </TableContainer>}
                            </div>
                        </div>

                        <div className={`${AdminCss.tab_content}`}>
                            <div className="" id="rejected">
                                <h1>Account Control</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminScreen
