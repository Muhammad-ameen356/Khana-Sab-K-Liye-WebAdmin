import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ACTION from '../../config/Action'
import { db } from '../../config/Firebase/FirebaseConfig'
import { doc, updateDoc, deleteDoc } from "firebase/firestore";


function createData(name, familymember, monthlyIncome, helpCategory, branchName, DOB, fatherName, CNIC, personImg, CNICfront, CNICback, index, uid) {
    return {
        name,
        familymember,
        monthlyIncome,
        helpCategory,
        branchName,
        index,
        uid,
        history: [
            {
                DOB: DOB,
                fatherName: fatherName,
                CNIC: CNIC,
                personImg: personImg,
                CNICfront: CNICfront,
                CNICback: CNICback,
            },
            // {
            //     DOB: "",
            //     fatherName: "",
            //     CNIC: "",
            //     personImg: "Accept",
            //     CNICfront: "Reject",
            //     CNICback: "Delete",
            // },
        ],
    };
}

function Row(props) {
    const date = new Date().getTime().toString()
    const { row } = props;
    const [open, setOpen] = React.useState("");
    const [refresh, setRefresh] = React.useState(false);

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) : string
    }

    const handleOpen = (date) => {
        setOpen(!open)
    }

    const updateStatus = async (action, id) => {

        const washingtonRef = doc(db, "Forms", `${id}`);

        if (action === ACTION.APPROVED) {
            await updateDoc(washingtonRef, {
                active_status: ACTION.APPROVED
            }).then(() => {
                console.log("Update Success");
            }).catch(() => {
                console.log("Not Success");
            })
        } else if (action === ACTION.REJECT) {
            await updateDoc(washingtonRef, {
                active_status: ACTION.REJECT
            }).then(() => {
                console.log("Update Success");
            }).catch((e) => {
                console.log("Not Success", e);
            })
        } else if (action === ACTION.DELETE) {
            await deleteDoc(washingtonRef);
            console.log("Delete Button Work");
        }
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{ cursor: "pointer" }} onClick={() => handleOpen(date)}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleOpen(date)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.familymember}</TableCell>
                <TableCell align="right">{row.monthlyIncome}</TableCell>
                <TableCell align="right">{row.helpCategory}</TableCell>
                <TableCell align="right">{row.branchName}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" style={{ padding: 15, textAlign: "left", textDecoration: "underline" }}>
                                Details of {row.name}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Date Of Birth</b></TableCell>
                                        <TableCell><b>Father Name</b></TableCell>
                                        <TableCell align="right"><b>CNIC Number</b></TableCell>
                                        <TableCell align="right"><b>Person Image</b></TableCell>
                                        <TableCell align="right"><b>CNIC Front Image</b></TableCell>
                                        <TableCell align="right"><b>CNIC Back Image</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell component="th" scope="row">{historyRow.DOB}</TableCell>
                                            <TableCell>{historyRow.fatherName}</TableCell>
                                            <TableCell align="right">{historyRow.CNIC}</TableCell>
                                            <TableCell align="right"><a href={historyRow.personImg} target="_blank">{truncate(historyRow.personImg, 18)}</a></TableCell>
                                            <TableCell align="right"><a href={historyRow.CNICfront} target="_blank">{truncate(historyRow.personImg, 18)}</a></TableCell>

                                            <TableCell align="right"><a href={historyRow.CNICback} target="_blank">{truncate(historyRow.CNICback, 18)}</a></TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow >
                                        {/* <TableCell component="th" scope="row">
                                            <Button variant="contained" color="success" size="small" onClick={() => updateStatus(ACTION.APPROVED, row.uid)}>Accept</Button>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Button variant="contained" color="warning" size="small" onClick={() => updateStatus(ACTION.REJECT, row.uid)}>Reject</Button>
                                        </TableCell> */}
                                        <TableCell component="th" scope="row">
                                            <Button variant="contained" color="error" size="small" onClick={() => updateStatus(ACTION.DELETE, row.uid)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


const ApprovedRequest = ({ data }) => {
    const rows = [
        createData(data.name, data.familymember, data.monthlyIncome,
            data.helpCategory, data.nearestBranch, data.DOB,
            data.fatherName, data.CNIC, data.personImg,
            data.CNICfront, data.CNICback, data.index,
            data.user_uid
        )
    ];

    return (
        <>
            <TableBody>
                {rows.map((row, ind) => (
                    <Row key={ind} row={row} />
                ))}
            </TableBody>
        </>
    )
}

export default ApprovedRequest
