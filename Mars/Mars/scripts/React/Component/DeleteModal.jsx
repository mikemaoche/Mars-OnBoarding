﻿import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class DeleteModal extends Component {
    
    constructor(props){
        super(props);
        this.state = { open: false }
    }
    

    closeConfigShow (closeOnEscape, closeOnRootNodeClick) {
        this.setState({ closeOnEscape, closeOnRootNodeClick, open: true });
    }

    close() { this.setState({ open: false }); }

        render() {
            const { open, closeOnEscape, closeOnRootNodeClick } = this.state

            return (
              <div>
                <Button onClick={this.closeConfigShow(false, true)}>No Close on Escape</Button>
                <Button onClick={this.closeConfigShow(true, false)}>No Close on Dimmer Click</Button>

                <Modal
        open={open}
        closeOnEscape={closeOnEscape}
        closeOnRootNodeClick={closeOnRootNodeClick}
      >
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close} negative>
            No
          </Button>
          <Button
        onClick={this.close}
        positive
        labelPosition='right'
        icon='checkmark'
        content='Yes'
      />
    </Modal.Actions>
  </Modal>
</div>
      )
  }
}

export default DeleteModal