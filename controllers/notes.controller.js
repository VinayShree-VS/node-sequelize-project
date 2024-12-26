const db = require("../models");
const Notes = db.notes;
const Op = db.Op;

const handleCreateNote = async (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ code: 400, message: "Invalid request. Please verify your payload and try again." });
    };
  
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ code: 400, message: "User authentication error. Please log in and try again." });}
    try {
      const note = await Notes.create({ userId: req.user.userId, title,description,});

      const { userId, ...filteredNote } = note.toJSON();
      res.status(201).json({
        code: 201,
        message: "Success! Your note has been created",
        data: filteredNote,
      });
    } catch (error) {
      console.error("Error during note creation:", error);
      return res.status(500).send({
        message: error.message || "Some error occurred while creating the Note.",
      });
    }
};
  
const handleGetNoteById = async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ code: 400, message: "id is required in params" });
    }
  
    try {
      const note = await Notes.findOne({
        where: {id: req.params.id,userId: req.user.userId, isActive: true}
      });
  
      if (!note) {
        return res.status(404).json({ code: 404, message: "Oops. Note not found" });
      }
  
      const { userId, ...selectedNote } = note.toJSON();
  
      return res.status(200).json({ code: 200, message: "Success!", data: selectedNote });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ code: 500, message: "Internal server error" });
    }
};

const handleGetAllNote = async (req, res) => {
  try {
    const notes = await Notes.findAll({
        where: {userId: req.user.userId,isActive: true},
        attributes: ['id', 'title', 'description', 'created_at', 'updated_at', 'isActive'], // Select specific fields
    });

    return res.status(200).json({ code: 200, message: "Success!", data: notes });
  } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

const handleUpdateNote = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ code: 400, message: "id is required in params" });
    };
  
    try {
        const note = await Notes.findOne({
            where: { id: req.params.id, userId: req.user.userId, isActive: true },
        });
        if (!note) {
            return res.status(404).json({ code: 404, message: "Oops. Note not found" });
        };
         await Notes.update({ ...req.body }, { where: { id: req.params.id, userId: req.user.userId } });
         const updatedNote = await Notes.findOne({
            where: { id: req.params.id, userId: req.user.userId, isActive: true },
            attributes: { exclude: ['userId'] }, // remove sensitive fields
        });
        return res.status(200).json({ code: 200, message: "Success! Note has been updated", data: updatedNote });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ code: 500, message: "Internal server error" });
        };
};

const handleDeleteNote = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ code: 400, message: "id is required in params" });
    };
  
    try {
        const note = await Notes.findOne({
            where: { id: req.params.id, userId: req.user.userId, isActive: true },
        });

        if (!note) {
            return res.status(404).json({ code: 404, message: "Oops. Note not found" });
        };

        await Notes.update({ isActive: false }, { where: { id: req.params.id, userId: req.user.userId } });

        return res.status(200).json({ code: 200, message: "Success! Note has been deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: "Internal server error" });
    };
};

module.exports = {handleCreateNote,handleGetNoteById,handleGetAllNote,handleUpdateNote,handleDeleteNote};