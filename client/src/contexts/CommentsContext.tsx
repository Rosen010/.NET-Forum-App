import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";
import useComments from "../hooks/useComments";
import type { UseCommentsResult } from "../hooks/useComments";

const CommentsContext = createContext<UseCommentsResult | null>(null);

interface CommentsProviderProps {
    postId: string | undefined;
}

export function CommentsProvider({
    postId,
    children,
}: PropsWithChildren<CommentsProviderProps>) {
    const commentsData = useComments(postId);

    return (
        <CommentsContext.Provider value={commentsData}>
            {children}
        </CommentsContext.Provider>
    );
}

export function useCommentsContext(): UseCommentsResult {
    const context = useContext(CommentsContext);

    if (!context) {
        throw new Error('useCommentsContext must be used within CommentsProvider');
    }

    return context;
}

export default CommentsContext;
