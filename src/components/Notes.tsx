import React from 'react';
import styled from 'styled-components';

import { fontFamily } from '../design-tokens';

const Header = styled.h3`
    margin-top: 0;
`;

const List = styled.ul`
    padding: 0;
`;

const Item = styled.li`
    list-style: none;
    margin: 12px 0;
    fontfamily: ${fontFamily};
`;

type Props = {
    notes: string[];
};

export const Notes = ({ notes }: Props) => (
    <div>
        <Header>Notes</Header>
        <List>
            {notes.map((note, idx) => (
                <Item key={idx}>{note}</Item>
            ))}
        </List>
    </div>
);
