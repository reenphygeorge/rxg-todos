package com.rxg.todo.dto;

import com.rxg.todo.entity.TodoStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTodoDto {
    private UUID id;
    private String description;
    private TodoStatus status;
}
