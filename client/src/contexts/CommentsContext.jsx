import { createContext, useContext } from "react";
import useComments from "../hooks/useComments";

const CommentsContext = createContext(null);

export function CommentsProvider({ postId, children }) {
    const commentsData = useComments(postId);

    return (
        <CommentsContext.Provider value={commentsData}>
            {children}
        </CommentsContext.Provider>
    );
}

export function useCommentsContext() {
    const context = useContext(CommentsContext);
    
    if (!context) {
        throw new Error('useCommentsContext must be used within CommentsProvider');
    }
    
    return context;
}

export default CommentsContext;