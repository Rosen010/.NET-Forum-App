import type { User } from "./user";

/**
 * A comment on a post. Stored under /jsonstore/comments.
 * `author` is populated when the response includes joined user data,
 * undefined otherwise — hence optional.
 */
export interface Comment {
    _id: string;
    _createdOn: number;
    _ownerId: string;
    postId: string;
    content: string;
    author?: User;
}

/**
 * The payload sent to POST /jsonstore/comments when creating a new comment.
 * The client fills in postId and content; the rest is server-generated or joined.
 */
export type CommentInput = Pick<Comment, "postId" | "content">;
