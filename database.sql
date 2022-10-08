CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100) NOT NULL,
	"notes" VARCHAR (250) NOT NULL,
	"urgency" INTEGER,
	"complete?" BOOLEAN DEFAULT FALSE,
);

INSERT INTO "tasks"
	("name", "notes", "urgency", "complete?")
VALUES
	('Wash hair', 'Make sure not to use too much product', 3, false),
    ('Take out trash', 'DO NOT EAT IT', 4, false),
    ('Pay Bills', 'bills are on the table', 1, false),
	('Fold Clothes', '😔', 100, false),
    ('Mow lawn', 'last mow before winter', 8, true)