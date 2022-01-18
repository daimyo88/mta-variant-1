import React, { useRef, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles( theme => ({
    filesPreview: {
        padding: '5px 0',
        '& svg': {
            color: '#C21807',
        }
    },
    item: {
        fontSize: '16px',
        margin: '5px 0',
        wordBreak: 'break-all'
    }
}));

const FileUploader = (props) => {
    const fileInput = useRef();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [files, setFiles] = useState([]);

    let allowedArray = [];
    if(props.allowed) {
        allowedArray = props.allowed.split(',');
    }

    const changeFileInputHandler = (e) => {
      const files = [];
      const inputFiles = [...e.target.files];
      inputFiles.forEach((file) => {
          if(file.size > props.max) {
              return;
          }
          if (allowedArray.length) {
              let allowed = false;
              allowedArray.forEach((el) => {
                if(file.name.indexOf(el) !== -1) {
                    allowed = true;
                }
              });
              if(allowed) {
                files.push(file);
              }
          } else {
            files.push(file);
          }
        }) 
      setFiles(files);
    }

    const uploadFiles = () => {
        props.submitHandler(files);
        fileInput.current.value = '';
        setFiles([]);
    }

    const removeFile = (name) => {
        const updatedFiles = files.filter((el) => { return el.name !== name});
        setFiles(updatedFiles);
        if (!updatedFiles.length) {
            fileInput.current.value = '';
        }
    }

    return (
        <div>
            <input 
                style={{display: 'none'}} 
                accept={ props.allowed }
                onChange={ changeFileInputHandler } 
                name="documents" 
                ref={ fileInput } 
                type="file" 
            />
            <Button     
                variant="contained"  
                startIcon={<CloudUploadIcon />}
                onClick ={ () => { fileInput.current.click()}}
            >
                {props.text}
            </Button>
            { !!files.length && <div className={classes.filesPreview}>
                { files.map((el) => {
                    return (
                        <div key={el.name} className={classes.item}>
                            <span>{ el.name } </span>
                            <span className={classes.delete} onClick={ () => { removeFile(el.name)}}>
                                <IconButton style={{marginLeft: '10px'}}>
                                    <CloseIcon />
                                </IconButton>
                            </span>
                        </div>
                    )
                })}
            </div> }

            { !!files.length && <Button     
                variant="contained"
                color="primary"
                onClick= { uploadFiles } >
                { props.uploadText }
            </Button> }

        </div>
    )
}

export default FileUploader;