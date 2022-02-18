import React, { useState } from "react";
import styled from "styled-components";

import { Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Button, Box } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import { deleteProject } from "../../store/projects/actions";
import { useDispatch } from "react-redux";
import InputComponent from "./ProjectsInputComponent";

const Component = ({ projects }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [project, setProject] = useState({})
  const [type, setType] = useState("")


  const dispatch = useDispatch();
  

  const deleteProjectById = (id) => {
    dispatch(deleteProject(id));
  } 

  const openModal = (project, type) => {
    setProject(project)
    setType(type)
    setIsOpen(true)
  }

  const closeModal = (e) => {
    setIsOpen(false);
    setProject({});
    setType("")
  }

  return (
    <>
      <Title variant="h4">Projects List</Title>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.author}</TableCell>
                <TableCell>{p.start_date}</TableCell>
                <TableCell>{p.end_date}</TableCell>
                <TableCell>
                  <Box m={1}>
                    <Button variant="outlined" onClick={() => openModal(p, 'Edit')}>
                      Edit
                    </Button>
                  </Box>
                  <Box>
                    <Button variant="outlined" onClick={() => deleteProjectById(p.id)}>
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={2}>
        <Button variant="outlined" onClick={() => openModal(null, 'Add')}>
          Add Project
        </Button>
      </Box>
      {isOpen && (
        <PopupModal>
          <InputComponent project={project} type={type} closeModal={closeModal}></InputComponent>
        </PopupModal>
      )}
    </>
  );
};

const Title = styled(Typography)`
  padding: 20px 0 20px 13px;
`;

const PopupModal = styled.div`
  z-index: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  height: auto;
  width: 50%;
  background: rgba(192,192,192,0.3);
  transform: translate(-50%,-50%);
  backdrop-filter: blur(20px);
`;

export default Component;
