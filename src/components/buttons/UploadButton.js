import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import AGMModal from '../modal/index';

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
            fileType: this.props.fileType,
            show: false,
            modalHeading: '',
            modalDetails: '',
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
            this.handleShowModal(
                'Transfer Complete!',
                'Your Arduboy was flashed successfully'
            );
        } catch (e) {
            console.error(`could not upload Arduboy file: ${e}`);
            this.handleShowModal(
                'Transfer Failed!',
                'Could not transfer file to your Arduboy. Please verify the file is correct'
            );
        }
    }

    handleCloseModal = () => {
        this.setState({
            show: false
        });
    }

    handleShowModal = (modalHeading, modalDetails) => {
        this.setState({
            show: true,
            modalHeading,
            modalDetails
        });
    }

    render() {
        return (
            <>
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
                <AGMModal
                    show={this.state.show}
                    onHide={this.handleCloseModal}
                    heading={this.state.modalHeading}
                    details={this.state.modalDetails} />
            </>
        );
    }
}

export default UploadButton;
