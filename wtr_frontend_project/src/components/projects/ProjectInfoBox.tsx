"use client";
import { Link, Text, Box, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function ProjectInfoBox({ project }: any) {
  const router = useRouter();
  const toast = useToast();

  const white = "#fff";
  const gap = "10px";
  const padding = "20px";

  const svgReports = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M13.744 8s1.522-8-3.335-8h-8.409v24h20v-13c0-3.419-5.247-3.745-8.256-3zm4.256 11h-12v-1h12v1zm0-3h-12v-1h12v1zm0-3h-12v-1h12v1zm-3.432-12.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z"
        fill="white"
      />
    </svg>
  );

  const svgTrash = (
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path
        d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"
        fill="white"
      />
    </svg>
  );

  const svgEdits = (
    <svg
      width="24"
      height="24"
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
        fillRule="nonzero"
        fill="white"
      />
    </svg>
  );

  const svgCollab = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="36"
      viewBox="0 -960 960 960"
      width="36"
      fill="white"
    >
      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
    </svg>
  );

  function formatToTwoDigits(num: number): string {
    let integerStr = num.toString();
    while (integerStr.length < 2) {
      integerStr = "0" + integerStr;
    }
    return integerStr;
  }

  function getFormattedCommercialTime(commercialTime: number): string {
    const hour = Math.floor(commercialTime / 60); // result without floor is float
    const minute = commercialTime % 60;
    return `${formatToTwoDigits(hour)}:${formatToTwoDigits(minute)}`;
  }

  function deleteProject(event: any) {
      fetch('http://localhost:5000/projects',{
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            project_id : project.project_id,
          })
      })
      .then(response => response.json())
      .then(response => {
          if(!response.success)
              throw new Error(response.message);
          
          console.log(response);
          toast({
              title: 'Projeto deletado com sucesso!',
              description: "",
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: "top-right"
            })
            router.push('/main/projects')
      })
      .catch((error)=>{
          console.log(error.status)
          toast({
              title: 'Falha na deleção de projeto!\n'+error,
              description: "",
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: "top-right"
          })
      });
    }

  return (
    <Box
      background={"#F0EFFF"}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: padding,
        gap: padding,
      }}
    >
      <Box
        style={{ flex: "1", padding: padding, display: "flex", gap: padding }}
      >
        <Box
          style={{
            gap: padding,
            flex: ".4",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {[
            ["NOME DO PROJETO", project.project_name],
            ["PROPRIETÁRIO", project.owner.email],
            ["LOCALIZAÇÃO", project.location],
            ["LOCALIZAÇÃO REQUERIDA", project.location_required? "Sim" : "Nao"],
            ["TIMEZONE", project.timezone],
            ["HORÁRIO COMERCIAL (INÍCIO)", getFormattedCommercialTime(project.commercial_time_start)],
            ["HORÁRIO COMERCIAL (FIM)", getFormattedCommercialTime(project.commercial_time_end)],
            ["HORÁRIO COMERCIAL REQUERIDO", project.commercial_time_required? "Sim" : "Nao"],
            ["DATA DE CRIAÇÃO", project.created_at],
          ]
            .map((n) => {
              return { label: n[0], value: n[1] };
            })
            .map((item, i) => {
              return (
                <Box key={"item_" + i} style={{ display: "flex" }}>
                  <Box
                    background={"#4D47C3"}
                    textColor={"white"}
                    style={{ flex: 1, padding: gap, textAlign: "center" }}
                  >
                    {item.label}
                  </Box>
                  <Box
                    style={{
                      flex: 1,
                      padding: gap,
                      backgroundColor: white,
                      textAlign: "center",
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    {item.value}
                  </Box>
                </Box>
              );
            })}
        </Box>

        <Box
          style={{
            gap: padding,
            flex: ".6",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Link 
              width={"30%"} 
              href={`/main/projects/info/${project.id}/reports`}>
                <Button
                  gap={"0.5em"} 
                  paddingX={'30%'}
                  textColor={"white"}
                  background={"#4D47C3"}
                  colorScheme="purple" bgColor="#4D47C3"
                >
                  {svgReports}Relatorios
                </Button>
            </Link>
            <Link 
              width={"30%"} 
              href={`/main/projects/info/${project.project_id}/manageColaborator`}>
              <Button
                textColor={"white"}
                gap={"0.5em"}
                paddingX={'30%'}
                background={"#4D47C3"}
                colorScheme="purple" bgColor="#4D47C3"
              >
                {svgCollab}Colaboradores
              </Button>
            </Link>
            <Button colorScheme="purple" bgColor="#4D47C3"  onClick={()=> router.push('/main/projects/update/'+project.project_id)}>{svgEdits}</Button>
            <Button textColor={"#FFFFFF"} colorScheme="purple" bgColor="#4D47C3" onClick={(ev) => deleteProject(ev)}>{svgTrash}</Button>
          </Box>
          <Box
            background={"#4D47C3"}
            textColor={"white"}
            style={{ padding: gap, textAlign: "center" }}
          >
            DESCRIÇÃO DO PROJETO
          </Box>
          <Box
            style={{
              backgroundColor: white,
              flex: 1,
              padding: gap,
              textAlign: "justify",
              width: '100%'
            }}
          >
            {project.project_description}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
