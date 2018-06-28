import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup } from 'semantic-ui-react';
//import ModalAdding from './Component/ModalAdding.jsx';





{/* Model class customer */}
class Customer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            serviceList: []
        };
        
        this.loadData = this.loadData.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        
    }


    componentDidMount() {
        this.loadData();
    }

    loadData() {
        
        //ajax call logic
        fetch('/Customers/GetCustomersDetails').then(response => {
            response.json().then(data => {
                //console.log(data);
                this.setState({
                    serviceList: data
                })
            })
        })
    }


    add(event) {
        // ajax call logic     
        const formData = new FormData(event.target)
        let dataJSON = {}

        event.preventDefault()
        
        for (let entry of formData.entries()) {
            dataJSON[entry[0]] = entry[1]
        }
        
        console.log(dataJSON)
        
        fetch('/Customers/PostAddOneCustomer', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataJSON)
        }).then(response => {
            response.json().then(data => {
                console.log(data);
                window.location.reload();
            })
        })

       // this.refs.form.reset();
    }

    update(id) {
        //ajax call logic
        const formData = new FormData(event.target)
        let convertID = JSON.stringify(id)
        let dataJSON = {Id : convertID}
        event.preventDefault()
        for (let entry of formData.entries()) {
            dataJSON[entry[0]] = entry[1]
        }
        alert(JSON.stringify(dataJSON));
        
        $.ajax({
            url: "/Customers/PostUpdateOneCustomer",
            type: "POST",
            dataType: "JSON",
            data: JSON.stringify(dataJSON),
            success: function (response) {   
                alert('updated')
                $.each( response, function( index, value ){
                    console.log(value);
                })             
                window.location.reload(); // refresh the page
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(textStatus, errorThrown);
            }
        })
        
    }

    delete(id) {
        //ajax call logic
        $.ajax({
            url: "/Customers/DeleteOneCustomer?customerId=" + id,
            type: "POST",
            dataType: "JSON",
            success: function (response) {                 
                //console.log(response)
                window.location.reload(); // refresh the page

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }



    render() {        
        let serviceList = this.state.serviceList;

        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map(service => 
                <tr key={service.Id}>
                    <td className="two wide">{service.Name}</td>
                    <td className="ten wide">{service.Address}</td>
                    <td className="four wide">
                      <Modal id="modal" trigger={<i className="outline write icon">Edit</i>}  >
                        <Modal.Header >Details customer</Modal.Header>
                            <Modal.Content> 
                                <form ref="form" method="POST" onSubmit={this.update.bind(this,service.Id)}>        
                                    <label>Name</label><br />
                                    <input type="text" placeholder="Type a name" name="name" placeholder={service.Name} /><br />
                                    <label>Address</label><br />
                                    <input placeholder="Type an address" name="address" placeholder={service.Address} /><br />
                                    <input type="submit" value="save"  />            
                                </form> 
                            </Modal.Content>
                        </Modal>                             
                    </td>
                    <td className="four wide">
                        <i className="remove icon" onClick={this.delete.bind(this, service.Id)}>Delete</i>
                    </td>
                </tr>
           )
        }
    return (
        <React.Fragment>
            <div>  
                <Modal id="modal" trigger={<Button id="buttonModal">Add a new customer</Button>}  >
                    <Modal.Header >Add a new customer</Modal.Header>
                    <Modal.Content> 
                        <form onSubmit={this.add} ref="form" method="POST">        
                            <label>Name</label><br />
                            <input type="text" placeholder="Type a name" name="name" /><br />                            
                            <label>Address</label><br />
                            <input placeholder="Type an address" name="address" /><br />
                            <input type="submit" value="save" />            
                        </form>     
                    </Modal.Content>
                </Modal>  
                <table className="ui striped table">
                    <thead>
                        <tr>
                            <th className="two wide">Customer name</th>
                            <th className="ten wide">Address</th>
                            <th className="four wide">Action (Edit)</th>
                        <th className="four wide">Action (Delete)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {tableData}
                        </tbody>
                        </table>
                        </div>
               </React.Fragment>      
            )
    }
}





{/* rendering the component */}
const app = document.getElementById('app');
ReactDOM.render(<div><h1>hello</h1><Customer /></div>,app);