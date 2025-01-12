import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const booksTable = pgTable(
  "books",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    publishedYear: integer().notNull(),
    genreId: integer()
      .notNull()
      .references(() => genresTable.id, { onDelete: "cascade" }),
    rating: numeric({ precision: 3, scale: 2 }).notNull(),
    numberOfRecommendations: integer().notNull(),
    authorId: integer()
      .notNull()
      .references(() => authorsTable.id, { onDelete: "cascade" }),
    description: text(),
  },
  (table) => ({
    genreIdIdx: index("books_genre_id_idx").on(table.genreId),
    authorIdIdx: index("books_author_id_idx").on(table.authorId),
  }),
);

export const authorsTable = pgTable("authors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const genresTable = pgTable("genres", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull(),
});

export const recommendationsTable = pgTable(
  "recommendations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    bookId: integer()
      .notNull()
      .references(() => booksTable.id, { onDelete: "cascade" }),
    influencerId: integer()
      .notNull()
      .references(() => influencialPeopleTable.id, { onDelete: "cascade" }),
    source: text(),
    timestamp: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    bookIdIdx: index("recommendations_book_id_idx").on(table.bookId),
    influencerIdIdx: index("recommendations_influencer_id_idx").on(
      table.influencerId,
    ),
  }),
);

export const influencialPeopleTable = pgTable(
  "influential_people",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    yearBorn: integer(),
    influentialField_Id: integer()
      .notNull()
      .references(() => fieldsTable.id),
    occupation: varchar({ length: 255 }).notNull(),
    profilePic: varchar({ length: 255 }),
    visible: boolean().notNull().default(false),
  },
  (table) => ({
    fieldIdIdx: index("influential_people_field_id_idx").on(
      table.influentialField_Id,
    ),
  }),
);

export const fieldsTable = pgTable("fields", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
});
