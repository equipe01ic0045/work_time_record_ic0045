'use client'

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Select,
  Input,
  Box,
} from '@chakra-ui/react';

function AddUser({isOpen, handleChange, handleConfirm, toggleModal, handleSelectChange}:any) {
    // const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      role: 'User',
      horas: '',
      email: '',
    });
  
    // const toggleModal = () => {
    //   setIsOpen(!isOpen);
    // };
  
    // const handleSelectChange = (
    //   e: React.ChangeEvent<HTMLSelectElement>
    // ) => {
    //   const { value } = e.target;
    //   setFormData({
    //     ...formData,
    //     role: value,
    //   });
    // };
  
    // const handleChange = (
    //   e: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //   const { name, value } = e.target;
    //   setFormData({
    //     ...formData,
    //     [name]: value,
    //   });
    // };
  
    // const handleConfirm = () => {
      
    //   console.log(formData);
    
    //   setIsOpen(false);
    // };

  return (
    <>
      {/* <Button onClick={toggleModal}>Add User</Button> */}

      <Modal isOpen={isOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Criar Novo Usuário</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Table >
              <Tbody>
                <Tr>
                  <Td>Role:</Td>
                  <Td>
                    <Select
                      name="role"
                      value={formData.role}
                      onChange={handleSelectChange}
                    >
                      <option value="Admin">Administrador</option>
                      <option value="Colaborator">Colaborador</option>
                    </Select>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Horas:</Td>
                  <Td>
                    <Input
                      type="number"
                      name="horas"
                      value={formData.horas}
                      onChange={handleChange}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Email:</Td>
                  <Td>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Box textAlign="center" width="100%">
              <Button
                colorScheme="green"
                color="white"
                onClick={handleConfirm}
              >
                Confirmar
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddUser;
