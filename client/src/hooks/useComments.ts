import { useReducer, useEffect } from "react";
import useRequest from "./useRequest";
import type { Comment } from "../types";

// Actions
const ACTIONS = {
    LOADING: 'LOADING',
    SET_COMMENTS: 'SET_COMMENTS',
    ADD_COMMENT: 'ADD_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
    ERROR: 'ERROR',
} as const;

interface CommentsState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

type CommentsAction =
    | { type: typeof ACTIONS.LOADING }
    | { type: typeof ACTIONS.SET_COMMENTS; payload: Comment[] }
    | { type: typeof ACTIONS.ADD_COMMENT; payload: Comment }
    | { type: typeof ACTIONS.DELETE_COMMENT; payload: string }
    | { type: typeof ACTIONS.ERROR; payload: string };

// Reducer function
function commentsReducer(state: CommentsState, action: CommentsAction): CommentsState {
    switch (action.type) {
        case ACTIONS.LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case ACTIONS.SET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                loading: false,
                error: null,
            };

        case ACTIONS.ADD_COMMENT:
            return {
                ...state,
                comments: [action.payload, ...state.comments],
                loading: false,
                error: null,
            };

        case ACTIONS.DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.payload),
                loading: false,
                error: null,
            };

        case ACTIONS.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}

// Initial state
const initialState: CommentsState = {
    comments: [],
    loading: true,
    error: null,
};

export interface UseCommentsResult {
    comments: Comment[];
    loading: boolean;
    error: string | null;
    addComment: (commentData: unknown) => Promise<Comment>;
    deleteComment: (commentId: string) => Promise<void>;
    refetchComments: () => Promise<void>;
}

// Custom hook
export default function useComments(postId: string | undefined): UseCommentsResult {
    const [state, dispatch] = useReducer(commentsReducer, initialState);
    const { request } = useRequest();

    // Fetch comments
    const fetchComments = async (): Promise<void> => {
        if (!postId) return;

        dispatch({ type: ACTIONS.LOADING });

        try {
            const whereClause = `postId="${postId}"`;
            const sortBy = '_createdOn desc';

            const urlParams = new URLSearchParams({
                where: whereClause,
                sortBy: sortBy,
            });

            const data = await request<Comment[] | Record<string, Comment>>(
                `/jsonstore/comments?${urlParams.toString()}`,
                'GET',
            );

            // Convert object to array if needed
            const commentsArray = Array.isArray(data) ? data : Object.values(data);

            dispatch({ type: ACTIONS.SET_COMMENTS, payload: commentsArray });
        } catch (err) {
            console.error('Failed to fetch comments:', err);
            const message = err instanceof Error ? err.message : 'Unknown error';
            dispatch({ type: ACTIONS.ERROR, payload: message });
        }
    };

    // Add comment
    const addComment = async (commentData: unknown): Promise<Comment> => {
        try {
            const result = await request<Comment>('/jsonstore/comments', 'POST', commentData);
            dispatch({ type: ACTIONS.ADD_COMMENT, payload: result });
            return result;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            dispatch({ type: ACTIONS.ERROR, payload: message });
            throw err;
        }
    };

    // Delete comment
    const deleteComment = async (commentId: string): Promise<void> => {
        try {
            await request(`/jsonstore/comments/${commentId}`, 'DELETE');
            dispatch({ type: ACTIONS.DELETE_COMMENT, payload: commentId });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            dispatch({ type: ACTIONS.ERROR, payload: message });
            throw err;
        }
    };

    // Fetch comments when postId changes
    useEffect(() => {
        fetchComments();
    }, [postId]);

    return {
        comments: state.comments,
        loading: state.loading,
        error: state.error,
        addComment,
        deleteComment,
        refetchComments: fetchComments,
    };
}
