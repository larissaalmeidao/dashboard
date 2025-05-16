import express from 'express'
import db from './db.js'
import upload from './uploadconfig.js'
import uploadProfPic from './uploadconfigProfPic.js'
import fs from 'fs'
import authRouts from './routes/authRoutes.js'
import jwt from 'jsonwebtoken';


const router = express.Router()
router.use(authRouts)

//Middleware
function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).send('Token ausente.');
    
    const token = auth.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Erro na verificação do token:', error);
        return res.status(403).send('Token inválido ou expirado');
    }
}


/*************************
      crud de imagens
*************************/
router.post('/images', upload.single('image'), async (req, res) => {
    try {
        const { filename, path: filepath } = req.file

        await db.execute(
            "INSERT INTO images (filename, filepath) VALUES (?, ?)",
            [filename, filepath]
        )

        res.status(201).json({ message: "Imagem enviada com sucesso!", filename })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/images', async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM images")
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.put('/images/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params
        const { filename, path: newPath } = req.file


        const [old] = await db.execute("SELECT * FROM images WHERE id = ?", [id])
        if (old.length === 0) return res.status(404).json({ error: "Imagem não encontrada" })

        const oldPath = old[0].filepath


        await db.execute(
            "UPDATE images SET filename = ?, filepath = ? WHERE id = ?",
            [filename, newPath, id]
        )

        fs.unlink(oldPath, (err) => {
            if (err) console.warn("Erro ao remover imagem antiga:", err)
        })

        res.json({ message: "Imagem atualizada com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/images/:id', async (req, res) => {
    try {
        const { id } = req.params

        const [rows] = await db.execute("SELECT * FROM images WHERE id = ?", [id])
        if (rows.length === 0) return res.status(404).json({ error: "Imagem não encontrada" })

        const filePath = rows[0].filepath

        await db.execute("DELETE FROM images WHERE id = ?", [id])

        fs.unlink(filePath, (err) => {
            if (err) console.warn("Erro ao remover imagem do disco:", err)
        })

        res.json({ message: "Imagem excluída com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


/*************************
   crud de foto de perfil
*************************/

router.post('/fotoPerfil', uploadProfPic.single('image'), async (req, res) => {
    try {
        const { filename, path: filepath } = req.file;

        const [result] = await db.execute(
            "INSERT INTO fotoPerfil (filename, filepath) VALUES (?, ?)",
            [filename, filepath]
        );

        res.status(201).json({ 
            message: "Imagem enviada com sucesso!", 
            filename,
            id: result.insertId // Adicione esta linha para retornar o ID
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/fotoPerfil', async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM fotoPerfil")
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

/*************************
   crud de eventos
*************************/

router.post('/eventos', authMiddleware, async (req, res) => {
    try {
        const { nome, tipo, descricao, dataI, horaI, horaF, cep, logradouro, numero, bairro, cidade, capacidade, responsavel, imagemId } = req.body;
        
        const cepNumerico = typeof cep === 'string' ? parseInt(cep.replace(/\D/g, '')) : cep;

        const [conflitos] = await db.execute(
            "SELECT * FROM eventos WHERE dataI = ? AND horaI = ?",
            [dataI, horaI]
        );
        
        if (conflitos.length > 0) {
            return res.status(400).json({ 
                error: "Este horário já está reservado! Escolha outro." 
            });
        }

        const [result] = await db.execute(
            "INSERT INTO eventos (nome, tipo, descricao, dataI, horaI, horaF, cep, logradouro, numero, bairro, cidade, capacidade, responsavel, imagemId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [nome, tipo, descricao, dataI, horaI, horaF, cepNumerico, logradouro, numero, bairro, cidade, capacidade, responsavel, imagemId || null]
        );

        res.status(201).json({
            success: true,
            message: "Evento cadastrado com sucesso!",
            id: result.insertId
        });
    } catch (error) {
        console.error('Erro no agendamento:', error);
        res.status(500).json({ 
            error: "Erro interno. Tente novamente mais tarde.",
            details: error.message 
        });
    }
});

router.get('/eventos', async (req, res) => {
    try {
        const [eventos] = await db.execute(`
            SELECT id, nome, tipo, descricao, 
                   DATE_FORMAT(dataI, '%d/%m/%Y') as dataFormatada,
                   DATE_FORMAT(horaI, '%H:%i') as horarioInicio,
                   DATE_FORMAT(horaF, '%H:%i') as horarioFim,
                   cep, logradouro, numero, bairro, cidade, capacidade, responsavel
            FROM eventos
            ORDER BY dataI DESC
        `);
        res.status(200).json(eventos);
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/eventos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [eventos] = await db.execute(`
            SELECT id, nome, tipo, descricao, 
                   DATE_FORMAT(dataI, '%d/%m/%Y') as data,
                   DATE_FORMAT(horaI, '%H:%i') as horaI,
                   DATE_FORMAT(horaF, '%H:%i') as horaF,
                   cep, logradouro, numero, bairro, cidade, capacidade, responsavel
            FROM eventos
            WHERE id = ?
        `, [id]);
        
        if (eventos.length === 0) {
            return res.status(404).json({ error: "Evento não encontrado" });
        }
        
        res.status(200).json(eventos[0]);
    } catch (error) {
        console.error('Erro ao buscar evento:', error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/eventos/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, tipo, descricao, dataI, horaI, horaF, cep, logradouro, numero, bairro, cidade, capacidade, responsavel, imagemId } = req.body;

        const [eventoExistente] = await db.execute("SELECT * FROM eventos WHERE id = ?", [id]);
        if (eventoExistente.length === 0) {
            return res.status(404).json({ error: "Evento não encontrado" });
        }

        const [conflitos] = await db.execute(
            "SELECT * FROM eventos WHERE dataI = ? AND horaI = ? AND id != ?",
            [dataI, horaI, id]
        );
        
        if (conflitos.length > 0) {
            return res.status(400).json({ 
                error: "Este horário já está reservado! Escolha outro." 
            });
        }

        await db.execute(
            "UPDATE eventos SET nome = ?, tipo = ?, descricao = ?, dataI = ?, horaI = ?, horaF = ?, cep = ?, logradouro = ?, numero = ?, bairro = ?, cidade = ?, capacidade = ?, responsavel = ?, imagemId = ? WHERE id = ?",
            [nome, tipo, descricao, dataI, horaI, horaF, cep, logradouro, numero, bairro, cidade, capacidade, responsavel, imagemId || null, id]
        );

        res.status(200).json({ 
            success: true,
            message: "Evento atualizado com sucesso!" 
        });
    } catch (error) {
        console.error('Erro ao atualizar evento:', error);
        res.status(500).json({ 
            error: "Erro interno. Tente novamente mais tarde.",
            details: error.message 
        });
    }
});

router.delete('/eventos/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const [evento] = await db.execute("SELECT * FROM eventos WHERE id = ?", [id]);
        if (evento.length === 0) {
            return res.status(404).json({ error: "Evento não encontrado" });
        }

        await db.execute("DELETE FROM eventos WHERE id = ?", [id]);

        res.status(200).json({ 
            success: true,
            message: "Evento excluído com sucesso!" 
        });
    } catch (error) {
        console.error('Erro ao excluir evento:', error);
        res.status(500).json({ 
            error: "Erro interno. Tente novamente mais tarde.",
            details: error.message 
        });
    }
});

router.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

export default router;