import React from 'react';
import Button from 'react-bootstrap/Button';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <Button variant="primary" size="md" block>Upload Hex</Button>
            <Button variant="primary" size="md" block>Upload Arduboy File</Button>
            <Button variant="primary" size="md" block>Browse Repo</Button>
        </div>
    );
}

export default Sidebar;
