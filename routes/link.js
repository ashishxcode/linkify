const { Router } = require('express');
const { Link, User } = require('../models');
const router = Router();

router.get('/', async (req, res) => {
	try {
		// findall with includes to get the user
		const links = await Link.findAll({
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['firstName', 'lastName'],
				},
			],
		});

		res.json({
			success: true,
			data: links,
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
		const { uid, fullLink } = req.body;
		const baseURL = req.protocol + '://' + req.get('host');
		if (!uid || !fullLink) {
			throw new Error('All fields are required');
		}

		const user = await User.findOne({
			where: {
				uuid: uid,
			},
		});

		const link = await Link.create({
			userId: user.id,
			fullLink,
		});
		res.json({
			success: true,
			data: {
				link: `${baseURL}/link/${link.shortLink}`,
			},
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});

router.get('/:sid', async (req, res) => {
	try {
		const link = await Link.findOne({
			where: {
				shortLink: req.params.sid,
			},
		});
		if (!link) {
			throw new Error('Link not found');
		}
		Link.update({ clicks: link.clicks + 1 }, { where: { id: link.id } });
		res.redirect(link.fullLink);
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const isExist = await Link.findOne({
			where: {
				id,
			},
		});

		if (!isExist) {
			return res.json({
				success: false,
				error: 'Link not found',
			});
		} else {
			const link = await Link.destroy({
				where: {
					uuid: id,
				},
			});
			res.json({
				success: true,
				data: link,
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});

module.exports = router;
