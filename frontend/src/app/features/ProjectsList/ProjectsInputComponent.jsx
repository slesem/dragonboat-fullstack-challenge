import React, { useState } from "react";
import styled from "styled-components";

import { Typography, List, ListItem, TextField, Button } from "@material-ui/core/";
import { updateProject, createProject } from "../../store/projects/actions";
import { useDispatch } from "react-redux";

const InputComponent = ({ project, type }) => {

  const [title, setTitle] = useState(project?.title || "");
  const [author, setAuthor] = useState(project?.author || "");
  const [startDate, setStartDate] = useState(project?.start_date || "");
  const [endDate, setEndDate] = useState(project?.end_date || "");

  const dispatch = useDispatch();
  
  const handleChange = (e) => {
      e.preventDefault();
      
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
  }

  return (
    <>
      <Title variant="h4">{type} Project</Title>
      <List>
          <ListItem>
            <TextField
                id="Title"
                label="Title"
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
                label="Start Date"
                defaultValue={startDate}
                helperText="mm/dd/yyyy"
                onChange={handleChange}

            />          
          </ListItem>
          <ListItem>
            <TextField
                id="EndDate"
                label="End Date"
                defaultValue={endDate}
                helperText="mm/dd/yyyy"
                onChange={handleChange}
            />          
          </ListItem>
      </List>
      <div>
        <Button variant="outlined" onClick={saveProject}>
          Save Project
        </Button>
      </div>
    </>
  );
};

const Title = styled(Typography)`
  padding: 20px 0 20px 13px;
`;

export default InputComponent;
