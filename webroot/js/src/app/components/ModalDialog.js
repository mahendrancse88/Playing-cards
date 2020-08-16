import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class ModalDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: props.Show,
      nbrPlayer: props.nbrPlayer
    };
  }

  handleDistribute = () => {
    this.setState({ open: false });
    this.props.AjaxDistribute($("#NumberOfPlayersId").val());
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  showDialog(){
    this.setState({ open: true });
  }
  render() {

    return (
        <div>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Number of players</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the number of players, then click the distribute button.
              </DialogContentText>
              <TextField
                  autoFocus
                  margin="dense"
                  id="NumberOfPlayersId"
                  label="Number of players"
                  type="number"
                  maxLength="53"
                  fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleDistribute} color="primary">
                Distribute
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
  }
}