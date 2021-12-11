const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

morgan.token("tiny_post", (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    req.method === "POST" ? JSON.stringify(req.body) : null,
  ].join(" ");
});

const app = express();
app.use(express.json());
app.use(morgan("tiny_post"));
app.use(cors());
app.use(express.static("build"));
const ID_RANGE = 5000;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

/**
 * API to get all entries
 */
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

/**
 * Get info HTML
 */
app.get("/info", (request, response) => {
  const info = `<div>
        Phonebook has info for ${persons.length} people
    </div>
    <br>
    <div>
    ${new Date()}
    </div>`;
  response.send(info);
});

/**
 * API to get an entry for requested id
 */
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => id === p.id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

/**
 * API to delete an entry for requested id
 */
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

/**
 * API to create a new entry
 */
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  if (persons.find((p) => p.name == body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = { ...body, id: Math.floor(Math.random() * ID_RANGE) };
  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
