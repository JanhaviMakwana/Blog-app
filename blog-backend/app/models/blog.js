const moment = require('moment');
const appConfig = require('../config/app.config');

module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define('blog', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.STRING,
            defaultValue: '',
            get() {
                const image = this.getDataValue('imageUrl');
                return image ? `${appConfig.appUrl}:${appConfig.appPort}/${image}` : '';
            }
        },
        createdAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
            }
        },
        updatedAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
            }
        }
    });

    return Blog;
};