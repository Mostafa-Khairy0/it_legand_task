"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib";
import { Comment } from "@prisma/client";
import { deepCopy } from "@/utils";

type State = {
  success: boolean;
  message: string;
  errors?: string[];
  comment?: Comment | null;
};

const CommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment too long (max 500 characters)"),
  userId: z.number().int().positive("Invalid user ID"),
  lessonId: z.number().int().positive("Invalid lesson ID"),
});

export async function sendComment(
  _: State,
  formData: FormData
): Promise<State> {
  try {
    const rawData = {
      content: formData.get("comment"),
      userId: Number(formData.get("userId")),
      lessonId: Number(formData.get("lessonId")),
    };

    const result = CommentSchema.safeParse(rawData);

    if (!result.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().formErrors,
        comment: null,
      };
    }

    const comment = await prisma.comment.create({
      data: result.data,
    });

    revalidatePath(`/lessons/${result.data.lessonId}`);

    return {
      success: true,
      message: "🎉 Your comment was sent!",
      comment: deepCopy(comment),
    };
  } catch (error) {
    console.error("Comment submission error:", error);
    return {
      success: false,
      message: "Internal server error",
      errors: ["Failed to process comment"],
      comment: null,
    };
  }
}

export async function unsendComment(formData: FormData) {
  try {
    const rawData = {
      commentId: Number(formData.get("commentId")),
    };
    return prisma.comment.delete({ where: { id: rawData.commentId } });
  } catch (error) {
    console.error("Comment submission error:", error);
    return {
      success: false,
      message: "Internal server error",
      errors: ["Failed to process comment"],
      comment: null,
    };
  }
}
