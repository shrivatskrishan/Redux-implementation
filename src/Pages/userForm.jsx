import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { tableAction } from "../action";

class UserDailog extends React.Component{
    constructor(){
        super()
        
    }
    componentDidMount(){
        const { dispatch,userData } = this.props;
        dispatch(tableAction.getuserData());
    }

    handleChange =(event,name)=>{
        const { dispatch,userData } = this.props;
        dispatch(tableAction.setUserData(userData,event,name));
    }
    handleClose =()=>{
        const { dispatch } = this.props;
        dispatch(tableAction.getuserData());
        this.props.closeDailog()
    }
    addUser =()=>{
        const {userData,dispatch}=this.props
        if(userData.id){
            dispatch(tableAction.updateUserData(userData)).then(()=>{
                this.props.closeDailog()
            });
        }else{
            dispatch(tableAction.addUserData(userData)).then(()=>{
                this.props.closeDailog()
            });
        }
        
    }

    render(){
            const{open,userData}=this.props
        return (
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">User Detail</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                onChange={(event)=>this.handleChange(event,'name')}
                value={userData.name}
                fullWidth
              />
               <TextField
                
                margin="dense"
                id="email"
                label="Email Address"
                onChange={(event)=>this.handleChange(event,'email')}
                value={userData.email}
                type="email"
                fullWidth
              />
               <TextField
                
                margin="dense"
                id="address"
                onChange={(event)=>this.handleChange(event,'address')}
                value={userData.address}
                label="Address"
                type="address"
                fullWidth
              />
               <TextField
                
                margin="dense"
                id="gander"
                label="Gender"
                value={userData.gender}
                onChange={(event)=>this.handleChange(event,'gender')}
                type="gender"
                fullWidth
              />
              
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.addUser} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )
    }
}
function mapStateToProps(state) {
    const { userData } = state.tableDataReducer;
    return {
      userData,
      };
  }

export default connect(mapStateToProps)(UserDailog)