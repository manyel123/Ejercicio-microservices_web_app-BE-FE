package com.redtic.board_ms.controllers;

import com.redtic.board_ms.models.Board;
import com.redtic.board_ms.exceptions.BoardNotFoundException;
import com.redtic.board_ms.repositories.BoardRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController

public class BoardController {

    private final BoardRepository boardRepository;

    public BoardController(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @GetMapping("/board/{username}")
    List <Board> getUserPubs(@PathVariable String username) {
        List <Board> userPubs =
                boardRepository.findByUsername(username).stream().collect(Collectors.toList());
        if (userPubs.isEmpty())
            throw new BoardNotFoundException("No hay publicaciones para mostrar");
        return userPubs;
    }

    @PostMapping("/board/newpublication")
    Board newPub(@RequestBody Board board){
        board.setPubDate(new Date());
        return boardRepository.save(board);
    }

    @GetMapping("/board/all")
    List <Board> getAllPubs(){
        return boardRepository.findAll();
    }
}
