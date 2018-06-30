import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup , Form, Table, Label, Dropdown } from 'semantic-ui-react';

{/* Model class customer */}
class Sales extends React.Component {
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
        fetch('/Sales/GetSalesDetails').then(response => {
            response.json().then(data => {
                console.log(data);
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
        
        fetch('/Sales/PostAddOneSale', {
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
        
        fetch('/Sales/PostUpdateOneSale', {
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
            url: "/Sales/DeleteOneSale?saleId=" + id,
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
                <Table.Row key={"hi"}>
                    <Table.Cell >{"hi"}</Table.Cell>
                    <Table.Cell >{"hi"}</Table.Cell>
                    <Table.Cell >{"hi"}</Table.Cell>
                    <Table.Cell >{"hi"}</Table.Cell>
                    <Table.Cell >
                      <Modal id="modal" trigger={<Button color="yellow" class="ui basic modal button"><Icon name="edit" />Edit</Button>}  >
                        <Modal.Header >Details sale</Modal.Header>
                            <Modal.Content> 
                                <Form ref="form" method="POST" onSubmit={this.update.bind(this,service.Id)}>
                                    <Form.Field>
                                        <label>Select customer</label><br />
                                        <Dropdown placeholder='Select Customer' fluid search selection options={"hi"} /><br />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Product name</label><br />
                                        <Dropdown placeholder='Select Product' fluid search selection options={"hi"} /><br />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Store name</label><br />
                                       <Dropdown placeholder='Select Store' fluid search selection options={"hi"} /><br />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Date</label><br />
                                        <input type="date" name="date" /><br />
                                    </Form.Field>
                                    <button class="ui grey button" type='submit'><Icon name="save" />save</button>
                                </Form>
                            </Modal.Content>
                        </Modal>
                    </Table.Cell>
                    <Table.Cell>
                        <Button color="red" class="ui basic modal button" onClick={this.delete.bind(this, service.Id)}><Icon name="trash" />Delete</Button>
                    </Table.Cell>
                </Table.Row>
           )
                        }
                            return (
                                <React.Fragment>
                                    <div>
                                        <Modal id="modal" trigger={<Button color="blue" class="ui basic modal button" id="buttonModal">Add a new sale record</Button>}  >
                                            <Modal.Header >Add a new sale</Modal.Header>
                                            <Modal.Content>
                                                <Form onSubmit={this.add} ref="form" method="POST">
                                                    <Form.Field>
                                                        <label>Select customer</label><br />
                                                        <Dropdown placeholder='Select Customer' fluid search selection options={"hi"} /><br />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Product name</label><br />
                                                        <Dropdown placeholder='Select Product' fluid search selection options={"hi"} /><br />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Store name</label><br />
                                                        <Dropdown placeholder='Select Store' fluid search selection options={"hi"} /><br />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Date</label><br />
                                                        <input type="date" name="date" /><br />
                                                    </Form.Field>
                                                    <button class="ui grey button" type='submit'><Icon name="save" />save</button>         
                                                </Form>
                                            </Modal.Content>
                                        </Modal>
                                              <Table celled>
                                                <Table.Header>
                                                  <Table.Row>
                                                    <Table.HeaderCell>Customer name</Table.HeaderCell>
                                                    <Table.HeaderCell>Product name</Table.HeaderCell>
                                                    <Table.HeaderCell>Store name</Table.HeaderCell>
                                                    <Table.HeaderCell>Date sold</Table.HeaderCell>
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
const app = document.getElementById('sales');
ReactDOM.render(<div><h1 class="anim">Sales Details</h1><Sales /></div>,app);