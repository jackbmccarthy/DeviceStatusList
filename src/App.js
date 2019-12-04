import React, { Component } from 'react';
import './App.css';
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
  printerList: [], //[{"printer": "iR 1435iF", "ipaddress": "172.16.14.36", "notes": ""}, {"printer": "iR 1435iF", "ipaddress": "172.16.14.35", "notes": "System Engineering"}, {"printer": "iR 1750iF", "ipaddress": "172.16.17.50", "notes": ""}, {"printer": "iRA 4051", "ipaddress": "172.16.40.52", "notes": ""}, {"printer": "iR 2030i", "ipaddress": "172.16.20.30", "notes": ""}, {"printer": "iR 3245", "ipaddress": "172.16.32.45", "notes": ""}, {"printer": "LC 830i", "ipaddress": "172.16.8.30", "notes": ""}, {"printer": "iR C1022i", "ipaddress": "172.16.110.22", "notes": ""}, {"printer": "iRA 6075", "ipaddress": "172.16.60.75", "notes": ""}, {"printer": "iR C2880", "ipaddress": "172.16.128.80", "notes": ""}, {"printer": "iRA 500iF", "ipaddress": "172.16.50.1", "notes": ""}, {"printer": "iRA 350iF", "ipaddress": "172.16.135.0", "notes": ""}, {"printer": "iRA C2030", "ipaddress": "172.16.120.30", "notes": ""}, {"printer": "iRA C9075S", "ipaddress": "172.16.190.75", "notes": "PrismaSync Controller"}, {"printer": "VP 6320", "ipaddress": "172.16.63.20", "notes": "PrismaSync Controller"}, {"printer": "VP 135", "ipaddress": "172.16.0.135", "notes": "PrismaSync Controller"}, {"printer": "iPr C7010VPS", "ipaddress": "172.16.170.10", "notes": ""}, {"printer": "iPr 1135", "ipaddress": "172.16.11.35", "notes": "J200 Controller"}, {"printer": "iCl MF820 Cdn", "ipaddress": "172.16.182.0", "notes": "System Engineering"}, {"printer": "iR 2022i", "ipaddress": "172.16.20.22", "notes": "System Engineering"}, {"printer": "iR 3235i", "ipaddress": "172.16.32.35", "notes": "System Engineering"}, {"printer": "iRA C2230", "ipaddress": "172.16.122.30", "notes": "System Engineering"}, {"printer": "iRA 4051", "ipaddress": "172.16.40.51", "notes": "System Engineering"}, {"printer": "iRA C3325", "ipaddress": "172.16.133.25", "notes": "System Engineering"}, {"printer": "iRA C5051", "ipaddress": "172.16.102.1", "notes": "B1 Controller; System Engineering"}, {"printer": "iR 1023iF", "ipaddress": "172.16.10.23", "notes": "System Engineering"}, {"printer": "iR 1023iF", "ipaddress": "172.16.10.24", "notes": ""}, {"printer": "CiR LBP 5360", "ipaddress": "172.16.153.60", "notes": ""}, {"printer": "iRA 500iF", "ipaddress": "172.16.50.0", "notes": "System Engineering"}, {"printer": "iR 2545", "ipaddress": "172.16.25.45", "notes": ""}, {"printer": "iRA 8205", "ipaddress": "172.16.8.205", "notes": ""}, {"printer": "iRA 8105", "ipaddress": "172.16.21.1", "notes": "U1 Controller"}, {"printer": "iRA C3330i", "ipaddress": "172.16.133.30", "notes": ""}, {"printer": "CiR LBP 5360", "ipaddress": "172.16.153.61", "notes": ""}, {"printer": "iR LBP 3460", "ipaddress": "172.16.34.60", "notes": ""}, {"printer": "iPF610", "ipaddress": "172.16.60.10", "notes": ""}, {"printer": "iPF850", "ipaddress": "172.16.185.3", "notes": ""}, {"printer": "iPF 8300", "ipaddress": "172.16.183.10", "notes": ""}, {"printer": "iPF 9400", "ipaddress": "172.16.194.10", "notes": ""}, {"printer": "iPF 6350", "ipaddress": "172.16.163.50", "notes": ""}, {"printer": "iPF 6450", "ipaddress": "172.16.164.50", "notes": ""}, {"printer": "iPFPro4000", "ipaddress": "172.16.40.4", "notes": ""}, {"printer": "iPFTX4000", "ipaddress": "172.16.40.10", "notes": ""}, {"printer": "Colortrac AIO WinPC", "ipaddress": "172.16.41.10", "notes": "Windows 10 All in one touch screen PC for Colortrac scanner"}, {"printer": "iRA C5051", "ipaddress": "172.16.150.50", "notes": "TSC"}, {"printer": "iRA C7260", "ipaddress": "172.16.172.60", "notes": ""}, {"printer": "iPr C800", "ipaddress": "172.16.106.22", "notes": "F200 Controller/PRISMASync Controller 172.16.106.22"}, {"printer": "iRA C5240", "ipaddress": "10.192.5.19", "notes": ""}, {"printer": "iRA C9075", "ipaddress": "10.192.5.213", "notes": "A1 Controller"}, {"printer": "iPr C10000VP", "ipaddress": "172.16.201.74", "notes": "when C10000 is connected with PRISMASync Controller"}, {"printer": "iPr C10000VP", "ipaddress": "172.16.102.53", "notes": "B5000 Controller  "}, {"printer": "iRA 8505i", "ipaddress": "172.16.85.5", "notes": "Y1 Controller"}, {"printer": "iRA 6575i", "ipaddress": "172.16.65.75", "notes": ""}, {"printer": "iRA C5560i", "ipaddress": "172.16.155.60", "notes": "Was 10.192.5.222"}, {"printer": "iRA C7570i", "ipaddress": "172.16.175.70", "notes": "GX500"}, {"printer": "iRA C5535i", "ipaddress": "172.16.155.35", "notes": "System Engineering"}, {"printer":"iRA 5535 III", "ipaddress":"172.16.155.37", "notes":""}],
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

             /*
            <TableRow>
              <TableCell component="th" scope="row">
                {row.printer}
              </TableCell>
              <TableCell align="right">{row.ipaddress}</TableCell>
              <Status style={{width: 70}} ipaddress={row.ipaddress} />
              <TableCell align="right">{row.notes}{this.state.loggedin ? <Button>Edit</Button>: null}</TableCell>
            </TableRow> */
          ))}
        </TableBody>
      </Table>
    
          { /*
            this.state.printerList.map( (value) => {
            return(
              <div style={{flexDirection:"row"}}>
             
          <Paper style={{width: 70}} >{value.printer}</Paper>
        
          <Paper style={{width: 70}} >{value.ipaddress}</Paper>
          <Status style={{width: 70}} ipaddress={value.ipaddress} />
          <Paper style={{width: 70}} >{value.notes}</Paper>
        
       
          
        
        </div>
            );
          }) */
          }
       
      </Paper>
    );
  }
}

export default App;
