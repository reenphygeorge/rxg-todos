package com.rxg.todo.repository;

import com.rxg.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface TodoRepository extends JpaRepository<Todo, UUID> {
    List<Todo> findByProjectId(UUID projectId);
}
