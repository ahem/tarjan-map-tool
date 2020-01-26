import React from 'react';
import styled from 'styled-components';
import { Editor, EditorState, CompositeDecorator, ContentBlock } from 'draft-js';

import { fontFamily } from '../design-tokens';

const Root = styled.div`
    font-family: ${fontFamily};

    & .notes-item {
        margin: 12px 0;
        font-size: 14px;
    }
`;

const Header = styled.h3`
    margin-top: 0;
`;

const NoteID = styled.span`
    font-weight: bold;
`;

export const notesDecorator = new CompositeDecorator([
    {
        strategy(contentBlock, fn) {
            const regex = /^\d+[):]/g;
            const text = contentBlock.getText();
            let matchArr, start;
            while ((matchArr = regex.exec(text)) !== null) {
                start = matchArr.index;
                fn(start, start + matchArr[0].length);
            }
        },
        component: NoteID,
    },
]);

function blockStyle(contentBlock: ContentBlock) {
    switch (contentBlock.getType()) {
        case 'unstyled':
            return 'notes-item';
        default:
            return '';
    }
}

type Props = {
    editorState: EditorState;
    setEditorState: (state: EditorState) => void;
};

export const Notes = ({ editorState, setEditorState }: Props) => (
    <Root>
        <Header>Notes</Header>
        <Editor
            spellCheck={true}
            stripPastedStyles={true}
            editorState={editorState}
            onChange={setEditorState}
            blockStyleFn={blockStyle}
        />
    </Root>
);
