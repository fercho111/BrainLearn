import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { IoMdAdd} from "react-icons/io";
import './MazoDialog.css';
import { v4 as uuidv4 } from 'uuid';

 


function MazoCrearDialog({modal_title, className_icon,style_icon, submit_text, onSubmit}) {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [title, setTitle] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(false);
  

  const handleClose = () => {
    setShow(false);
    setSelectedImage('');
    setTitle('');
    setIsTitleValid(false);
    }

  const handleShow = () => {
    setShow(true);
    
  }

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleTitleChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
    setIsTitleValid(event.target.value.trim() !== '');
  }

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if(isTitleValid){
        const deckNuevo ={
        title: title
        }
        onSubmit(deckNuevo);
        handleClose();
    }
  }
  

  return (
    

    <>
      <button className={className_icon} variant="primary" onClick={handleShow}
      style={style_icon}><IoMdAdd size={70}/></button> 
      
      
      <Modal  animation show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"centered>
        <Modal.Header  closeButton>
          <Modal.Title>{modal_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form onSubmit={handleSaveChanges}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Imagen de fondo</Form.Label>
              <Form.Control type="file" accept=".jpg, .jpeg, .png"
              onChange={handleImageSelect} />
            </Form.Group>
            <Form.Text className="mb-3  form_titulo">
              <Form.Label>Titulo</Form.Label>
              <Form.Control type="text" placeholder="Titulo" onChange={handleTitleChange}/>
            </Form.Text>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveChanges}>
            {submit_text}
          </Button>
        </Modal.Footer>
      </Modal>
      
      
    </>
  );
}

export default MazoCrearDialog;