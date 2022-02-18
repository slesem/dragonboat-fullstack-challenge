import React, { useState } from "react";
import styled from "styled-components";

import { Typography, List, ListItem, TextField, Button, Box, FormControl } from "@material-ui/core/";
import { updateProject, createProject } from "../../store/projects/actions";
import { useDispatch } from "react-redux";

const InputComponent = ({ project, type, closeModal }) => {

  const [title, setTitle] = useState(project?.title || null)
  const [author, setAuthor] = useState(project?.author || null);
  const [startDate, setStartDate] = useState(project?.start_date || null);
  const [endDate, setEndDate] = useState(project?.end_date || null);

  const dispatch = useDispatch();
  
  const handleChange = (e) => {
      const value = e.target.value

      switch(e.target.id) {
        case "Title":
            setTitle(value);
            break;
        case "Author":
            setAuthor(value);
            break;
        case "StartDate":
            setStartDate(value);
            break;
        case "EndDate":
            setEndDate(value);
            break;
        default:
      }
  }
  

  const saveProject = (e) => {
    e.preventDefault();

    const projectObj = {
        title: title,
        author: author,
        start_date: startDate,
        end_date: endDate
    }
    if(type === 'Edit') {
        dispatch(updateProject(project.id, projectObj))
    } else {
        dispatch(createProject(projectObj))
    }

    closeModal();
  }

  const cancelProject = () => {
    closeModal();
  }

  return (
    <>
    <Title variant="h4">{type} Project</Title>
    <form onSubmit={saveProject}>
        <List>
            <ListItem>
                <TextField
                    id="Title"
                    label="Title"
                    required
                    defaultValue={title}
                    onChange={handleChange}
                />          
            </ListItem>
            <ListItem>
                <TextField
                    id="Author"
                    label="Author"
                    defaultValue={author}
                    onChange={handleChange}              
                />          
            </ListItem>
            <ListItem>
                <TextField
                    id="StartDate"
                    type="date"
                    defaultValue={startDate}
                    helperText="mm/dd/yyyy"
                    onChange={handleChange}

                />          
            </ListItem>
            <ListItem>
                <TextField
                    id="EndDate"
                    type="date"
                    defaultValue={endDate}
                    helperText="mm/dd/yyyy"
                    onChange={handleChange}
                />          
            </ListItem>
        </List>

        <div>
            <Box m={1}>
                <Button variant="outlined" type="submit">
                    Save Project
                </Button>
            </Box>
            <Box m={1}>
                <Button variant="outlined" sx={{ display: 'block' }} onClick={cancelProject}>Cancel</Button>
            </Box>
        </div>
    </form>


    </>
  );
};

const Title = styled(Typography)`
  padding: 20px 0 20px 13px;
`;

export default InputComponent;
