import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BiEdit} from "react-icons/bi";
import './MazoDialog.css';


function MazoEditDialog({onImageSelect, onTitleChange, modal_title, id, icon, className_icon, style_icon, submit_text, onSubmit, tituloInicial}) {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState({onImageSelect});
  const [localTitle, setLocalTitle] = useState('');


  // prueba
  useEffect(() => {
    // Set initial values when component mounts
    setLocalTitle(tituloInicial);
  }, [
    tituloInicial
  ]);

  const handleClose = () => {
    setShow(false);
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
    setLocalTitle(event.target.value);
  }

  const handleSaveChanges = (e) => {
    e.preventDefault();
    onTitleChange(localTitle);
    const deck_nuevo = {
      id: id,
      name: localTitle,
      // imagen: selectedImage,
    };
    handleClose();
    onSubmit(deck_nuevo);
    
  }
  
  return (
    
    <>
      <button className={className_icon} variant="primary" onClick={handleShow}
      style={style_icon}><BiEdit/></button> 
      
      
      <Modal animation show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"centered>
        <Modal.Header  closeButton>
          <Modal.Title>{modal_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Imagen de fondo</Form.Label>
              <Form.Control type="file" accept=".jpg, .jpeg, .png"
              onChange={handleImageSelect} />
            </Form.Group>
            <Form.Text className="mb-3  form_titulo">
              <Form.Label>Titulo</Form.Label>
              <Form.Control type="text" placeholder="Titulo" onChange={handleTitleChange} value={localTitle}/>
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

export default MazoEditDialog;