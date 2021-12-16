import { useEffect, useState } from 'react';
import { Navbar, Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import Column from '../../component/Column';
import Swal from 'sweetalert2'

const Todolist = () => {
    const [hello, setHello] = useState('To Do List');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('')
    const [taskList, setTaskList] = useState([]);
    const [menu, setMenu] = useState(['Belum Selesai', 'Selesai']);
    const [finish, setFinish] = useState([]);
    const [unfinish, setUnfinish] = useState([]);
    const [itemShow, setItemShow] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [modalTaskShow, setModalTaskShow] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        console.log("DidMount");
        callApi();
    }, []);

    useEffect(() => {
        let taskMajoo = [...taskList];
        let taskSelesai = taskMajoo.filter(({ id, status }) => {
            return status == 1;
        })

        let taskBelumSelesai = taskMajoo.filter(({ id, status }) => {
            return status == 0;
        })

        setFinish([...taskSelesai]);
        setUnfinish([...taskBelumSelesai]);
    }, [taskList])

    const pindahSelesai = () => {
        const id = itemShow;
        let tempTaskList = [...taskList];
        for (let i = 0; i < tempTaskList.length; i++) {
            if (tempTaskList[i].id == id) {
                tempTaskList.push({ ...tempTaskList[i], status: 1 })
                tempTaskList.splice(i, 1);
                i--;
                break;
            }
        }
        setTaskList([...tempTaskList]);
        setModalShow(false);
    }

    const pindahBelumSelesai = () => {
        const id = itemShow;
        let tempTaskList = [...taskList];
        for (let i = 0; i < tempTaskList.length; i++) {
            if (tempTaskList[i].id == id) {
                tempTaskList.push({ ...tempTaskList[i], status: 0 })
                tempTaskList.splice(i, 1);
                i--;
                break;
            }
        }
        setTaskList([...tempTaskList]);
        setModalShow(false);
    }

    const callApi = async () => {
        try {
            const url = 'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list'
            const data = await fetch(url);
            const resp = await data.json();
            setTaskList(resp);
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to fetch API',
                text: e.toString(),
            });
        }
    }

    const addTask = (param) => {
        if (param != null) {
            let tempTaskList = [...taskList];
            tempTaskList.push({
                id: Math.max.apply(Math, taskList.map(({ id }) => id)) + 1,
                title: param.title,
                description: param.desc,
                status: 0,
                createdAt: new Date().toISOString().substring(0, 16).replace("T", " ")
            })
            setTitle('');
            setDesc('');
            setTaskList([...tempTaskList]);
            setModalTaskShow(false);
            Swal.fire({
                icon: 'success',
                title: 'Sukses...',
                text: 'Task berhasil ditambahkan.',
            });
        } else {
            setModalTaskShow(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Task tidak boleh kosong !',
            });
        }
    }

    const editTask = () =>{
        const id = itemShow;
        let tempTaskList = [...taskList];
        for (let i = 0; i < tempTaskList.length; i++) {
            if (tempTaskList[i].id == id) {
                tempTaskList.push({ ...tempTaskList[i], title, description: desc })
                tempTaskList.splice(i, 1);
                i--;
                break;
            }
        }
        setTaskList([...tempTaskList]);
        setEdit(false);
        setModalShow(false);
        setTitle('');
        setDesc('');
        Swal.fire({
            icon: 'success',
            title: 'Sukses...',
            text: 'Task berhasil diupdate.',
        });
    }

    const deleteTask = () => {
        let tempTaskList = [...taskList];
        let newTaskList = tempTaskList.filter(({ id }) => id != itemShow);
        setTaskList([...newTaskList]);
        setModalShow(false);
        Swal.fire({
            icon: 'success',
            title: 'Sukses...',
            text: 'Task berhasil dihapus.',
        });
    }

    const clickToShow = (id) => {
        setItemShow(id);
        setModalShow(true);
    }

    const ModalItems = () => {
        let itemModal = [...taskList];
        let showItemsModal = itemModal.filter(({ id }) => {
            return id == itemShow
        })
        let disableBtn = showItemsModal[0]?.status == 1 ? true : false
        return (
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton onClick={() => setModalShow(false)}>
                    <Modal.Title>{showItemsModal[0]?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Deskripsi : {showItemsModal[0]?.description}</li>
                        <li>Status : {showItemsModal[0]?.status}</li>
                        <li>Waktu : {showItemsModal[0]?.createdAt}</li>
                    </ul>
                    <p onClick={() => setEdit(!edit)} style={{textDecoration:'underline'}}>Klik disini untuk edit data</p>
                    {
                        edit ? (
                            <>
                                <Form>
                                    <Form.Group className="mb-3 col-sm-12" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Judul Task</Form.Label>
                                        <Form.Control defaultValue={showItemsModal[0]?.title} onFocus={e => {setTitle(e.target.value)}}  onChange={e => { setTitle(e.target.value) }} autoComplete="off" placeholder={'title'} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-sm-12" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Deskripsi Task</Form.Label>
                                        <Form.Control defaultValue={showItemsModal[0]?.description} onFocus={e => {setTitle(e.target.value)}}  onChange={e => { setDesc(e.target.value) }} autoComplete="off" placeholder={'description'} />
                                    </Form.Group>
                                </Form>
                                <Button variant="success" onClick={() => editTask()}>Simpan Perubahan</Button>
                            </>
                        ) : ''
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteTask()} disabled={disableBtn}>
                        Hapus To Do List
                    </Button>
                    {
                        showItemsModal[0]?.status == 1 ? (
                            <Button variant="primary" onClick={() => pindahBelumSelesai()}>
                                Pindah Belum Selesai
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={() => pindahSelesai()}>
                                Pindah Selesai
                            </Button>
                        )
                    }
                </Modal.Footer>
            </Modal>
        )
    }

    const modalTambahTask = () => {
        return (
            <Modal show={modalTaskShow} onHide={() => setModalTaskShow(false)}>
                <Modal.Header closeButton onClick={() => setModalTaskShow(false)}>
                    <Modal.Title>Tambah Task Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 col-sm-12" controlId="exampleForm.ControlInput1">
                            <Form.Label>Judul Task</Form.Label>
                            <Form.Control value={title} onChange={e => { setTitle(e.target.value) }} autoComplete="off" placeholder={'title'} />
                        </Form.Group>
                        <Form.Group className="mb-3 col-sm-12" controlId="exampleForm.ControlInput1">
                            <Form.Label>Deskripsi Task</Form.Label>
                            <Form.Control value={desc} onChange={e => { setDesc(e.target.value) }} autoComplete="off" placeholder={'description'} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => addTask({ title, desc })}>
                        Simpan To Do List
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }


    return (
        <>
            <Navbar className="btn-success" style={{ height: '5vh' }} >
                <Container>
                    <Navbar.Brand style={{ color: 'white' }}>Majoo-Indonesia</Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <h1 onClick={() => setModalTaskShow(true)}>Tambah Task</h1>
                <Row className="mt-3">
                    {
                        menu.map((value) => {
                            return (
                                <Column text={value} />
                            )
                        })
                    }
                </Row>
                <Row className="mt-3">
                    <Col>
                        {
                            unfinish?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(({ id, title }) => {
                                return (
                                    <>
                                        {/* <div>{id}</div> */}
                                        <Button variant="warning" className="mb-2" style={{ width: '100%' }} onClick={() => clickToShow(id)}>{title}</Button>
                                    </>
                                )
                            })
                        }
                    </Col>
                    <Col>
                        {
                            finish?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(({ id, title }) => {
                                return (
                                    <>
                                        {/* <div>{id}</div> */}
                                        <Button variant="success" className="mb-2" style={{ width: '100%' }} onClick={() => clickToShow(id)}>{title}</Button>
                                    </>
                                )
                            })
                        }
                    </Col>
                </Row>
            </Container>
            {
                ModalItems()
            }
            {
                modalTambahTask()
            }
        </>
    )
}

export default Todolist;
