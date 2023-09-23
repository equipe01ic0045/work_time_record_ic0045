'use client'
import {
    Link,
    Text,
    Box,
    Button
} from '@chakra-ui/react'

export default function ProjectInfo({ project }: any) {

    const darkGray = '#aaa';
    const white = '#fff';

    const gap = '10px';
    const padding = '20px';
    const s = { padding: '10px', flex: '1', backgroundColor: darkGray, display: 'flex' };


    const svgReports = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.744 8s1.522-8-3.335-8h-8.409v24h20v-13c0-3.419-5.247-3.745-8.256-3zm4.256 11h-12v-1h12v1zm0-3h-12v-1h12v1zm0-3h-12v-1h12v1zm-3.432-12.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z" fill="white" /></svg>);

    const svgTrash = (<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" fill="white" /></svg>);

    const svgEdits = (<svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fill-rule="nonzero" fill="white" /></svg>);

    const svgCollab = (<svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36" fill="white"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>);

    return (
        <Box
            background={"purple.200"}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: padding, gap: padding }}
        >
            <Box
                style={{ flex: '1', padding: padding, display: 'flex', gap: padding }}
            >
                <Box style={{ gap: padding, flex: '.4', display: 'flex', flexDirection: 'column' }}>

                    {[
                        ["PROJECT NAME", project.projectName],
                        ["USERS", project.manager],
                        ["COMPANY", project.company],
                        ["MANAGER", project.users]
                    ].map(n => { return { label: n[0], value: n[1] } }).map((item, i) => {
                        return (
                            <Box key={'item_' + i} style={{ display: 'flex' }}>
                                <Box
                                    background={"blueviolet"}
                                    textColor={"white"}
                                    style={{ flex: 1, padding: gap, textAlign: 'center' }}
                                >{item.label}</Box>
                                <Box style={{ flex: 1, padding: gap, backgroundColor: white, textAlign: 'center' }}>{item.value}</Box>
                            </Box>
                        )
                    })}

                </Box>

                <Box style={{ gap: padding, flex: '.6', display: 'flex', flexDirection: 'column' }}>
                    <Box 
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    >
                        <Button textColor={"white"} gap={"0.5em"} background={"blueviolet"} width={"30%"}>{svgReports}Relatorio</Button>
                        <Button textColor={"white"} gap={"0.5em"} background={"blueviolet"} width={"30%"}>{svgCollab}Colaboradores</Button>
                        <Button background={"blueviolet"}>{svgEdits}</Button>
                        <Button background={"blueviolet"}>{svgTrash}</Button>
                    </Box>
                    <Box
                        background={"blueviolet"}
                        textColor={"white"}
                        style={{ padding: gap, textAlign: 'center' }}
                    >PROJECT DESCRIPTION</Box>
                    <Box style={{ backgroundColor: white, flex: 1, padding: gap, textAlign: 'justify' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor turpis nec leo efficitur, vitae consectetur leo hendrerit. Aliquam ut lectus risus. Sed ante velit, tempus at ullamcorper non, cursus non purus. Sed ac metus enim. Curabitur at arcu in arcu tincidunt dapibus. Proin dictum efficitur velit ac molestie. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis ornare dolor felis, nec elementum risus faucibus a. Suspendisse potenti. Nulla sit amet tincidunt sapien. Maecenas sit amet posuere erat. Aenean ac mattis augue. Nam at dignissim ante. Ut blandit posuere sapien, quis elementum diam euismod a. Praesent non gravida ante. Nam diam erat, euismod mattis aliquet sit amet, blandit a ex.

                        Cras luctus bibendum ipsum a malesuada. Donec fermentum sapien eget libero scelerisque, eu mollis dolor maximus. Integer dictum dictum sapien, et lacinia eros lacinia vel. Aliquam vestibulum tortor elit, nec tincidunt orci rutrum vitae. Mauris non semper arcu. Ut id porta metus. Integer viverra porttitor neque quis commodo.</Box>
                </Box>
            </Box>
        </Box>
    )
}