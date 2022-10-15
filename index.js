const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use('/api/users', require('./routes/user'));
app.use('/api/links', require('./routes/link'));

app.listen(PORT, () => {
	sequelize
		.sync()
		.then(() => {
			console.log('Database connected');
		})
		.catch((err) => {
			console.log(err);
		});

	console.log(`Server is running on port ${PORT}`);
});
