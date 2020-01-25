import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    color: black;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

type Props = {
    x: number;
    y: number;
    width: number;
    height: number;
    children?: string;
};

function calculateMaxFontSize(el: HTMLDivElement) {
    const box = el.parentElement?.getBoundingClientRect();
    if (!box) return;
    const maxWidth = box.width * 0.8;
    const maxHeight = box.height * 0.8;
    let size = 100;
    el.style.fontSize = `${size}%`;
    let textbox = el.getBoundingClientRect();
    while (textbox.width > maxWidth && textbox.height > maxHeight) {
        size -= 10;
        el.style.fontSize = `${size}%`;
        textbox = el.getBoundingClientRect();
    }
}

export const Text = ({ x, y, width, height, children }: Props) => {
    return (
        <foreignObject x={x} y={y} width={width} height={height} style={{ pointerEvents: 'none' }}>
            <Wrapper>
                <div ref={calculateMaxFontSize}>{children}</div>
            </Wrapper>
        </foreignObject>
    );
};
