package com.rxg.todo.service;

import com.rxg.todo.dto.CreateProjectDto;
import com.rxg.todo.dto.GetProjectDto;
import com.rxg.todo.dto.ProjectDto;
import com.rxg.todo.dto.UpdateProjectDto;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ProjectServiceTests {
    @Autowired
    private ProjectService projectService;

    @ParameterizedTest
    @CsvSource({
            "Sample Project,sample@gmail.com",
            "Sample Project2,sample2@gmail.com",
            "Sample Project3,sample3@gmail.com"
    })
    public void testCreateProject(String title,String email) {
        CreateProjectDto createProjectDto = new CreateProjectDto(title,email);
        ProjectDto projectdto = projectService.createProject(createProjectDto);
        assertEquals(title,projectdto.getTitle());
        assertEquals(email,projectdto.getEmail());
    }

    @ParameterizedTest
    @CsvSource({
            "Sample Project,sample@gmail.com",
            "Sample Project2,sample2@gmail.com",
            "Sample Project3,sample3@gmail.com"
    })
    public void testListProjects(String title,String email) {
        CreateProjectDto createProjectDto = new CreateProjectDto(title,email);
        projectService.createProject(createProjectDto);
        List<GetProjectDto> projectList = projectService.listProjects(email);
        assertFalse(projectList.isEmpty());
    }

    @ParameterizedTest
    @CsvSource({
            "Sample Project,sample@gmail.com,Update101",
            "Sample Project2,sample2@gmail.com,Update201",
            "Sample Project3,sample3@gmail.com,Update301"
    })
    public void testUpdateProjects(String title,String email,String newTitle) {
        CreateProjectDto createProjectDto = new CreateProjectDto(title,email);
        ProjectDto projectdto = projectService.createProject(createProjectDto);
        UpdateProjectDto updateProjectDto = new UpdateProjectDto(projectdto.getId(),newTitle);
        UpdateProjectDto update = projectService.updateProject(updateProjectDto);
        assertEquals(newTitle,update.getTitle());
    }

    @ParameterizedTest
    @CsvSource({
            "Sample Project,test@gmail.com",
            "Sample Project2,test2@gmail.com",
            "Sample Project3,test3@gmail.com"
    })
    public void testDeleteProjects(String title,String email) {
        CreateProjectDto createProjectDto = new CreateProjectDto(title,email);
        ProjectDto projectdto = projectService.createProject(createProjectDto);
        projectService.deleteProject(projectdto.getId());
        List<GetProjectDto> newProjectList = projectService.listProjects(email);
        assertTrue(newProjectList.isEmpty());
    }
}

