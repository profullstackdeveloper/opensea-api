import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { APIContext } from '../context/APIContext';
import CollectionCard from '../components/CollectionCard';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: '#80808036'
    }
}))

export default function Home () {

    const classes = useStyles();
    const { filteredCollections } = React.useContext(APIContext);

    return (
        <div className={classes.container}>
            {
                filteredCollections.length > 0 ? filteredCollections.map((collection, index) => {
                    return (
                        <CollectionCard
                            key={index}
                            createdDate={collection.created_date}
                            description={collection.description}
                            imageUrl={collection.image_url}
                            bannerImageUrl={collection.banner_image_url}
                            largeImageUrl={collection.large_image_url}
                            name={collection.name}
                            payOutAddress={collection.payout_address}
                        ></CollectionCard>
                    )
                })
                : <div style={{width: '100%', height: '800px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    No Collections
                </div>
            }
        </div>
    )
}