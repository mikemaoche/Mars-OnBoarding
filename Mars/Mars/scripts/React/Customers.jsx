import React from 'react';
import ReactDOM from 'react-dom';
import ModalTest from './Component/ModalTest.jsx';

/*const ModalModalExample = () => (
  <Modal trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='#' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)*/


{/* Model class customer */}
class Customer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            serviceList: []
        };
        
        this.loadData = this.loadData.bind(this);
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

    update(id) {
        //ajax call logic
        console.log("update me")
        
    }

    delete(id) {
        //ajax call logic
   
    }

    render() {
        //console.log(this.state.serviceList);
        
        let serviceList = this.state.serviceList;

        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map(service => 
                <tr key={service.id}>
                    <td className="two wide">{service.Name}</td>
                    <td className="ten wide">{service.Address}</td>
                    <td className="four wide">
                        <i className="outline write icon" onClick={this.update.bind(this, service.id)}>Edit</i>                        
                    </td>
                    <td className="four wide">
                        <i className="remove icon" onClick={this.delete.bind(this, service.id)}>Delete</i>
                    </td>
                </tr>
           )
        }
    return (
        <React.Fragment>
            <div>                
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
ReactDOM.render(<div><ModalTest /><Customer /></div>,app);