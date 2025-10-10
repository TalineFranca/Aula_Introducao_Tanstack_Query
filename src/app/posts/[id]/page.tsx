"use client";
import { fetchData } from "@/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import Posts from "@/types/Posts";
import ErrorMessage from "@/components/ui/errorMessage";

interface PostProps {
    params: {
        id: string;
    }
}

export default function PostByIdPage({ params }: PostProps) {
    const id = params?.id;

    const {
        data: postData,
        isLoading: postIsLoading,
        isError: postIsError,
        error: postError,
        refetch: postRefetch
    } = useQuery({
        queryKey: ["PostById", id],
        queryFn: async () => fetchData<Posts>(`/posts/${id}`, "GET")
    })

    return (
        <div>
            <h1>Detalhes do Post {id}</h1>
            {postIsLoading && (<div className="bg-amber-400 text-5xl p-2">Carregando...</div>)}

            {!postIsLoading && !postIsError && postData ? (
                <>
                    <div>Post encontrado: ID {postData.id}</div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Título</TableHead>
                                <TableHead>Conteúdo</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell>{postData.id}</TableCell>
                                <TableCell>{postData.title}</TableCell>
                                <TableCell>{postData.body}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </>
            ) : (
                !postIsLoading && !postIsError && (
                    <ErrorMessage>Post não encontrado</ErrorMessage>
                )
            )}

            {postIsError && <ErrorMessage>Erro ao carregar o post!</ErrorMessage>}
        </div>
    )
}