CREATE TABLE toDoList (
    "id" serial PRIMARY KEY,
 "task" varchar(255) NOT NULL,
    "note" varchar(225),
    "completed" BOOLEAN DEFAULT false
);

INSERT INTO todolist ("task", "note")
VALUES ('Make Bed', 'do this before you eat cookies'),
('eat', 'eat those leftovers in the fridge'),
('vacumm', 'carpet'),
('dust', '');