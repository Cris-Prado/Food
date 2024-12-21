require('dotenv').config(); // Carregar variáveis de ambiente
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;
const SESSION_SECRET = process.env.SESSION_SECRET;

// Configuração do motor de template EJS
app.set('views engine', 'ejs'); // Especifica o uso do EJS como template engine
app.set('views', '/src/views');



// Conexão com o banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
    console.log('Conectado ao banco de dados.');
});

// Configuração do middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('/src/public'));  // Para servir arquivos estáticos (CSS, JS, etc.)

// Configuração de Sessões
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Defina como `true` se estiver usando HTTPS
}));

// Rota de Cadastro (Register)
app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/src/public/cadastro.html');
});

app.post('/cadastro', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
        db.query(query, [username, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Usuário já cadastrado.' });
                }
                return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
            }
            res.redirect('/login');  // Redireciona para a página de login após o cadastro
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

// Rota de Login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/src/public/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
        }

        // Criando a sessão
        req.session.user = { id: user.id, username: user.username };

        res.redirect('/success');
    });
});

// Página de Sucesso após Login
app.get('/success', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');  // Redireciona se o usuário não estiver logado
    }
    res.render('success', { username: req.session.user.username });
});

// Rota de Logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao sair.' });
        }
        res.redirect('/login');
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});