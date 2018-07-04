import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup , Form, Table, Label, Dropdown } from 'semantic-ui-react';

{/* Model class customer */}
class Sales extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            serviceList: [],
            values:[]
        };
        
        this.loadData = this.loadData.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.onHandle=this.handleChange.bind(this);
    }


    componentDidMount() {
        this.loadData();
    }

    loadData() {
        
        //ajax call logic
        fetch('/Sales/GetSalesDetails').then(response => {
            response.json().then(data => {   
                /*console.log(data);
                console.log("---------------------------------------")                
                console.log(data[0][0].Id);
                console.log(data[0][0].Name);*/
                this.setState({
                    serviceList: data
                })
            })
        })
    }


    add(event) {
        console.log(event.target.name)
        console.log(event.target.textContent)
        // ajax call logic     
        const formData = new FormData(event.target)
        let dataJSON = {}

        event.preventDefault()
        
        for (let entry of formData.entries()) {
            dataJSON[entry[0]] = entry[1]
        }
        
        console.log(dataJSON)
        
        /*fetch('/Sales/PostAddOneSale', {
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
        })*/
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

    handleChange(name, {value}) 
    {
        this.setState({ values : [name,value] })
    }

    render() {        
            let serviceList = this.state.serviceList;

            let tableData = null;
            let test = null;

            if (serviceList != "") {      
                const { value } = this.state
                // dropdown customers
                let options_customers = [];
                serviceList[0].map((service, i) =>
                    options_customers.push({ key: service.Id , text: service.Name, value: service.Name })) 

                // dropdown products
                let options_products = [];
                serviceList[1].map((service, i) =>
                    options_products.push({ key: service.Id , text: service.Name, value: service.Name }))

                // dropdown stores
                let options_stores = [];
                serviceList[2].map((service, i) =>
                    options_stores.push({ key: service.Id , text: service.Name, value: service.Name }))
                
                test = <Modal id="modal" trigger={<Button color="blue" id="buttonModal">Add a new sale record</Button>}  >
                                                <Modal.Header >Add a new sale</Modal.Header>
                                                <Modal.Content>
                                                    <Form onSubmit={this.add} ref="form" method="POST">
                                                        <Form.Field>
                                                            <label>Select customer</label><br />
                                                            <Dropdown placeholder='Select Customer' fluid selection options={options_customers} onChange={this.handleChange.bind(this,'customerSelected')} value={value} /><br />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Product name</label><br />
                                                        <Dropdown placeholder='Select Product' fluid search selection options={options_products} onChange={this.handleChange.bind(this,'productSelected')} value={value} /><br />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Store name</label><br />
                                                        <Dropdown placeholder='Select Store' fluid search selection options={options_stores} onChange={this.handleChange.bind(this,'storeSelected')} value={value} /><br />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Date</label><br />
                                                        <input type="date" name="date" /><br />
                                                    </Form.Field>
                                                    <Button type='submit'><Icon name="save" />save</Button>         
                                                </Form>
                                            </Modal.Content>
                                        </Modal>

                tableData = serviceList.map(service => 
                    <Table.Row key={service[0].Id}>
                        <Table.Cell >{""}</Table.Cell>
                        <Table.Cell >{""}</Table.Cell>
                        <Table.Cell >{""}</Table.Cell>
                        <Table.Cell >{""}</Table.Cell>
                        <Table.Cell >
                        <Modal id="modal" trigger={<Button color="yellow"><Icon name="edit" />Edit</Button>}  >
                            <Modal.Header >Details sold</Modal.Header>
                                <Modal.Content> 
                                    <Form ref="form" method="POST" onSubmit={this.update.bind(this,service.Id)}>
                                        <Form.Field>
                                            <label>Customer name</label><br />
                                            <input type="text" name="name" placeholder={""} required /><br />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Product name</label><br />
                                            <input name="product" placeholder={""} required /><br />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Store name</label><br />
                                            <input name="store" placeholder={""} required /><br />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Date sold</label><br />
                                            <input type="date" name="date" placeholder={""} required /><br />
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
                                    {console.log(this.state)}
                                    {test}                                      
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
    ReactDOM.render(<div><h1 className="anim">Sales Details</h1><Sales /></div>,app);