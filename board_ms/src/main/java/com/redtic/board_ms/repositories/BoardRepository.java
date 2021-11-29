package com.redtic.board_ms.repositories;

import com.redtic.board_ms.models.Board;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BoardRepository extends MongoRepository <Board, String> {
    List<Board> findByUsername (String username);
    List<Board> findAll();
}
