"use client";
import { fetchData } from "@/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

interface Posts {
  userid: number;
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const {
    data: postsData,
    isLoading: postsIsLoading,
    isError: postsIsError,
    error: postsError,
    refetch: postsRefetch
  } = useQuery({
    queryKey: ["ListaPostsPaginaInicial"],
    queryFn: async () => fetchData<Posts[]>("/posts", "GET")
  })

  return (
    <div>
      <h1>Listagem de posts</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Título</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {postsData?.map (p => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
