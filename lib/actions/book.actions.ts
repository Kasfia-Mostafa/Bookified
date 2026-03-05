"use server";
import { connectToDatabase } from "@/Database/mongoose";
import { CreateBook, TextSegment } from "@/types";
import { generateSlug, serializeData } from "../utils";
import Book from "@/Database/models.ts/book.model";
import BookSegment from "@/Database/models.ts/book-segment.model";

export const checkBookExists = async (title: string) => {
  try {
    await connectToDatabase();
    const slug = generateSlug(title);
    const existingBook = await Book.findOne({ slug }).lean();
    if (existingBook) {
      return {
        exists: true,
        book: serializeData(existingBook),
      };
    }

    return {
      exists: false,
    };
  } catch (e) {
    console.error("Error checking book exists", e);
    return {
      exists: false,
      error: e,
    };
  }
};

export const createBook = async (data: CreateBook) => {
  try {
    await connectToDatabase();

    const slug = generateSlug(data.title);
    const existingBook = await Book.findOne({ slug }).lean();
    if (existingBook) {
      return {
        success: true,
        data: serializeData(existingBook),
        alreadyExists: true,
      };
    }

    //Todo: Check subscription limits here (if applicable)
    const book = await Book.create({ ...data, slug, totalSegments: 0 });
    return {
      success: true,
      data: serializeData(book),
    };
  } catch (error) {
    console.error("Error creating book:", error);
    return { success: false, error: console.error };
  }
};

export const saveBookSegments = async (
  bookId: string,
  clerkId: string,
  segments: TextSegment[],
) => {
  try {
    await connectToDatabase();
    console.log(`Saving ${segments.length} segments for book ${bookId}`);
    const segmentToInsert = segments.map(
      ({ text, segmentIndex, pageNumber, wordCount }) => ({
        clerkId,
        bookId,
        content: text,
        segmentIndex,
        pageNumber,
        wordCount,
      }),
    );
    await BookSegment.insertMany(segmentToInsert);

    await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });
    console.log(`Successfully saved segments and updated book ${bookId}`);

    return { success: true, data: { segmentsCreated: segments.length } };
  } catch (error) {
    console.error("Error saving book segments:", error);
    await BookSegment.deleteMany({ bookId });
    await Book.findByIdAndDelete(bookId);
    console.log(
      "Deleted book segments and book due to failure to save segments.",
    );
    return { success: false, error: "Failed to save book segments." };
  }
};
