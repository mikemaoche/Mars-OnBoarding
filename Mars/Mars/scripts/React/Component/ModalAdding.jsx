import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ModalAdding = () => (
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
)

export default ModalAdding