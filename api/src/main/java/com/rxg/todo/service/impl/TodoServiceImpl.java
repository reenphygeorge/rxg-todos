package com.rxg.todo.service.impl;

import com.rxg.todo.dto.CreateTodoDto;
import com.rxg.todo.dto.GetTodoDto;
import com.rxg.todo.dto.TodoDto;
import com.rxg.todo.dto.UpdateTodoDto;
import com.rxg.todo.entity.Project;
import com.rxg.todo.entity.Todo;
import com.rxg.todo.exception.ResourceNotFoundException;
import com.rxg.todo.mapper.TodoMapper;
import com.rxg.todo.repository.TodoRepository;
import com.rxg.todo.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;
    private final ProjectServiceImpl projectService;

    @Override
    public TodoDto createTodo(CreateTodoDto createTodoDto) {
        Todo todo = todoMapper.mapToTodo(createTodoDto);
        Todo savedTodo = todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(savedTodo);
    }

    @Override
    public List<GetTodoDto> listTodos(UUID projectId) {
        projectService.getProjectById(projectId);
        return  TodoMapper.mapToListTodoDto(todoRepository.findByProjectId(projectId));
    }

    @Override
    public TodoDto updateTodo(UpdateTodoDto updateTodoDto) {
        Todo todo = todoRepository.findById(updateTodoDto.getId()).orElseThrow(()-> new ResourceNotFoundException("Todo not found"));
        todo.setStatus(updateTodoDto.getStatus());
        todo.setDescription(updateTodoDto.getDescription());
        return TodoMapper.mapToTodoDto(todoRepository.save(todo));
    }

    @Override
    public void deleteTodo(UUID id) {
        todoRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Todo not found"));
        todoRepository.deleteById(id);
    }
}
