import React, { Component } from 'react';
import Axios from 'axios'
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import {config} from './config';


class Status extends Component {



sendPing() {
  Axios.post("ping", {printer: this.props.ipaddress}).then((val)=>{
    //console.log("Successful ping")
    //console.log(val)
    if (val.data.status) {
        this.setState({color:"green"})
        this.setState({text: config.statusText.online})
    }
    else {
        this.setState({color:"red"})
        this.setState({text: config.statusText.offline})
    }
}).catch((val)=>{
    //console.log(val)
})}
    

state = {
  color: "white",
  text: null,
  time: null
}

componentWillMount() {
this.sendPing()
}

componentDidMount() {
    this.interval = setInterval(() => { this.sendPing() }, 15000);
  }
  componentWillUnmount() {
    this.sendPing()
    clearInterval(this.interval);
  }

  render() {
    return (
        <TableCell >
          <Button onClick={() => {
          window.open("http://"+this.props.ipaddress)
        }} style={{backgroundColor: this.state.color, width: 80}}>{this.state.text}</Button>
        </TableCell>
    );
  }
}

export default Status;
