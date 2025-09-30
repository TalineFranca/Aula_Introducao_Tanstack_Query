"use client";
import { fetchData } from "@/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import Posts from "@/types/Posts";
import ErrorMessage from "@/components/ui/errorMessage";

export default function Home() {
  const {
    data: postsData,
    isLoading: postsIsLoading,
    isError: postsIsError,
    error: postsError,
    refetch: postsRefetch
  } = useQuery({
    queryKey: ["ListaPostsPaginaInicial"],
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_SIMULAR_ERRO === "true") {
        throw new Error("Erro simulado ao caregar dados");
      }
      if (process.env.NEXT_PUBLIC_SIMULAR_LOADING === "true") {
        await new Promise(resolve => setTimeout(resolve, 3000)); 
      }
      return fetchData<Posts[]>("/posts", "GET");
    }
  })

  return (
    <div>
      <h1>Listagem de posts</h1>
      {postsIsLoading && (<div className="bg-amber-400 text-5xl p2">Carregando...</div>)}

      {!postsIsLoading && !postsIsError && postsData?.length > 0 ? (
        <>
          <div>Posts encontrados: {postsData?.length}</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {postsData?.map(p => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
          <ErrorMessage>Nenhum post encontrado</ErrorMessage>
          //exemplo:  <ErrorMessage tipo="warning">Nenhum post encontrado</ErrorMessage>
      )}

      {postsIsError && <ErrorMessage>Algum erro aconteceu!!</ErrorMessage>}

    </div>
  )
}

//REACT TOASTIFY
//npm install react-toastify
//import { ToastContainer, toast } from 'react-toastify';
