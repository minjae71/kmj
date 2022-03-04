package com.example.wylie_kmj.domain.repository;

import com.example.wylie_kmj.domain.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    Optional<MemberEntity> findByAccountId(String accountId);

    boolean existsByAccountId(String accountID);
}

