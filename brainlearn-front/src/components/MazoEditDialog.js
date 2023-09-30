import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BiEdit} from "react-icons/bi";
 


function MazoEditDialog({onImageSelect, onTitleChange}) {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [title, setTitle] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    onTitleChange(event.target.value);
  }

  const handleSaveChanges = () => {
    onImageSelect(selectedImage);
    onTitleChange(title);
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

      <Modal centered="true" animation show={show} onHide={handleClose}>
        <Modal.Header centered="true" closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body centered="true">
          <Form>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Titulo del Mazo</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={handleTitleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Imagen de fondo</Form.Label>
              <Form.Control type="file" accept=".jpg, .jpeg, .png"
              onChange={handleImageSelect} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MazoEditDialog;