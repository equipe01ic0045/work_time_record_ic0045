'use client'

import ProjectInfo from "@/components/projects/projectInfoComponent"

export default function Test() {

    const mockDataList = 
    {
      id: 1,
      projectName: "Projeto 01",
      manager: "Luiz Silva",
      company: "LATAM",
      users: 58234
    }

 return (
 <><ProjectInfo project={mockDataList} /></>
 )
}