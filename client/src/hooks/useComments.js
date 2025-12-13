import { useReducer, useEffect } from "react";
import useRequest from "./useRequest";

// Actions
const ACTIONS = {
    LOADING: 'LOADING',
    SET_COMMENTS: 'SET_COMMENTS',
    ADD_COMMENT: 'ADD_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
    ERROR: 'ERROR',
};

// Reducer function
function commentsReducer(state, action) {
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
const initialState = {
    comments: [],
    loading: true,
    error: null,
};

// Custom hook
export default function useComments(postId) {
    const [state, dispatch] = useReducer(commentsReducer, initialState);
    const { request } = useRequest();

    // Fetch comments
    const fetchComments = async () => {
        if (!postId) return;

        dispatch({ type: ACTIONS.LOADING });

        try {
            const whereClause = `postId="${postId}"`;
            const sortBy = '_createdOn desc';

            const urlParams = new URLSearchParams({
                where: whereClause,
                sortBy: sortBy,
            });

            const data = await request(`/jsonstore/comments?${urlParams.toString()}`, 'GET');

            // Convert object to array if needed
            const commentsArray = Array.isArray(data) ? data : Object.values(data);

            dispatch({ type: ACTIONS.SET_COMMENTS, payload: commentsArray });
        } catch (err) {
            console.error('Failed to fetch comments:', err);
            dispatch({ type: ACTIONS.ERROR, payload: err.message });
        }
    };

    // Add comment
    const addComment = async (commentData) => {
        try {
            const result = await request('/jsonstore/comments', 'POST', commentData);
            dispatch({ type: ACTIONS.ADD_COMMENT, payload: result });
            return result;
        } catch (err) {
            dispatch({ type: ACTIONS.ERROR, payload: err.message });
            throw err;
        }
    };

    // Delete comment
    const deleteComment = async (commentId) => {
        try {
            await request(`/jsonstore/comments/${commentId}`, 'DELETE');
            dispatch({ type: ACTIONS.DELETE_COMMENT, payload: commentId });
        } catch (err) {
            dispatch({ type: ACTIONS.ERROR, payload: err.message });
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