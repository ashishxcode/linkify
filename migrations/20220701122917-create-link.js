const shortId = require('shortid');
('use strict');
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('Links', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			fullLink: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			shortLink: {
				type: DataTypes.STRING,
				defaultValue: shortId.generate,
				required: true,
			},
			clicks: DataTypes.INTEGER,
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable('Links');
	},
};
