package com.rxg.todo.mapper;

import com.rxg.todo.dto.CreateTodoDto;
import com.rxg.todo.dto.GetTodoDto;
import com.rxg.todo.dto.TodoDto;
import com.rxg.todo.entity.Todo;
import com.rxg.todo.entity.Project;
import com.rxg.todo.service.ProjectService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TodoMapper {
    private final ProjectService projectService;

    public TodoMapper(ProjectService projectService) {
        this.projectService = projectService;
    }

    public Todo mapToTodo(CreateTodoDto createTodoDto){
        Project project = projectService.getProjectById(createTodoDto.getProjectId());
        return new Todo(
                null,
                createTodoDto.getDescription(),
                null,
                null,
                null,
                project
        );
    }

    public static TodoDto mapToTodoDto(Todo todo) {
        return new TodoDto(
                todo.getId(),
                todo.getProject().getId(),
                todo.getDescription(),
                todo.getStatus(),
                todo.getCreatedDate(),
                todo.getUpdatedDate()
        );
    }

    public static GetTodoDto mapToGetTodoDto(Todo todo) {
        return new GetTodoDto(
                todo.getId(),
                todo.getProject().getId(),
                todo.getProject().getTitle(),
                todo.getDescription(),
                todo.getStatus(),
                todo.getCreatedDate(),
                todo.getUpdatedDate()
        );
    }

    public static List<GetTodoDto> mapToListTodoDto(List<Todo> todos) {
        return todos.stream()
                .map(TodoMapper::mapToGetTodoDto)
                .collect(Collectors.toList());
    }
}
