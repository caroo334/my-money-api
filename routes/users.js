const router = require('express').Router();


const usuarios = [{
    email: 'carito@gmail.com',
    name: 'carito',
},
{
    email: 'caro@gmail.com',
    name: 'caro',
}
]

router.get('/', (req, res) => {
    const { email } = req.query;
    if (usuarios.find((u) => u.email === email)) {
        res.status(200).send(usuarios);
    } else {
        res.status(401).send('you are not welcome');
    }
})

router.post('/', (req, res) => {
    const { email, name } = req.body;
    console.log('esto me esta devolviendo', email, name)

    if (email && name) {
        if (!usuarios.find((u) => u.email === email)) {
            usuarios.push({
                email,
                name
            })
            res.status(200).send('Usuario creado')
        } else {
            res.status(418).send('El usuario ya existe')
        }
    } else {
        res.status(400).send('La informacion de name o email no es correcta')
    }
});

router.put('/:email', (req, res) => {
    const { email } = req.params;
    const body = req.body;

    const userToUpdateIndex = usuarios.findIndex((u) => u.email === email);

    if (userToUpdateIndex >= 0) {
        usuarios[userToUpdateIndex] = {
            ...usuarios[userToUpdateIndex],
            ...body,
        };
        res.status(200).send(`usuario ${email} modificado con exito`);
    } else {
        res.status(400).send(`No se puedo modificar el usuario ${email}`)
    }
});

router.delete('/:email', (req, res) => {
    const { email } = req.params;
    const body = req.body;

    const deleteUser = usuarios.findIndex((u) => u.email === email);
    console.log('Variable delete', deleteUser)
    console.log('obj usuarios', usuarios);
    if (deleteUser >= 0) {
        usuarios.splice(deleteUser, deleteUser + 1);
        res.status(200).send('Eliminado con exito')
        console.log('despues de splice', usuarios)
    } else {

        res.status(400).send('No se a podido eliminar, intentelo nuevamente mas tarde')
    }
});

module.exports = router;