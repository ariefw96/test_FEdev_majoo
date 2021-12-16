import { useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import { BsTrashFill, BsArrowRightSquareFill, BsArrowLeftSquare } from 'react-icons/bs';

const Content = ({ arrayContent, functionPrev, functionNext, ready }) => {
    return (
        <Col >
            {arrayContent.map((value, index) => {
                return (
                    <div className="d-flex justify-content-between mt-2 mb-2 rounded" style={{ backgroundColor: '#e6eaf0', padding: '5px' }}>
                        {
                            <Button className="btn-danger" onClick={() => functionPrev(value)}>{ready ? <BsTrashFill /> : <BsArrowLeftSquare />}</Button>
                        }
                        <div style={{ marginTop: "5px" }}>{value}</div>
                        {
                            functionNext != null ? <Button className="btn-primary" onClick={() => functionNext(value)}><BsArrowRightSquareFill /></Button> : <Button style={{ backgroundColor: 'transparent', border: 0 }} disabled />
                        }
                    </div>
                )
            })}
        </Col>
    )
}

export default Content;