import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class Alert extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: props.Show,
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  show(title, text){
    this.setState({ open: true, title: title, text: text});
  }
  render() {

    return (
        <div>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{this.state.title}</DialogTitle>
            <DialogContent>
              <div className={"content"}>
                <div dangerouslySetInnerHTML={{__html: this.state.text}/*avoid HTML tags as plan text.*/} ></div>
              </div>
            </DialogContent>

            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
  }
}