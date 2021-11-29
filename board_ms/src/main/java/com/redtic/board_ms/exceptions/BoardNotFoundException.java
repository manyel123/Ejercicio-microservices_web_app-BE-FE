package com.redtic.board_ms.exceptions;

public class BoardNotFoundException extends RuntimeException {
    public BoardNotFoundException(String board) {
        super(board);
    }
}
