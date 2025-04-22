import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import ProfilSekolah from './Profil.js';

const ImgSlide = db.define(
  'ImgSlide',
  {
    profilSekolahId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProfilSekolah,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    img: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'img_slide', 
    timestamps: true,
    freezeTableName: true,
  }
);

// Relasi One-to-Many (ProfilSekolah → ImgSlide)
ProfilSekolah.hasMany(ImgSlide, { foreignKey: 'profilSekolahId', as: 'imgSlides', onDelete: 'CASCADE' });
ImgSlide.belongsTo(ProfilSekolah, { foreignKey: 'profilSekolahId', as: 'profilSekolah' });


export default ImgSlide;
