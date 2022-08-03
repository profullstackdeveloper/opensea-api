import React from 'react';
import { Button, makeStyles, Divider, ListItemText, ListItem, ListItemIcon, List } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MetamaskIcon from './icons/MetamaskIcon';
import { APIContext } from '../context/APIContext';
import Web3 from 'web3';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    title: {
        display: 'flex',
        height: '64px',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#3f51b5',
        fontSize: '32px',
        fontWeight: 'bold'
    }
}));

export default function Sidebar() {

    const classes = useStyles();

    const { web3Modal } = React.useContext(APIContext);

    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect();
            console.log("Provider is ", provider);
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            console.log('accounts are ', accounts[0]);
        } catch (err) {
            console.log("wallet connection failed!");
        }

    }


    return (
        <div>
            <div className={classes.toolbar}>
                <div className={classes.title}>
                    Opensea API
                </div>
            </div>
            <Divider />
            <List>
                <ListItem button onClick={() => connectWallet()}>
                    <ListItemIcon>
                        <MetamaskIcon></MetamaskIcon>
                    </ListItemIcon>
                    <ListItemText primary={'Connect Wallet'}></ListItemText>
                </ListItem>
                <Divider></Divider>
                <ListItem button>
                    <ListItemIcon>
                        <SearchIcon></SearchIcon>
                    </ListItemIcon>
                    <ListItemText primary={'Filter'}></ListItemText>
                </ListItem>
                <Divider />
            </List>
        </div>
    )
}