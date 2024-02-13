module.exports = (sequelize, DataTypes) =>{

    let alias = 'ProductosColoresTalles';

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto_color: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'producto_color',
                    key: 'id'
                }
            }
        },
        id_talle:{
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'talles',
                    key: 'id'
                }
            }
        },
        stock:{
            type: DataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'producto_color_talle',
        timestamps: false
    }

    let ProductoColorTalle = sequelize.define(alias, columns, config);


    ProductoColorTalle.associate = function(models){

        ProductoColorTalle.belongsTo(models.ProductosColores, {
            as: 'productoColor',
            foreignKey:'id_producto_color'
        }),

        ProductoColorTalle.belongsTo(models.Talles, {
            as: 'talle',
            foreignKey:'id_talle'
        }),

        ProductoColorTalle.belongsToMany(models.Carritos, {
            as: 'carritos',
            through: 'carrito_producto_color_talle',
            foreignKey: 'id_producto_color_talle',
            otherKey: 'id_carrito',
            timestamps: false
        }),
    
        ProductoColorTalle.hasMany(models.CarritosProductosColoresTalles, {
            as: 'carritosProductosColoresTalles',
            foreignKey:'id_producto_color_talle'
        })

    }


    return ProductoColorTalle;
}