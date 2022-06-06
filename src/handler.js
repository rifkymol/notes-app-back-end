const { nanoid } = require("nanoid");
const { notes }  = require("./notes");

const addNoteHandler = (request, h) => {
  const {title, tags, body} = request.payload;

  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title, tags, body, id, createAt, updateAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Note added successfully',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Note failed to add!',
  })
};

module.exports = { addNoteHandler };
