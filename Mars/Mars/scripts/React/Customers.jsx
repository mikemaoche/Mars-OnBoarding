import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup , Form, Table, Label } from 'semantic-ui-react';

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
        
        fetch('/Customers/PostUpdateOneCustomer', {
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

        // ANOTHER WAY
        /*$.ajax({
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
        })*/
        
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
                <Table.Row key={service.Id}>
                    <Table.Cell >{service.Name}</Table.Cell>
                    <Table.Cell >{service.Address}</Table.Cell>
                    <Table.Cell >
                      <Modal id="modal" trigger={<Button color="yellow" ><Icon name="edit" />Edit</Button>}  >
                        <Modal.Header >Details customer</Modal.Header>
                            <Modal.Content> 
                                <Form ref="form" method="POST" onSubmit={this.update.bind(this,service.Id)}>
                                    <Form.Field>
                                    <label>Name</label><br />
                                    <input type="text" placeholder="Type a name" name="name" placeholder={service.Name} required /><br />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Address</label><br />
                                        <input placeholder="Type an address" name="address" placeholder={service.Address} required /><br />
                                    </Form.Field>
                                    <Button type='submit'><Icon name="save" />save</Button>
                                </Form>
                            </Modal.Content>
                        </Modal>
                    </Table.Cell>
                    <Table.Cell>
                        <Button color="red" onClick={this.delete.bind(this, service.Id)}><Icon name="trash" />Delete</Button>
                    </Table.Cell>
                </Table.Row>
           )
        }
    return (
        <React.Fragment>
            <div>
                <Modal id="modal" trigger={<Button color="blue" id="buttonModal">Add a new customer</Button>}  >
                    <Modal.Header >Add a new customer</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.add} ref="form" method="POST">
                            <Form.Field>
                                <label>Name</label><br />
                                <input type="text" placeholder="Type a name" name="name" required /><br />  
                            </Form.Field>   
                            <Form.Field>                         
                                <label>Address</label><br />
                                <input placeholder="Type an address" name="address" required /><br />
                            </Form.Field>
                            <Button type='submit'><Icon name="save" />save</Button>         
                        </Form>
                    </Modal.Content>
                </Modal>
                      <Table celled>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Customer name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Action (Edit)</Table.HeaderCell>
                            <Table.HeaderCell>Action (Delete)</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {tableData}
                        </Table.Body>
                        <Table.Footer>
                        </Table.Footer>
                      </Table>
                    </div>
               </React.Fragment>      
            )
    }
}





{/* rendering the component */}
const app = document.getElementById('customers');
ReactDOM.render(<div><h1 className="anim">Customer Details</h1><Customer /></div>,app);