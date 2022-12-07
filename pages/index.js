import * as React from 'react';
import Typography from '@mui/material/Typography';
import {FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, Switch, TextField} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import styles from './index.module.css';
import {useState} from 'react';

export default function Index() {

    const [iosChecked, setIOSChecked] = useState(false);
    const [androidChecked, setAndroidChecked] = useState(false);
    const [websiteChecked, setWebsiteChecked] = useState(false);
    const [softwareChecked, setSoftwareChecked] = useState(false);

    function search(){

    }

    function handleSwitchChange(type){
        switch (type) {
            case 'ios':
                setIOSChecked(!iosChecked);
                break;
            case 'android':
                setAndroidChecked(!androidChecked);
                break;
            case 'website':
                setWebsiteChecked(!websiteChecked);
                break;
            case 'software':
                setSoftwareChecked(!softwareChecked);
                break;
        }
    }

    return (
        <Grid container direction='column' className={styles.mainContainer}>
            <Grid item>
                <Typography variant='h1'>Projects</Typography>
            </Grid>
            <Grid item>
                <TextField
                    id="input-with-icon-textfield"
                    label="Search"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={search}>
                                    <AddCircleIcon/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
            </Grid>
            <Grid item>
                <FormGroup row>
                    <FormControlLabel className={styles.label}
                        control={
                            <Switch checked={iosChecked}
                                    onChange={handleSwitchChange.bind(this, 'ios')}/>
                        }
                        label="iOS"
                        labelPlacement="start"/>
                    <FormControlLabel className={styles.label}
                                      control={
                                          <Switch checked={androidChecked}
                                                  onChange={handleSwitchChange.bind(this, 'android')}/>
                                      }
                                      label="Android"
                                      labelPlacement="start"/>
                    <FormControlLabel className={styles.label}
                                      control={
                                          <Switch checked={websiteChecked}
                                                  onChange={handleSwitchChange.bind(this, 'website')}/>
                                      }
                                      label="Websites"
                                      labelPlacement="start"/>
                    <FormControlLabel className={styles.label}
                                      control={
                                          <Switch checked={softwareChecked}
                                                  onChange={handleSwitchChange.bind(this, 'software')}/>
                                      }
                                      label="Custom software"
                                      labelPlacement="start"/>
                </FormGroup>
            </Grid>
        </Grid>
    )
}
