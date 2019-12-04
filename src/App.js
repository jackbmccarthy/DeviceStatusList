import React, { Component } from 'react';

import Axios from 'axios'
import {config} from './config'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Row from './row'

import { Button } from '@material-ui/core';


class App extends Component {

state = {
  printerList: [], 
loggedin: null,
dialogboxOpen: null,
password: "",
addnew: null,
newPrinterModel: "",
newIPAddress: "",
newNotes:"",



}
componentWillMount() {
  //console.log("Getting the printers")
  
  Axios.get("getprinters").then((val) => {
    //console.log(val.data)
    this.setState({printerList: val.data })
  }).catch((err) => {
    ////console.log(err)
  })
}

componentDidMount() {
  this.interval = setInterval(() => {
    //Irvine 172.16.219.111
    Axios.get("getprinters").then((val) => {
      ////console.log(val.data)
      this.setState({printerList: val.data })
    }).catch((err) => {
      ////console.log(err)
    })
  }, 60000);
}
componentWillUnmount() {
  clearInterval(this.interval)
}

componentDidUpdate()
{
  //console.log("Updated")
  //console.log(this.state.printerList)
}

  render() {
    return (
      <Paper>
        <Table >
        <TableHead>
          <TableRow>
            <TableCell>{config.columnHeader.name}</TableCell>
            <TableCell align="right" >{config.columnHeader.hostnameOrIP}</TableCell>
            <TableCell >{config.columnHeader.status}</TableCell>
            <TableCell align="right">Notes 
            {
             this.state.loggedin ? <Button style={{backgroundColor:"blue", color:"white"}} 
             onClick={() => {this.setState({addnew: true})}}>+</Button> : <Button onClick={() => {this.state.dialogboxOpen ? this.setState({dialogboxOpen: false}) : this.setState({dialogboxOpen: true})}} style={{backgroundColor:"blue", color:"white"}}>Edit</Button>
             
            }     
            </TableCell>
          </TableRow>
          
        </TableHead>

        {
          // Logging in
        }
        <Dialog open={this.state.addnew}>
          <DialogTitle>Add a New Device</DialogTitle>
          <TextField label="Printer Model" autoFocus onChange={
          (val) => {this.setState({newPrinterModel: val.target.value})} 
          }></TextField>
          <TextField label="IP Address" onChange={
          (val) => {this.setState({newIPAddress: val.target.value})} 
          }></TextField>
          <TextField label="Notes" onChange={
          (val) => {this.setState({newNotes: val.target.value})} 
          }></TextField>
          <DialogActions>
            <Button onClick={() => {
              if (this.state.newPrinterModel.length > 0 && this.state.newIPAddress.length > 0){
                //console.log(this.state.newIPAddress)
                //console.log(this.state.newPrinterModel)
                var sendData = {
                  printer: this.state.newPrinterModel,
                  ipaddress: this.state.newIPAddress,
                  notes: this.state.newNotes
                }
                //
                Axios.post("addprinter", sendData).then((val) => {
                  //console.log("printer replied")
                  Axios.get("getprinters").then((val) => {
                    //console.log(val.data)
                    this.setState({printerList: val.data })
                    
                  }).catch((err) => {
                    //console.log(err)
                  })
                }).catch((err) => {console.log(err)})
                
                this.setState({addnew: false})
                this.setState({newPrinterModel: "", newIPAddress: "", newNotes: ""})
              }
              
            }}>Add</Button>
            <Button onClick={() => {
              this.setState({addnew: false})
            }}>Cancel</Button>
          </DialogActions>
        </Dialog>

{
  // Logging in
}
<Dialog open={this.state.dialogboxOpen}>
  <DialogTitle>Enter the password</DialogTitle>
  <TextField label="Password" autoFocus onChange={
  (val) => {this.setState({password: val.target.value})} 
  }></TextField>
  <DialogActions>
    <Button onClick={() => {
      if ( this.state.password == "admin") {
        this.setState({loggedin: true}) 
      }
      this.setState({dialogboxOpen: false})
    }}>Login</Button>
    <Button onClick={() => {
      this.setState({dialogboxOpen: false})
    }}>Cancel</Button>
  </DialogActions>
</Dialog>


        <TableBody>
          {this.state.printerList.map(row => (

            <Row key={row._id+row.printer+row.ipaddress+row.notes} id={row._id} printer={row.printer} ipaddress={row.ipaddress} loggedin={this.state.loggedin} notes={row.notes} />

            
          ))}
        </TableBody>
      </Table>
    
       
       
      </Paper>
    );
  }
}

export default App;
