package com.rxg.todo.service;

import com.rxg.todo.dto.CreateProjectDto;
import com.rxg.todo.dto.GetProjectDto;
import com.rxg.todo.dto.UpdateProjectDto;
import com.rxg.todo.dto.ProjectDto;
import com.rxg.todo.entity.Project;
import java.util.List;
import java.util.UUID;

public interface ProjectService {
    ProjectDto createProject(CreateProjectDto createProjectDto);
    Project getProjectById(UUID projectId);
    List<GetProjectDto> listProjects(String email);
    UpdateProjectDto updateProject(UpdateProjectDto updateProjectDto);
    void deleteProject(UUID projectId);
}
