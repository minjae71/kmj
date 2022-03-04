package com.example.wylie_kmj.domain.repository;

import com.example.wylie_kmj.domain.entity.BoardEntity;
import com.example.wylie_kmj.domain.entity.FileEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {
    List<FileEntity> findByBoardId(Long boardId);
}
