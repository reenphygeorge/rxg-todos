package com.rxg.todo.controller;

import com.rxg.todo.dto.*;
import com.rxg.todo.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<GetTodoDto>>> getTodos(@RequestParam UUID projectId) {
        List<GetTodoDto> todoDto = todoService.listTodos(projectId);
        ApiResponseDto<List<GetTodoDto>> response = new ApiResponseDto<>(true, "Project data fetched", todoDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<TodoDto>> createTodo(@RequestBody CreateTodoDto createTodoDto) {
        TodoDto savedTodo = todoService.createTodo(createTodoDto);
        ApiResponseDto<TodoDto> response = new ApiResponseDto<>(true, "New todo created", savedTodo);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<ApiResponseDto<TodoDto>> updateTodo(@RequestBody UpdateTodoDto updateTodoDto) {
        TodoDto updatedTodo = todoService.updateTodo(updateTodoDto);
        ApiResponseDto<TodoDto> response = new ApiResponseDto<>(true, "Todo updated", updatedTodo);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponseDto<Void>> deleteTodo(@RequestParam UUID id) {
        todoService.deleteTodo(id);
        ApiResponseDto<Void> response = new ApiResponseDto<>(true, "Todo deleted", null);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}