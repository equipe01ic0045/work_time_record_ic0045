'use client'; // chakra-ui components need this declaration to work
import '../styles/global.css'; // css import from styles to work with normal element tags
import SideMenuComponent from '@/components/global/side-menu-component';
import { Box, ChakraProvider } from '@chakra-ui/react';

// title and description tags shall not be used but export as a constant
// nextjs handles it 

export const metadata = {
  title: 'ic0045 project',
  description: 'Generated by Next.js'
}

// root component, everything inside <body> will be re-rendered
// it can be used within nested components

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className='root'>
        <ChakraProvider>
            <SideMenuComponent></SideMenuComponent>
            {children}
        </ChakraProvider>
        </div>
      </body>
    </html>
  )
}
