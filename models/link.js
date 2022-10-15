'use strict';
const { Model } = require('sequelize');
const shortId = require('shortid');
module.exports = (sequelize, DataTypes) => {
	class Link extends Model {
		static associate({ User }) {
			Link.belongsTo(User, {
				foreignKey: 'userId',
				as: 'user',
				allowNull: false,
				onDelete: 'CASCADE',
			});
		}
	}
	Link.init(
		{
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
		},
		{
			sequelize,
			modelName: 'Link',
		}
	);
	return Link;
};
