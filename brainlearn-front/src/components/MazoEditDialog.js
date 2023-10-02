import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BiEdit} from "react-icons/bi";
import './MazoDialog.css';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

 


function MazoEditDialog({onImageSelect, onTitleChange, modal_title, icon, className_icon,style_icon, submit_text, onSubmit}) {
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
    event.preventDefault();
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
    onImageSelect(selectedImage);
    onTitleChange(localTitle);
    handleClose();
    

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
            {submit_text}
          </Button>
        </Modal.Footer>
      </Modal>
      
      
    </>
  );
}

export default MazoEditDialog;