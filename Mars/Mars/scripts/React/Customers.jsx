import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup } from 'semantic-ui-react';
import DeleteModal from './Component/DeleteModal.jsx';





{/* Model class customer */}
class Customer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            serviceList: [],
            name:"",
            address:""
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

    add() {
        // ajax call logic
        console.log("add : " + $("#test").val())
        
        /*$.ajax({
            url: "/Customers/AddOneCustomer",
            type: "post",
            data: 
                {
                    name:document.getElementById("customerName").innerHTML,
                    address:document.getElementById("customerAddress").innerHTML
                },
            dataType: "json",
            success: function (response) {                 
                //console.log(response)
                window.location.reload(); // refresh the page

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });*/
    }

    update(id) {
        //ajax call logic
        console.log("update me")
        
    }

    delete(id) {
        //ajax call logic
        $.ajax({
            url: "/Customers/DeleteOneCustomer?customerId=" + id,
            type: "post",
            dataType: "json",
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
        //console.log(this.state.serviceList);
        
        let serviceList = this.state.serviceList;

        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map(service => 
                <tr key={service.Id}>
                    <td className="two wide">{service.Name}</td>
                    <td className="ten wide">{service.Address}</td>
                    <td className="four wide">
                        <i className="outline write icon" onClick={this.update.bind(this, service.Id)}>Edit</i>                        
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
              <Modal
                id="modal"
                trigger={<Button id="buttonModal">Add a new customer</Button>}
                >
                <Modal.Header>Add a new customer</Modal.Header>
                <Modal.Content>   
                    <form action={this.add()}>                
                        <label>Name</label><br />
                        <input id="test" type="text" placeholder="Type a name"  /><br />
                        <label>Address</label><br />
                        <input type="text" placeholder="Type an address" /><br />
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
ReactDOM.render(<div><Customer /></div>,app);