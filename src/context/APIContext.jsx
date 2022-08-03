import React from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import axios from 'axios';

export const APIContext = React.createContext({});

export default function APIContextProvider({ children }) {

    const [assets, setAssets] = React.useState([]);
    const [collections, setCollections] = React.useState([]);
    const [filteredCollections, setFilteredCollections] = React.useState([]);
    const [web3Modal, setWeb3Modal] = React.useState();

    const providerOptions = {
        injected: {
            display: {
                logo: 'data:image/png;base64,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',
                name: 'Metamask',
                description: 'Connect with the provider in your Browser',
            },
            package: null,
        },
        walletconnect: {
            display: {
                logo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QEBAPDw8WEA8QEBUQFREVDxUVFRUSFhcWGBUSGBcYHSggGholGxUTIzMhJSsrLi4wGCIzODMtNy0tLisBCgoKDg0OGxAQGy0mICYtLS0xLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4AMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQYDBQcEAv/EADgQAAIBAgIIAwcCBQUAAAAAAAABAgMRBAYFEiEiMUFRYVJisRMyQnGBwdGhwkNykZKiFCMz4fD/xAAaAQEAAgMBAAAAAAAAAAAAAAAABAUBAgYD/8QAKBEBAAICAgIABgIDAQAAAAAAAAECAwQRMRIhBSJBUWGxEzIjQpFx/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACLgQ5rqGJmI7eHEaawtP38RBPprpv+iPauDLbqsvO2fHXu0PHLNmBX8a/wAqc/wesaOef9XjO7hj6kc24F/xrfOnP8GZ0M8f6kbuGfq9mH01hanuV4N9NdJ/0Z4218te6y9q58dupe9SR4z6ekTz0XDKQAAAAAAAAAAAAAAAAAAAALgeTSGkKNCOvVqKC5X4vslxbPTHivknikcvPJlpSObSp+k87Td44aCivHNXf0jwX1uW2D4T9ck/8Vmb4lPWOP8AqtYzSNet/wAtWU+zls/tWws8etix/wBYV182S/8AaXlPZ5hlgDJYHT1YPSNej/xVZQ7KW7/a9h4X1sd/7Vh61z5Kz6ssujM7TVo4mGsvHBWf1jwf0sVeb4V9ccp+L4lPWSFwwGkKVeOvSmprnbiuzXFMqcmK+KfG8LTHlrkjmsvVc8+XokyAAAAAAAAAAAAAAAACGwK5mPNEMPenTtUrf4w/m6vsT9TRvm929Qg7W5XH6r25/jMXUrTc6s3OT5vp0S5L5HQYsVMdfGkKTJktknm0sJ6tAAAAAAAADNg8XUozVSlNwkua5ro1zXY8smGuSvF4b48lqT5Ul0DLmZ4Yi1OranW/xn/L0fY5/b0bYZ5r7qu9bcrk9T2sdyBynJAAAAAAAAAAAAAAAhgVfOGn5YdKjS2VZxu5+GO1bO+xlhoacZp8rdK/d2v4vljtz+Tbbbd29rfc6OtYrHEKSfc8zKDLABstGaDxOI206doeOWyP0fP6ETNuYsXq0+/tCRi1cuT3EelkweRY/wAau32hFL9ZX9CtyfFrf6V4/wDU+nw2P95bKGTcGuMZy+dR/axGn4lsT9Ye8fD8P2knk3BPhGcflUf3uI+JbEfVmfh+H7S1uMyLH+DXa7Tin+sbehIx/F7x/eOUe/wyv+sq3pPQWJw+2pT3PHHbH6vl9Syw7uHL6ieJQcurkx9taTEYAmLaaadmtqffqYmImOJZiZieYdCydp2WITpVdtWmk9fxR4Xfc5zf1Iwz5V6ld6OzOWvjbuFnRXrAAAAAAAAAAAAAABDA0OZ9ARxUdaO7Wgt18mvC/wAkzT2517cT1KHtasZo5jtzevRlCUoTi4zi7OL4pnS0vFo5r7hQ2rNZmJ9IpU5TkoRi5Sk7JJXbfQXvWkc2KVteeKr3l/KMKaVTEpTqcVDjGPz8T/QoNv4ja8+OP1H3XGtoVp81/crZFWK1ZJAAAAHzKN9g9/Q9fVVMwZRhUTqYZKFTi4cIS+Xhf6Flq/EbY/lv7hXbOjW/zV7USrTlGTjOLjKLs01Zp9C/peLx5Vn0prVms8WZMJhZ1Zxp04605PYvVvou5jLlrirzZnHjvknirpWXdBwwsPFVlbXn+1dkcztbVs9vfX0h0Gtrxhr67bpEVJAAAAAAAAAAABDAw08VTlJwjOMpR4xUk2vmjNqTEczDWL1meIlmRhsMDRZjy9DFR1o2hWirKXJrwy7d+RM1Ny2CePoh7WrGaOY7fOW8uRwq152nXfGXKK8MfyNvctnt69Qa2pXD7ntv0Q0xIADHVrRgnKUlGK4tuyQrE2niGLWivZRrRmlKMlKL4NO6f1ExavqYKzW3UsgZAIYOWgzHlyGKWvFqFZbFLlJdJfkl6u7bBPH0QtnUjNHMepejL+gqeEhZb1WXvTtx7LojXZ2rZ7cz0319auGPy26IyUAYamLpxkoSqRjKXCLkk38lzMxW0xzENJvWJ4mfbMmYbpAAAAAAAA+ZMwKfmvM+rrYfDy3+E6i+Hyx79+RbaGhN5/kydfZWbe5EfLVTMLiJ0pxqU5as4u6fr80XeTFW9PGY9KmmS1LefLpOXNPQxUbO0a0VvQ6+aPVehzW3qWwW/H3X+ts1y1/LdkNKLDgLGRIADz4zFQpQlUqS1YRV236GaVte3jWOWl7xSOZc1zFp2eLn4aMXuw/dLv6evS6mnXBXm3ai2dm2a3EeoMu6dnhJ85UZPeh080e/r6Y29KM0cx3+2uttzhnj6fp0vCYqFWEalOWtCSumjm70tSeLOgpet45hnMNgBYBYCGBpcxafhhYWW9Wkt2HTzS6L1Jepq2z2/H3RNnZjDH5c1xWInVnKpUk5Tk7tv/2xHS48VcdPGI9KG+W17eUrnlTM+tq4fES3+EKjfvdIyfXvzKTe0Zp/kx9LbT3PP/Hfv7rimVSzSAAAAAADVZl9t/pqvsL+0suHG1963e1z31fD+Wvn08Nny/inx7cqR1kfjpzXv69hkZcPXnTnGdOTjOLumjzyY63r42j02paaT5RLpOW9PxxUbO0a0VvR6+aPb0Oa29S2C33hf6u1XNX36lu0yIlpAMDz4zFwowlUqS1YRV2/su5tSlr28a+5aZL1pHMuZ5g05PFz8NKL3Yfuff0Ok09OuCvM9qDZ2bZZ9dNSTkUA22X9OTwk/FSk96H7l39SDt6dc0cx2la2zOKeJ6dMwWLhWhGpTkpQkrp/Z9Gc3kralvG0e3QUvF45hnNWyQIbMTPA0eZMwQwsbK0q0luw6eaXb1JmpqWz2/CJtbVcUflzfE4idScqlSTlOTu2zpceOMdfGFBe03nyliPRqGs8cfhmOZniHVctut/pqXt7+0s+PHVvu372scpteP8ANPh06PW8v4o8u21PBIAAAAAAhoCnZryzra1fDx3venTXxdZRXXtz+fG20d/wn+PJ19JVe3p+XzU7UcvYlThkZMPXnTlGcJOM4u6a4pnnfHW9ZraPTal7Vnyh0jLWYY4qOrK0a8VvR8S8Ufxy/oc3t6lsFufov9Xarljie29uQkt58djIUYSqVJasI8/surN8dLZLeNe2mS8Ujys5np/Tc8XO73aUXuw/c+rOl09SuCv5UG1szllqibx90UAAANroDTdTCTut6lJ78PuujIW3qRnr+UrW2ZxT76dMwWNhWhGpTlrRktj+z6Psc1ek0t427X+O8XjmHouat49tFmXMMMLHUjaVeS3Y8orxS7duZM1NS2eeZ9VQ9rajFHEdub4ivOpKU5ycpyd3J8WzpceOtK+NVDe83tzLGbtQxyR76XfKmWNXVxGIjve9Cm/h6Skuvbl8+FDvb3lzjxz6XOnp8fNdckip+izSZAAAAAAAENAU/NeWNe9fDrf4zpr4vNHzduZa6O/4cY8k+vurNvTi3zUUYv4nlTzHHqewMMlCtKnJThJxnF3TXFM0vjreJrMem1bTSear9ofNlGdFuu1TqU1eS8XeK6voc9sfD8lL8U9xK6wbtLU5t3Co6e01UxU7vdpxe5C/Du+rLfU1K4a/lWbWzbLbj6NWTf8A1GANxl3QM8XK7vGjF70+vlj39CBubsYY4r2l62rOWeZ6MxaBnhJXV50ZO0Z9H4Zd/Uae7GaOJ/sbWtOGefo05OiUQMjaaB01Uws7repy9+F+PddGQ9vUrnr+UnX2Jw25+i36YzZRhRToNVKlRXivB3kuq6FNr/D73vMX9RC0z71K1+XuXP61aU5Oc5OU5O7b4tnRUx1rERHUKS95vPNnwbtQxMxDMRz6hecqZY1LV8Qt/jCm17vmfm7cig3t+bfJj6XGnqePzXXBIquFmkyAAAAAAAAACLAVLNeWfaXr0I/7nGdNfH3Xm9fmWmlvTT5L9fpW7enFvnp2oZfxPMelLMcdhkgB9AABust6Anipa0rxoRe9Lr5Y9+/Ir93djFXxjtM1dWcs8z06ThcNCnCMIRUYRVkkc5e03nmy+pSKRxCcTh41IyhOKlCSs0xW00nyr2WrFo4npzXMmgJ4SWsryoSe7Lw+WXfvzOk0t2M0eM/2/ah29WcM8x00pPQwAAAGJmCPc8QveVMseztiMRH/AHOMab+Du/N6fMoN7e8/8dOv2utPTivz2W6xVrJIAAAAAAAAAAAAQ0YkVPNeWfa61egrVeMoL4+683qWmlvTj+S/X6Vu5p+fzV7UNq2x7Gth0ETExypZ9IMgBu8t5fnipa0rxoRe2XOT8MfyV+7vRhjxr2m6mrOWfKenScPQjTjGEIqMYqyS5I5y1ptPMr2tYrHEMqMNhgYsRQjUjKE4qUZKzT4NGa2ms8x6a2rFo4n25vmTL88LLWjeVCT2S5xfhl+eZ0eluxmjxt/b9qLb1JxW5r00ZYQhQAEr7Ftb2W5mLTEdsxzz6X3KmWfZateur1eMYP4O783oc/u738n+OnX7XOnpxSPK3a2WKtZJMgAAAAAAAAAAAAACGgKrmvLKrXr0I2rLbKPKff8Am9Sy0d6cXyX6/Su29OLx5Vj3+1BkrNpqzWxro+h0MWi0cwpZiYniW8y1l6WKlrzvGhF7Xzk/DH8lfvb0Yo8a9pmpqTlnm3TpFChGnFQhFRjFWSXBI5y0zaeZle1rFY4hkDZIAABixFCNSLhOKlGSs0+DQrM1tzHbW1YtHE9Ob5ly9LCy14XlQk9j5xfhf2Z0eluxmjxt6t+1Ftak4p5r00cVdpJXbdklzfJFhM8RzKFHvpfsq5a9javXV6r92L2qHf8Am9Dnt3e/k+SnX7Xenpxjjyt2tSRWLFJkAAAAAAAAAAAAAAAAENCRptI5Zwtep7WcWpfFqyspfP8A6JWLdzY6+MT6RcmniyW8pbajRjCKjCKjGKsklsSI1pm08ykVrFY4hkMNgAAAAAMdejGcXCaUoyVmmrpozFpieYa2rFo4lqdHZZw1Cp7WEW5ctaV1H5fl3ZJy7ubJXwmfSPj1MWO3lEe25SIiUkyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z',
                name: 'Mobile',
                description: 'Scan qrcode with your mobile wallet',
            },
            package: WalletConnectProvider,
            options: {
                rpc: {
                    56: 'https://bsc-dataseed.binance.org/',
                },
                network: 'binance',
                chainId: 56,
            },
        },
    };

    const web3ModalInstance = new Web3Modal({
        network: 'binance', // optional
        cacheProvider: true, // optional
        providerOptions, // required
    });

    const getCollections = async () => {
        const collectionData = await axios.get('https://testnets-api.opensea.io/api/v1/collections');
        console.log('collections are ', collectionData.data.length);
        setCollections(collectionData.data.collections);
        setFilteredCollections(collectionData.data.collections);
    }

    const getAssets = async () => {
        const assetData = await axios.get('https://testnets-api.opensea.io/api/v1/assets');
        setAssets(assetData.data.collections)
    }

    React.useEffect(() => {
        setWeb3Modal(web3ModalInstance);
        getCollections();
        getAssets();
    }, []);

    return (
        <APIContext.Provider
            value={{
                assets,
                setAssets,
                collections,
                setCollections,
                web3Modal,
                setWeb3Modal,
                filteredCollections,
                setFilteredCollections
            }}
        >
            {children}
        </APIContext.Provider>
    )
}