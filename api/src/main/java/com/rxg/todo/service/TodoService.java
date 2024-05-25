package com.rxg.todo.service;

import com.rxg.todo.dto.CreateTodoDto;
import com.rxg.todo.dto.GetTodoDto;
import com.rxg.todo.dto.TodoDto;
import com.rxg.todo.dto.UpdateTodoDto;

import java.util.List;
import java.util.UUID;

public interface    TodoService {
    TodoDto createTodo(CreateTodoDto createTodoDto);
    List<GetTodoDto> listTodos(UUID projectId);
    void deleteTodo(UUID id);
    TodoDto updateTodo(UpdateTodoDto updateTodoDto);

}
