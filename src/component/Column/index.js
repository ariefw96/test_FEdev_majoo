import { useState } from 'react';
import { Col } from 'react-bootstrap';

const Column = ({ text }) => {
    return (
        <Col style={{ backgroundColor: '#e6eaf0', margin: '0px 5px' }} className="rounded">
            <div style={{ padding: '5px 0px' }}>
                {text}
            </div>
        </Col>
    )
}

export default Column;