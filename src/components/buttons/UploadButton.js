import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

const fs = window.require('fs').promises;
const Avrgirl = window.require('avrgirl-arduino');
const avrgirl = new Avrgirl({
    board: 'leonardo',
    debug: true
});

const flash = (...args) => {
    return new Promise((resolve, reject) => {
        avrgirl.flash(...args, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        })
    })
}

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

    uploadFile = async () => {
        let filePath = document.getElementById(this.state.inputId).files[0].path;
        console.log(filePath);
        try {
            let fileContents = await fs.readFile(filePath);
            await flash(fileContents);
        } catch (e) {
            console.error(`could not upload Arduboy file: ${e}`);
        }
    }

    render() {
        return (
            <Button
                variant='primary'
                size='lg'
                block
                onClick={this.openFileDialog}>
                {`Upload ${this.state.label}`}
                <input
                    hidden
                    type='file'
                    id={this.state.inputId}
                    name={this.state.inputId}
                    accept={this.state.fileType}
                    onChange={this.uploadFile}
                    className='custom-file-input' />
            </Button>
        );
    }
}

export default UploadButton;
