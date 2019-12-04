import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios'



import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {config} from "./config";
import Status from './status'
import { Button } from '@material-ui/core';


class Row extends Component {

state = {
canEdit: false,
ipaddress: this.props.ipaddress,
notes: this.props.notes,
printer: this.props.printer,
id : this.props.id,
delete: false,
deleted: false,


/*

Props: 
ipaddress
printer
notes
loggedin
*/


}

componentWillMount() {
  //console.log(this.props.printer)
}

  render() {
    if (this.state.deleted) {
        return null

    }
    else if (this.state.canEdit) {
        return(
            <TableRow>
        <TableCell component="th" scope="row">
        <TextField value={this.state.printer} onChange={(event) => {this.setState({printer: event.target.value})}} ></TextField>
      </TableCell>
      <TableCell align="right"><TextField value={this.state.ipaddress} onChange={(event) => {this.setState({ipaddress: event.target.value})}} ></TextField></TableCell>
      <Status style={{width: 70}} ipaddress={this.props.ipaddress} />
      <TableCell align="right"><TextField value={this.state.notes} onChange={(event) => {this.setState({notes: event.target.value})}} ></TextField>{this.props.loggedin ? <Button onClick={() => {
          this.setState({canEdit: false})
          var sendData = {
              printer: this.state.printer,
              ipaddress: this.state.ipaddress,
              notes: this.state.notes,
              id: this.state.id

          }
          //console.log(sendData)
          Axios.post("editprinter", sendData ) //.then((val) => {console.log(val.data)}).catch((err) => {console.log(err)})
        }
          } color="primary">Save</Button>: null}
          {
              this.state.canEdit ? <Button onClick={() => {this.setState({delete: true})}}>Delete</Button> : null
          }
          
          </TableCell>
          <Dialog open={this.state.delete}>
  <DialogTitle>Delete this Printer?</DialogTitle>
 
  <DialogActions>
    <Button onClick={() => {
      this.setState({delete: false}) 
      Axios.post('deleteprinter', {id : this.state.id})
      //console.log("Hit Yes")
      this.setState({deleted: true})
    }}>Yes</Button>
    <Button onClick={() => {
        this.setState({delete: false})  
      //console.log("Hit No")
    }}>No</Button>
  </DialogActions>
</Dialog>
    </TableRow>
        )
    }
    
else {
    return (
        <TableRow>
        <TableCell component="th" scope="row">
        {this.state.printer}
      </TableCell>
      <TableCell align="right">{this.state.ipaddress}</TableCell>
      <Status style={{width: 70}} ipaddress={this.state.ipaddress} />
      <TableCell align="right">{this.state.notes}{this.props.loggedin ? <Button onClick={() => {this.setState({canEdit: true})}} color="Primary">Edit</Button>: null}</TableCell>
    </TableRow>
    );
}
  }
}

export default Row;
