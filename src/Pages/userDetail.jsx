import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./tablePagination";
import { tableAction } from "../action";
import UserDailog from './userForm'

class UserDetail extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 5,
      open:false,
    };
  }
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(tableAction.getAllTableData());
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  deleteRow=(id)=>{
    const { tableDataDetail } = this.props;
    const { dispatch } = this.props;
    dispatch(tableAction.deleteTableData(id,tableDataDetail));
  }
  
  editRow =(row)=>{
    let {dispatch}=this.props
    dispatch(tableAction.editTable(row));
    this.setState({
      open:true
    })
  }
  handleClickOpen =()=>{
    this.setState({
      open:true
    })
  }
  closeDailog =()=>{
    this.setState({
      open:false
    })
  }
 

  render() {
    const { tableDataDetail } = this.props;
    const { page, rowsPerPage,open } = this.state;
    return (
      <div>
        <Button style={{ float:'left',margin:'10px'}} variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add User
       </Button>
       <UserDailog open={open} closeDailog={this.closeDailog}/>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow style={{ background: "black", color: "white" }}>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell
                  style={{ color: "white", fontWeight: "bold" }}
                  align="midale"
                >
                  Email
                </TableCell>
                <TableCell
                  style={{ color: "white", fontWeight: "bold" }}
                  align="midale"
                >
                  Address
                </TableCell>
                <TableCell
                  style={{ color: "white", fontWeight: "bold" }}
                  align="midale"
                >
                  Gender
                </TableCell>
                <TableCell
                  style={{ color: "white", fontWeight: "bold" }}
                  align="right"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(tableDataDetail.length > 0
                ? tableDataDetail.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : []
              ).map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="midale">{row.email}</TableCell>
                  <TableCell align="midale">{row.address}</TableCell>
                  <TableCell align="midale">{row.gender}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => this.deleteRow(row.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.editRow(row)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    15,
                    20,
                    25,
                    50,
                    100,
                    { label: "All", value: -1 },
                  ]}
                  colSpan={3}
                  count={tableDataDetail.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { tableDataDetail } = state.tableDataReducer;
  return {
    tableDataDetail
    
    };
}
export default connect(mapStateToProps)(UserDetail);
