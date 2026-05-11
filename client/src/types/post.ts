import type { User } from "./user";

/**
 * A post as returned by GET /data/posts (without author loaded).
 * Matches the raw database row.
 */
export interface Post {
    _id: string;
    _createdOn: number;
    _ownerId: string;
    category: string;
    title: string;
    content: string;
}

/**
 * A post with the author eagerly loaded via `?load=author=_ownerId:users`.
 * Use this type in components that consume that loaded response.
 */
export type PostWithAuthor = Post & { author: User };

/**
 * The payload sent to POST /data/posts when creating a new post.
 * Server generates `_id`, `_createdOn`, `_ownerId`, so we strip them here.
 */
export type PostInput = Omit<Post, "_id" | "_createdOn" | "_ownerId">;
