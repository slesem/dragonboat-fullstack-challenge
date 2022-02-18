import React, { useState } from "react";
import styled from "styled-components";

import { Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Button } from "@material-ui/core/";
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
              <TableCell sx={{ padding: 2}}></TableCell>
              <TableCell sx={{}}></TableCell>              
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
                  <Button variant="outlined" onClick={() => openModal(p, 'Edit')}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => deleteProjectById(p.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button variant="outlined" onClick={() => openModal(null, 'Add')}>
          Add Project
        </Button>
      </div>
      {isOpen && (<InputComponent project={project} type={type}> </InputComponent>)}
    </>
  );
};

const Title = styled(Typography)`
  padding: 20px 0 20px 13px;
`;

export default Component;
