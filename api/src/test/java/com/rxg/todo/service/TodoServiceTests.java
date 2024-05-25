package com.rxg.todo.service;

import com.rxg.todo.dto.*;
import com.rxg.todo.entity.TodoStatus;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TodoServiceTests {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private TodoService todoService;

    @ParameterizedTest
    @CsvSource({
            "Sample Project,sample@gmail.com,Sample Task",
            "Sample Project2,sample2@gmail.com,Sample Task2",
            "Sample Project3,sample3@gmail.com,Sample Task3"
    })
    public void testCreateTodo(String email, String title, String description) {
        CreateProjectDto createProjectDto = new CreateProjectDto(title,email);
        ProjectDto projectdto = projectService.createProject(createProjectDto);
        CreateTodoDto createTodoDto = new CreateTodoDto(projectdto.getId(),description);
        TodoDto newTodo = todoService.createTodo(createTodoDto);
        assertEquals(projectdto.getId(),newTodo.getProjectId());
        assertEquals(description,newTodo.getDescription());
    }

    @ParameterizedTest
    @CsvSource({
            "Sample Project,sample@gmail.com,Sample Task",
            "Sample Project2,sample2@gmail.com,Sample Task2",
            "Sample Project3,sample3@gmail.com,Sample Task3"
    })
    public void testListTodos(String email, String title, String description) {
        CreateProjectDto createProjectDto = new CreateProjectDto(title,email);
        ProjectDto projectdto = projectService.createProject(createProjectDto);
        CreateTodoDto createTodoDto = new CreateTodoDto(projectdto.getId(),description);
        todoService.createTodo(createTodoDto);
        List<GetTodoDto> todoList = todoService.listTodos(projectdto.getId());
        assertEquals(description,todoList.get(0).getDescription());
    }

    @ParameterizedTest
    @CsvSource({
            "Sample Project,sample@gmail.com,Sample Task",
            "Sample Project2,sample2@gmail.com,Sample Task2",
            "Sample Project3,sample3@gmail.com,Sample Task3"
    })
    public void testUpdateTodo(String email, String title, String description) {
        CreateProjectDto createProjectDto = new CreateProjectDto(title,email);
        ProjectDto projectdto = projectService.createProject(createProjectDto);
        CreateTodoDto createTodoDto = new CreateTodoDto(projectdto.getId(),description);
        TodoDto todoDto = todoService.createTodo(createTodoDto);
        UpdateTodoDto updateTodoDto = new UpdateTodoDto(todoDto.getId(),todoDto.getDescription(), TodoStatus.COMPLETED);
        TodoDto updatedTodo = todoService.updateTodo(updateTodoDto);
        assertEquals(TodoStatus.COMPLETED,updatedTodo.getStatus());
    }

    @ParameterizedTest
    @CsvSource({
            "Sample Project,test@gmail.com,Test Sample Task",
            "Sample Project2,test2@gmail.com,Test Sample Task2",
            "Sample Project3,test3@gmail.com,Test Sample Task3"
    })
    public void testDeleteTodo(String email, String title, String description) {
        CreateProjectDto createProjectDto = new CreateProjectDto(title,email);
        ProjectDto projectdto = projectService.createProject(createProjectDto);
        CreateTodoDto createTodoDto = new CreateTodoDto(projectdto.getId(),description);
        TodoDto todoDto = todoService.createTodo(createTodoDto);
        todoService.deleteTodo(todoDto.getId());
        List<GetTodoDto> todoList = todoService.listTodos(projectdto.getId());
        assertTrue(todoList.isEmpty());
    }
}
