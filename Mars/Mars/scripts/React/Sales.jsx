import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup , Form, Table, Label, Dropdown } from 'semantic-ui-react';

{/* Model class customer */}
class Sales extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            serviceList: [],
            saleList:[]
        };
        
        this.loadData = this.loadData.bind(this);

        // CRUD
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.handleChange= this.handleChange.bind(this); // dropdown to handle values;
        this.handleDate= this.handleDate.bind(this); // date
    }


    componentDidMount() {
        this.loadData();   

        // date sets today
        const day = new Date().getDay() +1;
        const month = new Date().getMonth() +1;
        const year = new Date().getFullYear();
        this.setState({
            curTime : day + '-' + month + '-' +  year
        });
    }

    loadData() {        
        //ajax call logic
        fetch('/Sales/GetSalesDetails').then(response => { // dropdowns
            response.json().then(data => {   
                /*console.log(data);
                console.log("---------------------------------------")                
                console.log(data[0][0].Id);
                console.log(data[0][0].Name);*/
                this.setState({ serviceList: data })
            })
        });

        fetch('/Sales/GetAllSales').then(response => { // view table
            response.json().then(data => {   
                console.log(data);
                this.setState({ saleList: data })
            })
        });
    }
    
    add(e) {
        e.preventDefault();

        // ajax call logic     
        $.ajax({
            url: "/Sales/PostAddOneSale",
            type: "POST",
            dataType: "JSON",
            data: { 
                customerID: this.state.selectCustomer[0].key,
                productID: this.state.selectProduct[0].key,
                storeID:this.state.selectStore[0].key,
                date:this.state.selectDate,
                /*customer: this.state.selectCustomer[1].value,
                product: this.state.selectProduct[1].value,
                store:this.state.selectStore[1].value,*/ // optional                
            },
            success: function (response) {                 
                console.log(response)       
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        }); 
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
                alert(response)
                window.location.reload()
            },
            error: function(error) {
                alert(error)
            }
        });
    }

    // Handle dropdowns
    handleChange(e,data) // data represents the options with all attributes
    {
        e.preventDefault();
        const { value } = data;
        const { key } = data.options.find(o => o.value === value); // find id
        this.setState({ [data.name] : [{key},{value}] }); // name of the field and [id,value]
    }

    // Handle date
    handleDate(e)
    {
        e.preventDefault();
        this.setState({ [e.target.name] : e.target.value });
    }

        render() {        
            
            let serviceList = this.state.serviceList;
            let saleList = this.state.saleList;

            let tableData = null;
            let add_sale = null; // modal to add a sale

            if (serviceList != "") {      
                const { name, value, key } = this.state; // set the value which would be selected into the dropdown

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
                
                add_sale = <Modal id="modal" trigger={<Button color="blue" id="buttonModal">Add a new sale record</Button>}  >
                                                <Modal.Header >Add a new sale</Modal.Header>
                                                <Modal.Content>
                                                    <Form onSubmit={this.add.bind(this)} ref="form" method="POST">
                                                        <Form.Field>
                                                            <label>Select customer</label><br />
                                                            <Dropdown selection options={options_customers} onChange={this.handleChange} name="selectCustomer" placeholder='Select Customer' /><br />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Product name</label><br />
                                                        <Dropdown selection options={options_products} onChange={this.handleChange} name="selectProduct" placeholder='Select Product' /><br />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Store name</label><br />
                                                        <Dropdown selection options={options_stores} onChange={this.handleChange} name="selectStore" placeholder='Select Store' /><br />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Date</label><br />
                                                        <input type="date"  onChange={this.handleDate} name="selectDate" min={this.state.curTime} required /><br />
                                                    </Form.Field>
                                                    <Button type='submit'><Icon name="save" />save</Button>         
                                                </Form>
                                            </Modal.Content>
                                        </Modal>
            }
            if (saleList != "") {
                tableData = saleList.map(service => 
                    <Table.Row key={service.Id}>
                        <Table.Cell >{service.Customer.Name}</Table.Cell>
                        <Table.Cell >{service.Product.Name}</Table.Cell>
                        <Table.Cell >{service.Store.Name}</Table.Cell>
                        <Table.Cell >{service.DateSold}</Table.Cell>
                        <Table.Cell >
                        <Modal id="modal" trigger={<Button color="yellow"><Icon name="edit" />Edit</Button>}  >
                            <Modal.Header >Details sold</Modal.Header>
                                <Modal.Content> 
                                    <Form ref="form" method="POST" onSubmit={this.update.bind(this,service.Id)}>
                                        <Form.Field>
                                            <label>Customer name</label><br />
                                            <input type="text" name="name" placeholder={service.Customer.Name} required /><br />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Product name</label><br />
                                            <input name="product" placeholder={service.Product.Name} required /><br />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Store name</label><br />
                                            <input name="store" placeholder={service.Store.Name} required /><br />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Date sold</label><br />
                                            <input type="text" name="date" placeholder={service.DateSold} required /><br />
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
                    {add_sale}                                      
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