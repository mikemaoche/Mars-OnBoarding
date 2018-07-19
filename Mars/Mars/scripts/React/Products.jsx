import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup , Form, Table, Label } from 'semantic-ui-react';

{/* Model class product */}
class Products extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            serviceList: []
        };
        
        this.loadData = this.loadData.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        
        //ajax call logic
        fetch('/Products/GetProductsDetails').then(response => {
            response.json().then(data => {
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
        
        fetch('/Products/PostAddOneProduct', {
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

    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    update(id) {
        //ajax call logic
        var data= {
            name: this.state.name,
            price : this.state.price,
            id : id
        }

        $.ajax({
            url: '/Products/PostUpdateOneProduct',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).done((data) => {
            console.log(data);
            this.setState({
                serviceList: data
            })
            
        });
        
    }

    delete(id) {
        //ajax call logic
        $.ajax({
            url: "/Products/DeleteOneProduct?productId=" + id,
            type: "POST",
            dataType: "JSON",
            success: function (response) {                 
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
                    <Table.Cell >{service.Price}</Table.Cell>
                    <Table.Cell >
                      <Modal id="modal" trigger={<Button color="yellow"><Icon name="edit" />Edit</Button>}  >
                        <Modal.Header >Details product</Modal.Header>
                            <Modal.Content> 
                                <Form ref="form" method="POST" onSubmit={this.update.bind(this,service.Id)}>
                                    <Form.Field>
                                    <label>Name</label><br />
                                    <input type="text" name="name" placeholder={service.Name} onChange={this.handleChange} required /><br />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Price</label><br />
                                        <input name="price" placeholder={service.Price} onChange={this.handleChange} required /><br />
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
                                        <Modal id="modal" trigger={<Button color="blue" id="buttonModal">Add a new price</Button>}  >
                                            <Modal.Header >Add a new product</Modal.Header>
                                            <Modal.Content>
                                                <Form onSubmit={this.add} ref="form" method="POST">
                                                    <Form.Field>
                                                        <label>Name</label><br />
                                                        <input type="text" placeholder="Type a name for the product" name="name" required /><br />  
                                                    </Form.Field>   
                                                    <Form.Field>                         
                                                        <label>Price</label><br />
                                                        <input placeholder="Type an price" name="price" /><br />
                                                    </Form.Field>
                                                    <Button type='submit'><Icon name="save" required />save</Button>         
                                                </Form>
                                            </Modal.Content>
                                        </Modal>
                                              <Table celled>
                                                <Table.Header>
                                                  <Table.Row>
                                                    <Table.HeaderCell>Product name</Table.HeaderCell>
                                                    <Table.HeaderCell>Price</Table.HeaderCell>
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
const app = document.getElementById('products');
ReactDOM.render(<div><h1 className="anim">Products Details</h1><Products /></div>,app);