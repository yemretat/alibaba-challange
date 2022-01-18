import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { ConvertedLinkEnums } from "../../helpers/enums/ConvertedLinkEnums";
export class ConvertedLink extends Model {
  public id: number;
  public source: string;
  public target: string;
  public createdDate: Date;
}

ConvertedLink.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    source: { type: DataTypes.STRING, allowNull: false },
    target: { type: DataTypes.STRING, allowNull: false },
    direction: {
      type: DataTypes.ENUM,
      values: [
        ConvertedLinkEnums.ConversionDirection.TO_DEEPLINK,
        ConvertedLinkEnums.ConversionDirection.TO_WEBURL,
      ],
    },
    createdDate: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: "ConvertedLink",
    timestamps: false,
  }
);
