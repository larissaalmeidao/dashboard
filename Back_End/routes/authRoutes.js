import express from 'express'
import db from '../db.js'
// import fs from 'fs'
// import path from 'path'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const router = express.Router()

/*************************
      crud de login
*************************/

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Validação básica
    if (!email || !password) {
        return res.status(400).json({ 
            success: false,
            error: 'Email e senha são obrigatórios' 
        });
    }

    try {
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                error: 'Email não encontrado'
            });
        }
        
        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                error: 'Senha incorreta'
            });
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno no servidor'
        });
    }
});


/*************************
     crud de cadastro
*************************/

router.post('/registro', async (req, res) => {
    try {
        // Extração dos campos em português
        const { name, tipo, telefone, cpf, email, password, imagemId } = req.body;

        // Validação completa
        if (!name  || !tipo || !telefone || !cpf || !email || !password) {
            return res.status(400).json({ 
                success: false,
                error: 'Todos os campos são obrigatórios!' 
            });
        }

        // Verifica se telefone tem 11 dígitos
        if (telefone.length !== 11 || !/^\d+$/.test(telefone)) {
            return res.status(400).json({
                success: false,
                error: 'Telefone deve conter 11 dígitos numéricos!'
            });
        }

        // Verifica se CPF tem 11 dígitos
        if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
            return res.status(400).json({
                success: false,
                error: 'CPF deve conter 11 dígitos numéricos!'
            });
        }

        // Verifica se email já existe
        const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ 
                success: false,
                error: 'Email já cadastrado!' 
            });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere no banco
        const [result] = await db.execute(
            "INSERT INTO users (name, tipo, telefone, cpf, email, password, imagemId) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, tipo, telefone, cpf, email, hashedPassword, imagemId || null]
        );

        // Resposta de sucesso
        res.status(201).json({
            success: true,
            id: result.insertId,
            name,
            tipo,
            telefone,
            cpf,
            email,
            message: 'Usuário cadastrado com sucesso!'
        });

    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ 
            success: false,
            error: 'Erro interno no servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

router.get('/registro', async (req, res) => {
    try {
        const [users] = await db.execute("SELECT * FROM users");
        res.status(200).json(users);
    } catch (error) {
        console.error("Erros ao buscar item: ", error)
        res.status(500).json({ error: error.message });
    }
});

router.get('/user', async (req, res) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) return res.status(401).send('Token ausente.');
        
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const [users] = await db.execute("SELECT id, name, tipo, email, imagemId FROM users WHERE id = ?", [decoded.id]);
        
        if (users.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        
        const user = users[0];
        let photoUrl = null;

        // Se existir um imagemId, buscar o caminho da foto
        if (user.imagemId) {
            const [foto] = await db.execute("SELECT filepath FROM fotoPerfil WHERE id = ?", [user.imagemId]);
            if (foto.length > 0) {
                // Extrai o nome do arquivo e monta a URL correta
                const fileName = foto[0].filepath.split('/').pop();
                photoUrl = `/uploads-profpic/${fileName}`;
            }
        }
        
        res.json({
            name: user.name,
            tipo: user.tipo,
            photo: photoUrl // Retorna o caminho completo da foto
        });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: error.message });
    }
});
export default router;