module.exports = (sequelize, DataTypes) =>{

    let alias = 'Carritos';
    
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario:{
            type: DataTypes.INTEGER,
        },
        precio_total:{
            type: DataTypes.BIGINT,
        }
    }

    let config = {
        tableName: 'carritos',
        timestamps: false
    }

    let Carrito = sequelize.define(alias, columns, config);

    return Carrito;
}