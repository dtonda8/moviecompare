import * as React from 'react'
import WithSubnavigation from './ChakraNavBar.tsx';
import { ChakraProvider } from '@chakra-ui/react'
import './NavBar.css'

const NavBar = ({ userId }) => {
    return (
        <ChakraProvider>
                <WithSubnavigation userId={userId}/>
        </ChakraProvider>
    )
}

export default NavBar