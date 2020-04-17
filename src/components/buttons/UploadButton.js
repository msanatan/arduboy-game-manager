import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

function slugify(label) {
    return label.toLowerCase().replace(/\s+/g, '-');
}

class UploadButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            inputId: slugify(this.props.label),
            fileType: this.props.fileType
        };
    }

    openFileDialog = () => {
        document.getElementById(this.state.inputId).click();
    }

    render() {
        return (
            <Button
                variant="primary"
                size="lg"
                block
                onClick={this.openFileDialog}>
                {`Upload ${this.state.label}`}
                <input
                    hidden
                    type="file"
                    id={this.state.inputId}
                    name={this.state.inputId}
                    accept={this.state.fileType}
                    className="custom-file-input"/>
            </Button>
        );
    }
}

export default UploadButton;
