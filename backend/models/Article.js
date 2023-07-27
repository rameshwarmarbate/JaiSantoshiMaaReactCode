const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Article = new Schema(
  {
    name: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String,
      required: function () {
        return !this.updatedBy;
      },
    },
    updatedBy: {
      type: String,
      required: function () {
        return !this.createdBy;
      },
    },
  },
  {
    collection: "article",
    timestamps: true,
  }
);

Article.index({ name: "text" });

module.exports = mongoose.model("Article", Article);
