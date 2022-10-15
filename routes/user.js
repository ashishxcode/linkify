const { Router } = require('express');
const router = Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
	try {
		const users = await User.findAll();
		res.json({
			success: true,
			data: users,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});

router.post('/', async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!firstName || !lastName || !email || !password) {
			throw new Error('All fields are required');
		}

		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
		});
		res.json({
			success: true,
			data: user,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});

router.delete('/:id', async (req, res) => {
	try {
		console.log(req.params.id);
		const user = await User.destroy({
			where: {
				uuid: req.params.id,
			},
		});
		res.json({
			success: true,
			data: user,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});

module.exports = router;
