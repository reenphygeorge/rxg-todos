package com.rxg.todo.mapper;

import com.rxg.todo.dto.CreateProjectDto;
import com.rxg.todo.dto.GetProjectDto;
import com.rxg.todo.dto.UpdateProjectDto;
import com.rxg.todo.dto.ProjectDto;
import com.rxg.todo.entity.Project;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectMapper {
    public static Project mapToProject(CreateProjectDto createProjectDto){
        return new Project(
                null,
                createProjectDto.getEmail(),
                createProjectDto.getTitle(),
                null,
                null
        );
    }

    public static ProjectDto mapToProjectDto(Project project){
        return new ProjectDto(
                project.getId(),
                project.getEmail(),
                project.getTitle(),
                project.getCreatedDate(),
                project.getTodos()
        );
    }

    public static UpdateProjectDto mapToUpdateProjectDto(Project project) {
        return new UpdateProjectDto(
                project.getId(),
                project.getTitle()
        );
    }

    public static GetProjectDto mapToGetProjectDto(Project project) {
        return new GetProjectDto(
                project.getId(),
                project.getTitle(),
                project.getCreatedDate()
        );
    }

    public static List<GetProjectDto>mapToListProjectDto(List<Project> projects) {
        return projects.stream()
                .map(ProjectMapper::mapToGetProjectDto)
                .collect(Collectors.toList());
    }
}
