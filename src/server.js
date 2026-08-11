import express from "express"
import cors from "cors"
import {prisma} from "./lib/prisma.ts"

const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())



//========================================================================


app.get("/aluno", async (req, res) =>{

    try{
        const alunos = await prisma.aluno.findMany()
        res.json(alunos)
    }catch{
        res.status(500).json("Erro no servidor")
    }

})





//===================================================================


app.post("/aluno", async (req, res) =>{
    const {nome, email, senha} = req.body

    try{
        const novoAluno = await prisma.aluno.create({
            data:{
            nome,
            email,
            senha
            },
        });

        return res.status(201).json(novoAluno)
    }catch{
        res.statys(500).json("Erro no Servidor")
    }
})



//===================================================================





app.put("/aluno/:id", async (req, res) =>{
    const {id} = req.params
    const {nome, email, senha} = req.body

    try{
        const alunoAtualizado = await prisma.aluno.update({
            where:{id},
            data:{nome, email, senha}
        })

        return res.status(201).json(alunoAtualizado)
    }catch{
        res.status(500).json("Erro no servidor")
    }
})






//===========================================================================






app.delete("/aluno/:id", async (req, res) =>{
    const {id} = req.params
    try{
        const alunoDeletar = await prisma.aluno.delete({
            where:{id}
        })

        return res.status(201).json("Aluno Deletado")
    }catch{
        res.status(500).json("Erro no Servidor")
    }
})






app.listen(PORT, () =>{
    console.log("Server Rodando")
})