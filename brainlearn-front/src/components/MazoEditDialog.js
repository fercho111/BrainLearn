import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BiEdit} from "react-icons/bi";
import './MazoEditDialog.css';

 


function MazoEditDialog({onImageSelect, onTitleChange}) {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [title, setTitle] = useState('');
  const [localTitle, setLocalTitle] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setLocalTitle(title);
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
    setLocalTitle(event.target.value);
  }

  const handleSaveChanges = () => {
    onImageSelect(selectedImage);
    onTitleChange(localTitle);

    handleClose();
  }
  

  return (
    

    <>
      <button className="boton_edit" variant="primary" onClick={handleShow}
      style={{
        border: 'none',
        color: '#e6e6eb',
        backgroundColor: 'rgba(68,185,196,1)',
        borderRadius: '10px',
        padding: 'auto'
      }}><BiEdit /></button> 

      <Modal  centered="true" animation show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <Modal.Title>Editar Mazo</Modal.Title>
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
              <Form.Control type="text" placeholder="Titulo" onChange={handleTitleChange}/>
            </Form.Text>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MazoEditDialog;