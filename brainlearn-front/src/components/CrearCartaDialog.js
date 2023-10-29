import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { IoMdAdd} from "react-icons/io";
import './MazoDialog.css';
import { v4 as uuidv4 } from 'uuid';


export default function CrearCartaDialog({className_icon, style_icon, submit_text, onSubmit, modal_title, deck_name}) {

    const [show, setShow] = useState(false);
    const [selectedImagePregunta, setSelectedImagePregunta] = useState('');
    const [selectedImageRespuesta, setSelectedImageRespuesta] = useState('');
    const [pregunta, setPregunta] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const [isPreguntaValid, setIsPreguntaValid] = useState(false);
    const [isRespuestaValid, setIsRespuestaValid] = useState(false);

    const handleClose = () => {
        setShow(false);
        setSelectedImagePregunta('');
        setSelectedImageRespuesta('');
        setPregunta('');
        setRespuesta('');
        setIsPreguntaValid(false);
        setIsRespuestaValid(false);
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
        setIsPreguntaValid(event.target.value.trim() !== '');
    }

    const handleRespuesta = (event) => {
        event.preventDefault();
        setRespuesta(event.target.value);
        setIsRespuestaValid(event.target.value.trim() !== '');
    }

    const handleSaveChanges = (e) => {
        e.preventDefault();
        if(isPreguntaValid && isRespuestaValid){
            const cartaNueva ={
            // id: uuidv4(),
            // imagenPregunta: selectedImagePregunta,
            // imagenRespuesta: selectedImageRespuesta,
            question: pregunta,
            answer: respuesta, 
            deck: {
              name: deck_name,
            },
            }
            onSubmit(cartaNueva);
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
            <Form.Text className="mb-3  form_pregunta">
              <Form.Label>Pregunta</Form.Label>
              <Form.Control type="text" placeholder="pregunta" onChange={handlePregunta}/>
            </Form.Text>
            <Form.Group controlId="formFile" className="mb-3">
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
