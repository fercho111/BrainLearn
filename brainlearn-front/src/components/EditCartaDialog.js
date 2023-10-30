import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BiEdit} from "react-icons/bi";
import './MazoDialog.css';

export default function EditCartaDialog({className_icon, style_icon, submit_text, onSubmit, modal_title, onImagePregunta, onImageRespuesta, onPregunta, onRespuesta}) {

    const [show, setShow] = useState(false);
    const [selectedImagePregunta, setSelectedImagePregunta] = useState('');
    const [selectedImageRespuesta, setSelectedImageRespuesta] = useState('');
    const [pregunta, setPregunta] = useState('');
    const [respuesta, setRespuesta] = useState('');

    const handleClose = () => {
      setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleImagePregunta = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
        setSelectedImagePregunta(reader.result);
        }

        if (file) {
        reader.readAsDataURL(file);
        }
    }

    const handleImageRespuesta = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
        setSelectedImageRespuesta(reader.result);
        }

        if (file) {
        reader.readAsDataURL(file);
        }
    }

    const handlePregunta = (event) => {
        event.preventDefault();
        setPregunta(event.target.value);
    }

    const handleRespuesta = (event) => {
        event.preventDefault();
        setRespuesta(event.target.value);
    }

    const handleSaveChanges = (e) => {
        e.preventDefault();
        onImagePregunta(selectedImagePregunta);
        onImageRespuesta(selectedImageRespuesta);
        onPregunta(pregunta);
        onRespuesta(respuesta);
        const carta_nueva = {
            id: id,
            question: pregunta,
            answer: respuesta,
            
        };
        handleClose();
        onSubmit(carta_nueva);
    }




  return (
    <>
      <button className={className_icon} variant="primary" onClick={handleShow}
      style={style_icon}><BiEdit/></button> 
      
      
      <Modal  animation show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"centered>
        <Modal.Header  closeButton>
          <Modal.Title>{modal_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form onSubmit={handleSaveChanges}>
            <Form.Text className="mb-3  form_pregunta formcito">
              <Form.Label>Pregunta</Form.Label>
              <Form.Control type="text" placeholder="pregunta" onChange={handlePregunta}/>
            </Form.Text>
            <Form.Group controlId="formFile" className="mb-3 formcito">
              <Form.Label>Imagen de pregunta</Form.Label>
              <Form.Control type="file" accept=".jpg, .jpeg, .png"
              onChange={handleImagePregunta} />
            </Form.Group>
            <Form.Text className="mb-3  form_titulo">
              <Form.Label>Respuesta</Form.Label>
              <Form.Control type="text" placeholder="Titulo" onChange={handleRespuesta}/>
            </Form.Text>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Imagen de Respuesta</Form.Label>
              <Form.Control type="file" accept=".jpg, .jpeg, .png"
              onChange={handleImageRespuesta} />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveChanges}>
            {submit_text}
          </Button>
        </Modal.Footer>
      </Modal>
      
      
    </>
  )
}
